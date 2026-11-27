import pytest
from httpx import AsyncClient

CATEGORIES_URL = "/api/v1/categories"
PRODUCTS_URL = "/api/v1/products"


async def _create_category(client: AsyncClient, name: str = "Electronics") -> int:
    resp = await client.post(CATEGORIES_URL, json={"name": name})
    assert resp.status_code == 201
    return resp.json()["id"]


async def _create_product(
    client: AsyncClient,
    category_id: int,
    name: str = "Phone 1",
    description: str | None = "A sleek smartphone.",
) -> dict:
    resp = await client.post(
        PRODUCTS_URL,
        json={
            "name": name,
            "category_id": category_id,
            "description": description,
        },
    )
    assert resp.status_code == 201
    return resp.json()


# Products


@pytest.mark.asyncio
async def test_create_product(client: AsyncClient):
    cat_id = await _create_category(client)
    resp = await client.post(
        PRODUCTS_URL,
        json={
            "name": "  Phone 1  ",
            "category_id": cat_id,
            "description": "  A sleek smartphone.  ",
        },
    )
    assert resp.status_code == 201
    data = resp.json()
    assert data["name"] == "Phone 1"
    assert data["category_id"] == cat_id
    assert data["description"] == "A sleek smartphone."
    assert data["is_active"] is True
    assert isinstance(data["id"], int)


@pytest.mark.asyncio
async def test_create_product_nonexistent_category_returns_404(client: AsyncClient):
    resp = await client.post(
        PRODUCTS_URL,
        json={"name": "Orphan Product", "category_id": 999999},
    )
    assert resp.status_code == 404
    assert resp.headers["content-type"] == "application/problem+json"


@pytest.mark.asyncio
async def test_list_products_pagination_and_filters(client: AsyncClient):
    cat1 = await _create_category(client, "Phones")
    cat2 = await _create_category(client, "Clothing")

    await _create_product(client, cat1, "Alpha Phone", "Fast phone")
    await _create_product(client, cat1, "Beta Phone", "Camera phone")
    await _create_product(client, cat2, "Cotton Shirt", "Soft shirt")

    page1 = await client.get(PRODUCTS_URL, params={"page": 1, "limit": 2})
    assert page1.status_code == 200
    body1 = page1.json()
    assert body1["total"] == 3
    assert len(body1["items"]) == 2

    filtered = await client.get(PRODUCTS_URL, params={"category_id": cat2})
    assert filtered.status_code == 200
    assert filtered.json()["total"] == 1
    assert filtered.json()["items"][0]["name"] == "Cotton Shirt"

    searched = await client.get(PRODUCTS_URL, params={"q": "Camera"})
    assert searched.status_code == 200
    assert searched.json()["total"] == 1
    assert searched.json()["items"][0]["name"] == "Beta Phone"


@pytest.mark.asyncio
async def test_get_product_detail_with_variants_and_images(client: AsyncClient):
    cat_id = await _create_category(client)
    product = await _create_product(client, cat_id)
    pid = product["id"]

    await client.post(
        f"{PRODUCTS_URL}/{pid}/variants",
        json={"sku": "SKU-001", "price": "999.99", "stock_quantity": 5},
    )
    await client.post(
        f"{PRODUCTS_URL}/{pid}/images",
        json={
            "image_url": "https://example.com/p1.jpg",
            "imagekit_file_id": "file_001",
            "position": 0,
        },
    )

    resp = await client.get(f"{PRODUCTS_URL}/{pid}")
    assert resp.status_code == 200
    data = resp.json()
    assert data["id"] == pid
    assert len(data["variants"]) == 1
    assert data["variants"][0]["sku"] == "SKU-001"
    assert len(data["images"]) == 1
    assert data["images"][0]["imagekit_file_id"] == "file_001"


@pytest.mark.asyncio
async def test_get_nonexistent_product_returns_404(client: AsyncClient):
    resp = await client.get(f"{PRODUCTS_URL}/999999")
    assert resp.status_code == 404


@pytest.mark.asyncio
async def test_update_product(client: AsyncClient):
    cat1 = await _create_category(client, "Cat1")
    cat2 = await _create_category(client, "Cat2")
    product = await _create_product(client, cat1, "Old Name")
    pid = product["id"]

    resp = await client.patch(
        f"{PRODUCTS_URL}/{pid}",
        json={"name": "New Name", "category_id": cat2},
    )
    assert resp.status_code == 200
    data = resp.json()
    assert data["name"] == "New Name"
    assert data["category_id"] == cat2


@pytest.mark.asyncio
async def test_soft_delete_product(client: AsyncClient):
    cat_id = await _create_category(client)
    product = await _create_product(client, cat_id)
    pid = product["id"]

    del_resp = await client.delete(f"{PRODUCTS_URL}/{pid}")
    assert del_resp.status_code == 204

    get_resp = await client.get(f"{PRODUCTS_URL}/{pid}")
    assert get_resp.status_code == 404


# Product Variants


@pytest.mark.asyncio
async def test_create_and_get_product_variant(client: AsyncClient):
    cat_id = await _create_category(client)
    product = await _create_product(client, cat_id)
    pid = product["id"]

    create_resp = await client.post(
        f"{PRODUCTS_URL}/{pid}/variants",
        json={
            "sku": "VAR-001",
            "price": "49.99",
            "stock_quantity": 20,
            "attributes": {"color": "black"},
        },
    )
    assert create_resp.status_code == 201
    variant = create_resp.json()
    assert variant["sku"] == "VAR-001"
    assert variant["attributes"] == {"color": "black"}

    get_resp = await client.get(f"{PRODUCTS_URL}/{pid}/variants/{variant['id']}")
    assert get_resp.status_code == 200
    assert get_resp.json()["id"] == variant["id"]


@pytest.mark.asyncio
async def test_create_variant_duplicate_sku_returns_409(client: AsyncClient):
    cat_id = await _create_category(client)
    product = await _create_product(client, cat_id)
    pid = product["id"]

    first = await client.post(
        f"{PRODUCTS_URL}/{pid}/variants",
        json={"sku": "DUP-SKU", "price": "10.00"},
    )
    assert first.status_code == 201

    dup = await client.post(
        f"{PRODUCTS_URL}/{pid}/variants",
        json={"sku": "DUP-SKU", "price": "20.00"},
    )
    assert dup.status_code == 409
    assert dup.headers["content-type"] == "application/problem+json"


@pytest.mark.asyncio
async def test_list_product_variants(client: AsyncClient):
    cat_id = await _create_category(client)
    product = await _create_product(client, cat_id)
    pid = product["id"]

    await client.post(
        f"{PRODUCTS_URL}/{pid}/variants",
        json={"sku": "L-1", "price": "10.00"},
    )
    await client.post(
        f"{PRODUCTS_URL}/{pid}/variants",
        json={"sku": "L-2", "price": "20.00"},
    )

    resp = await client.get(f"{PRODUCTS_URL}/{pid}/variants")
    assert resp.status_code == 200
    body = resp.json()
    assert body["total"] == 2
    assert len(body["items"]) == 2


@pytest.mark.asyncio
async def test_update_and_soft_delete_variant(client: AsyncClient):
    cat_id = await _create_category(client)
    product = await _create_product(client, cat_id)
    pid = product["id"]

    created = await client.post(
        f"{PRODUCTS_URL}/{pid}/variants",
        json={"sku": "UPD-1", "price": "15.00", "stock_quantity": 3},
    )
    vid = created.json()["id"]

    upd_resp = await client.patch(
        f"{PRODUCTS_URL}/{pid}/variants/{vid}",
        json={"price": "19.99", "stock_quantity": 8},
    )
    assert upd_resp.status_code == 200
    assert upd_resp.json()["stock_quantity"] == 8

    del_resp = await client.delete(f"{PRODUCTS_URL}/{pid}/variants/{vid}")
    assert del_resp.status_code == 204

    get_resp = await client.get(f"{PRODUCTS_URL}/{pid}/variants/{vid}")
    assert get_resp.status_code == 404


# Product Images


@pytest.mark.asyncio
async def test_add_and_list_product_images_ordered(client: AsyncClient):
    cat_id = await _create_category(client)
    product = await _create_product(client, cat_id)
    pid = product["id"]

    await client.post(
        f"{PRODUCTS_URL}/{pid}/images",
        json={
            "image_url": "https://example.com/second.jpg",
            "imagekit_file_id": "ik_2",
            "position": 2,
        },
    )
    await client.post(
        f"{PRODUCTS_URL}/{pid}/images",
        json={
            "image_url": "https://example.com/first.jpg",
            "imagekit_file_id": "ik_1",
            "position": 1,
        },
    )

    resp = await client.get(f"{PRODUCTS_URL}/{pid}/images")
    assert resp.status_code == 200
    items = resp.json()
    assert len(items) == 2
    assert items[0]["imagekit_file_id"] == "ik_1"
    assert items[1]["imagekit_file_id"] == "ik_2"


@pytest.mark.asyncio
async def test_update_and_delete_product_image(client: AsyncClient, mock_storage):
    cat_id = await _create_category(client)
    product = await _create_product(client, cat_id)
    pid = product["id"]

    created = await client.post(
        f"{PRODUCTS_URL}/{pid}/images",
        json={
            "image_url": "https://example.com/img.jpg",
            "imagekit_file_id": "ik_img",
            "alt_text": "Old alt",
        },
    )
    img_id = created.json()["id"]

    upd_resp = await client.patch(
        f"{PRODUCTS_URL}/{pid}/images/{img_id}",
        json={"alt_text": "New alt", "position": 2},
    )
    assert upd_resp.status_code == 200
    assert upd_resp.json()["alt_text"] == "New alt"
    assert upd_resp.json()["position"] == 2

    mock_storage.delete.reset_mock()
    del_resp = await client.delete(f"{PRODUCTS_URL}/{pid}/images/{img_id}")
    assert del_resp.status_code == 204
    mock_storage.delete.assert_awaited_once_with("ik_img")

    list_resp = await client.get(f"{PRODUCTS_URL}/{pid}/images")
    assert list_resp.status_code == 200
    assert list_resp.json() == []


@pytest.mark.asyncio
async def test_delete_product_image_storage_failure_does_not_rollback_db(
    client: AsyncClient,
    mock_storage,
):
    mock_storage.delete.side_effect = Exception("ImageKit timeout")
    cat_id = await _create_category(client)
    product = await _create_product(client, cat_id)
    pid = product["id"]

    created = await client.post(
        f"{PRODUCTS_URL}/{pid}/images",
        json={
            "image_url": "https://example.com/img2.jpg",
            "imagekit_file_id": "ik_img_fail",
        },
    )
    img_id = created.json()["id"]

    del_resp = await client.delete(f"{PRODUCTS_URL}/{pid}/images/{img_id}")
    assert del_resp.status_code == 204

    # DB record is deleted even if ImageKit deletion raised an error
    list_resp = await client.get(f"{PRODUCTS_URL}/{pid}/images")
    assert list_resp.status_code == 200
    assert list_resp.json() == []
