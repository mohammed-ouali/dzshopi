import pytest
from httpx import AsyncClient

BASE_URL = "/api/v1/categories"


@pytest.mark.asyncio
async def test_create_category(client: AsyncClient):
    response = await client.post(
        BASE_URL,
        json={"name": "  Electronics  ", "description": "  Phones and laptops  "},
    )
    assert response.status_code == 201
    data = response.json()
    assert data["name"] == "Electronics"
    assert data["description"] == "Phones and laptops"
    assert data["is_active"] is True
    assert isinstance(data["id"], int)
    assert "created_at" in data
    assert "updated_at" in data


@pytest.mark.asyncio
async def test_create_category_duplicate_name_returns_409(client: AsyncClient):
    first = await client.post(BASE_URL, json={"name": "Clothing"})
    assert first.status_code == 201

    duplicate = await client.post(BASE_URL, json={"name": "Clothing"})
    assert duplicate.status_code == 409
    assert duplicate.headers["content-type"] == "application/problem+json"


@pytest.mark.asyncio
async def test_create_category_invalid_payload_returns_422(client: AsyncClient):
    response = await client.post(BASE_URL, json={"name": "   "})
    assert response.status_code == 422


@pytest.mark.asyncio
async def test_list_categories_and_filter_by_is_active(client: AsyncClient):
    await client.post(BASE_URL, json={"name": "Active Cat", "is_active": True})
    await client.post(BASE_URL, json={"name": "Inactive Cat", "is_active": False})

    all_resp = await client.get(BASE_URL)
    assert all_resp.status_code == 200
    assert len(all_resp.json()) == 2

    active_resp = await client.get(BASE_URL, params={"is_active": True})
    assert active_resp.status_code == 200
    active_items = active_resp.json()
    assert len(active_items) == 1
    assert active_items[0]["name"] == "Active Cat"

    inactive_resp = await client.get(BASE_URL, params={"is_active": False})
    assert inactive_resp.status_code == 200
    inactive_items = inactive_resp.json()
    assert len(inactive_items) == 1
    assert inactive_items[0]["name"] == "Inactive Cat"


@pytest.mark.asyncio
async def test_get_category_by_id(client: AsyncClient):
    created = await client.post(
        BASE_URL,
        json={"name": "Books", "description": "Fiction and non-fiction"},
    )
    category_id = created.json()["id"]

    response = await client.get(f"{BASE_URL}/{category_id}")
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == category_id
    assert data["name"] == "Books"
    assert data["description"] == "Fiction and non-fiction"


@pytest.mark.asyncio
async def test_get_nonexistent_category_returns_404(client: AsyncClient):
    response = await client.get(f"{BASE_URL}/999999")
    assert response.status_code == 404


@pytest.mark.asyncio
async def test_update_category(client: AsyncClient):
    created = await client.post(
        BASE_URL,
        json={"name": "Home", "description": "Old description"},
    )
    category_id = created.json()["id"]

    response = await client.patch(
        f"{BASE_URL}/{category_id}",
        json={"name": "Home & Kitchen", "description": "New description"},
    )
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "Home & Kitchen"
    assert data["description"] == "New description"


@pytest.mark.asyncio
async def test_update_category_duplicate_name_returns_409(client: AsyncClient):
    await client.post(BASE_URL, json={"name": "Sports"})
    second = await client.post(BASE_URL, json={"name": "Outdoors"})
    second_id = second.json()["id"]

    response = await client.patch(
        f"{BASE_URL}/{second_id}",
        json={"name": "Sports"},
    )
    assert response.status_code == 409


@pytest.mark.asyncio
async def test_update_category_empty_or_null_non_nullable_returns_422(client: AsyncClient):
    created = await client.post(BASE_URL, json={"name": "Toys"})
    category_id = created.json()["id"]

    empty_resp = await client.patch(f"{BASE_URL}/{category_id}", json={})
    assert empty_resp.status_code == 422

    null_name_resp = await client.patch(f"{BASE_URL}/{category_id}", json={"name": None})
    assert null_name_resp.status_code == 422


@pytest.mark.asyncio
async def test_update_nonexistent_category_returns_404(client: AsyncClient):
    response = await client.patch(f"{BASE_URL}/999999", json={"name": "Ghost"})
    assert response.status_code == 404


@pytest.mark.asyncio
async def test_delete_category_soft_deletes(client: AsyncClient):
    created = await client.post(BASE_URL, json={"name": "Beauty"})
    category_id = created.json()["id"]

    delete_resp = await client.delete(f"{BASE_URL}/{category_id}")
    assert delete_resp.status_code == 204

    active_resp = await client.get(BASE_URL, params={"is_active": True})
    assert active_resp.status_code == 200
    assert all(item["id"] != category_id for item in active_resp.json())

    inactive_resp = await client.get(BASE_URL, params={"is_active": False})
    assert inactive_resp.status_code == 200
    assert any(item["id"] == category_id for item in inactive_resp.json())


@pytest.mark.asyncio
async def test_delete_nonexistent_category_returns_404(client: AsyncClient):
    response = await client.delete(f"{BASE_URL}/999999")
    assert response.status_code == 404
