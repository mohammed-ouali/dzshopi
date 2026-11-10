
from fastapi import APIRouter, Path, Query, status
from fastapi.responses import Response

from app.core.exception_handlers import ProblemDetails
from app.shared.pagination import PaginatedResponse
from app.modules.products.schemas import (
    ProductCreate,
    ProductUpdate,
    ProductResponse,
    ProductDetailResponse,
    ProductVariantCreate,
    ProductVariantUpdate,
    ProductVariantResponse,
    ProductImageCreate,
    ProductImageUpdate,
    ProductImageResponse,
)

router = APIRouter(
    prefix="/products",
    tags=["Products"],
)


# Mock responses

MOCK_PRODUCTS = [
    ProductResponse(
        id=1,
        name="Phone 1",
        category_id=1,
        description="A sleek smartphone with advanced features.",
        is_active=True,
    ),
    ProductResponse(
        id=2,
        name="Phone 2",
        category_id=1,
        description="A powerful smartphone with a great camera.",
        is_active=True,
    ),
    ProductResponse(
        id=3,
        name="T-shirt 1",
        category_id=2,
        description="A comfortable cotton t-shirt.",
        is_active=True,
    ),
]

MOCK_VARIANTS = [
    ProductVariantResponse(
        id=1,
        product_id=1,
        sku="PHONE-001",
        price=999.99,
        stock=10,
        attributes={"memory": "128GB", "ram": "4GB"},
        is_active=True,
    ),
    ProductVariantResponse(
        id=2,
        product_id=1,
        sku="PHONE-002",
        price=1099.99,
        stock=5,
        attributes={"memory": "256GB", "ram": "4GB"},
        is_active=True,
    ),
]

MOCK_IMAGES = [
    ProductImageResponse(
        id=1,
        product_id=1,
        url="https://example.com/phone-1.jpg",
        file_id="mock_file_001",
    ),
    ProductImageResponse(
        id=2,
        product_id=1,
        url="https://example.com/phone-1-side.jpg",
        file_id="mock_file_002",
    ),
]


# Products

@router.get(
    "",
    summary="List products",
    description="Retrieve a paginated list of products with optional filtering and sorting.",
    response_model=PaginatedResponse[ProductResponse],
    responses={
        status.HTTP_422_UNPROCESSABLE_CONTENT: {"model": ProblemDetails},
    },
)
async def get_products(
    page: int = Query(
        default=1,
        ge=1,
        description="Page number, starting from 1.",
    ),
    limit: int = Query(
        default=10,
        ge=1,
        le=100,
        description="Number of products to return per page.",
    ),
    q: str | None = Query(
        default=None,
        description="Search products by name or description.",
    ),
    category_id: int | None = Query(
        default=None,
        description="Return only products belonging to this category.",
    ),
    sort_by: str | None = Query(
        default=None,
        description="Product field used to sort the results.",
    ),
    order: str | None = Query(
        default=None,
        description="Sort direction for the results.",
    ),
):
    return PaginatedResponse[ProductResponse](
        items=MOCK_PRODUCTS,
        total=3,
        page=page,
        size=limit,
    )


@router.get(
    "/{product_id}",
    summary="Get product",
    description="Retrieve a product by ID, including its variants and images.",
    response_model=ProductDetailResponse,
    responses={
        status.HTTP_404_NOT_FOUND: {"model": ProblemDetails},
    },
)
async def get_product(
    product_id: int = Path(
        description="ID of the product to retrieve.",
    ),
):
    return ProductDetailResponse(
        id=1,
        name="Phone 1",
        category_id=1,
        description="A sleek smartphone with advanced features.",
        is_active=True,
        variants=MOCK_VARIANTS,
        images=MOCK_IMAGES,
    )


@router.post(
    "",
    summary="Create product",
    description="Create a new product.",
    response_model=ProductResponse,
    status_code=status.HTTP_201_CREATED,
    responses={
        status.HTTP_409_CONFLICT: {"model": ProblemDetails},
        status.HTTP_422_UNPROCESSABLE_CONTENT: {"model": ProblemDetails},
    },
)
async def create_product(payload: ProductCreate):
    return ProductResponse(
        id=4,
        name="New Product",
        category_id=1,
        description="A newly created product.",
        is_active=True,
    )


@router.patch(
    "/{product_id}",
    summary="Update product",
    description="Partially update an existing product.",
    response_model=ProductResponse,
    responses={
        status.HTTP_404_NOT_FOUND: {"model": ProblemDetails},
        status.HTTP_409_CONFLICT: {"model": ProblemDetails},
        status.HTTP_422_UNPROCESSABLE_CONTENT: {"model": ProblemDetails},
    },
)
async def update_product(
    product_id: int = Path(
        description="ID of the product to update.",
    ),
    payload: ProductUpdate = ...,
):
    return ProductResponse(
        id=1,
        name="Updated Product",
        category_id=1,
        description="An updated product.",
        is_active=True,
    )


@router.delete(
    "/{product_id}",
    summary="Delete product",
    description="Deactivate an existing product.",
    status_code=status.HTTP_204_NO_CONTENT,
    responses={
        status.HTTP_404_NOT_FOUND: {"model": ProblemDetails},
    },
)
async def delete_product(
    product_id: int = Path(
        description="ID of the product to deactivate.",
    ),
):
    return Response(status_code=status.HTTP_204_NO_CONTENT)


# Product Variants

@router.get(
    "/{product_id}/variants",
    summary="List product variants",
    description="Retrieve a paginated list of product variants.",
    response_model=PaginatedResponse[ProductVariantResponse],
    responses={
        status.HTTP_404_NOT_FOUND: {"model": ProblemDetails},
        status.HTTP_422_UNPROCESSABLE_CONTENT: {"model": ProblemDetails},
    },
)
async def get_product_variants(
    product_id: int = Path(
        description="ID of the product whose variants are being retrieved.",
    ),
    page: int = Query(
        default=1,
        ge=1,
        description="Page number, starting from 1.",
    ),
    limit: int = Query(
        default=10,
        ge=1,
        le=100,
        description="Number of variants to return per page.",
    ),
):
    return PaginatedResponse[ProductVariantResponse](
        items=MOCK_VARIANTS,
        total=2,
        page=page,
        size=limit,
    )


@router.get(
    "/{product_id}/variants/{variant_id}",
    summary="Get product variant",
    description="Retrieve a product variant.",
    response_model=ProductVariantResponse,
    responses={
        status.HTTP_404_NOT_FOUND: {"model": ProblemDetails},
    },
)
async def get_product_variant(
    product_id: int = Path(
        description="ID of the product.",
    ),
    variant_id: int = Path(
        description="ID of the variant to retrieve.",
    ),
):
    return MOCK_VARIANTS[0]


@router.post(
    "/{product_id}/variants",
    summary="Create product variant",
    description="Create a new variant for a product.",
    response_model=ProductVariantResponse,
    status_code=status.HTTP_201_CREATED,
    responses={
        status.HTTP_404_NOT_FOUND: {"model": ProblemDetails},
        status.HTTP_409_CONFLICT: {"model": ProblemDetails},
        status.HTTP_422_UNPROCESSABLE_CONTENT: {"model": ProblemDetails},
    },
)
async def create_product_variant(
    product_id: int = Path(
        description="ID of the product to which the variant belongs.",
    ),
    payload: ProductVariantCreate = ...,
):
    return ProductVariantResponse(
        id=3,
        product_id=1,
        sku="PHONE-003",
        price=1199.99,
        stock=10,
        attributes={"memory": "512GB", "ram": "12GB"},
        is_active=True,
    )


@router.patch(
    "/{product_id}/variants/{variant_id}",
    summary="Update product variant",
    description="Partially update an existing product variant.",
    response_model=ProductVariantResponse,
    responses={
        status.HTTP_404_NOT_FOUND: {"model": ProblemDetails},
        status.HTTP_409_CONFLICT: {"model": ProblemDetails},
        status.HTTP_422_UNPROCESSABLE_CONTENT: {"model": ProblemDetails},
    },
)
async def update_product_variant(
    product_id: int = Path(
        description="ID of the product.",
    ),
    variant_id: int = Path(
        description="ID of the variant to update.",
    ),
    payload: ProductVariantUpdate = ...,
):
    return MOCK_VARIANTS[0]


@router.delete(
    "/{product_id}/variants/{variant_id}",
    summary="Delete product variant",
    description="Deactivate an existing product variant.",
    status_code=status.HTTP_204_NO_CONTENT,
    responses={
        status.HTTP_404_NOT_FOUND: {"model": ProblemDetails},
    },
)
async def delete_product_variant(
    product_id: int = Path(
        description="ID of the product.",
    ),
    variant_id: int = Path(
        description="ID of the variant to deactivate.",
    ),
):
    return Response(status_code=status.HTTP_204_NO_CONTENT)


# Product Images

@router.get(
    "/{product_id}/images",
    summary="List product images",
    description="Retrieve all images belonging to a product.",
    response_model=list[ProductImageResponse],
    responses={
        status.HTTP_404_NOT_FOUND: {"model": ProblemDetails},
    },
)
async def get_product_images(
    product_id: int = Path(
        description="ID of the product whose images are being retrieved.",
    ),
):
    return MOCK_IMAGES


@router.post(
    "/{product_id}/images",
    summary="Add product image",
    description="Add an image to a product.",
    response_model=ProductImageResponse,
    status_code=status.HTTP_201_CREATED,
    responses={
        status.HTTP_404_NOT_FOUND: {"model": ProblemDetails},
        status.HTTP_422_UNPROCESSABLE_CONTENT: {"model": ProblemDetails},
    },
)
async def create_product_image(
    product_id: int = Path(
        description="ID of the product to which the image belongs.",
    ),
    payload: ProductImageCreate = ...,
):
    return ProductImageResponse(
        id=3,
        product_id=1,
        url="https://example.com/new-product-image.jpg",
        file_id="mock_file_003",
    )


@router.patch(
    "/{product_id}/images/{image_id}",
    summary="Update product image",
    description="Partially update product image metadata.",
    response_model=ProductImageResponse,
    responses={
        status.HTTP_404_NOT_FOUND: {"model": ProblemDetails},
        status.HTTP_422_UNPROCESSABLE_CONTENT: {"model": ProblemDetails},
    },
)
async def update_product_image(
    product_id: int = Path(
        description="ID of the product.",
    ),
    image_id: int = Path(
        description="ID of the image to update.",
    ),
    payload: ProductImageUpdate = ...,
):
    return MOCK_IMAGES[0]


@router.delete(
    "/{product_id}/images/{image_id}",
    summary="Delete product image",
    description="Delete an image belonging to a product.",
    status_code=status.HTTP_204_NO_CONTENT,
    responses={
        status.HTTP_404_NOT_FOUND: {"model": ProblemDetails},
    },
)
async def delete_product_image(
    product_id: int = Path(
        description="ID of the product.",
    ),
    image_id: int = Path(
        description="ID of the image to delete.",
    ),
):
    return Response(status_code=status.HTTP_204_NO_CONTENT)
