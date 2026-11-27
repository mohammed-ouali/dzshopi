from fastapi import APIRouter, Depends, File, Form, Path, Query, UploadFile, status
from fastapi.responses import Response

from app.core.exception_handlers import ProblemDetails
from app.modules.products.dependencies import get_product_service
from app.modules.products.schemas import (
    ProductCreate,
    ProductDetailResponse,
    ProductImageCreate,
    ProductImageResponse,
    ProductImageUpdate,
    ProductResponse,
    ProductUpdate,
    ProductVariantCreate,
    ProductVariantResponse,
    ProductVariantUpdate,
)
from app.modules.products.service import ProductService
from app.shared.pagination import PaginatedResponse

router = APIRouter(
    prefix="/products",
    tags=["Products"],
)


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
    service: ProductService = Depends(get_product_service),
):
    items, total = await service.list_products(
        page=page,
        limit=limit,
        q=q,
        category_id=category_id,
        sort_by=sort_by,
        order=order,
    )
    return PaginatedResponse[ProductResponse](
        items=items,
        total=total,
        page=page,
        limit=limit,
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
    service: ProductService = Depends(get_product_service),
):
    return await service.get_product(product_id)


@router.post(
    "",
    summary="Create product",
    description="Create a new product.",
    response_model=ProductResponse,
    status_code=status.HTTP_201_CREATED,
    responses={
        status.HTTP_404_NOT_FOUND: {"model": ProblemDetails},
        status.HTTP_409_CONFLICT: {"model": ProblemDetails},
        status.HTTP_422_UNPROCESSABLE_CONTENT: {"model": ProblemDetails},
    },
)
async def create_product(
    payload: ProductCreate,
    service: ProductService = Depends(get_product_service),
):
    return await service.create_product(payload)


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
    service: ProductService = Depends(get_product_service),
):
    return await service.update_product(product_id, payload)


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
    service: ProductService = Depends(get_product_service),
):
    await service.delete_product(product_id)
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
    service: ProductService = Depends(get_product_service),
):
    items, total = await service.list_variants(
        product_id=product_id,
        page=page,
        limit=limit,
    )
    return PaginatedResponse[ProductVariantResponse](
        items=items,
        total=total,
        page=page,
        limit=limit,
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
    service: ProductService = Depends(get_product_service),
):
    return await service.get_variant(product_id, variant_id)


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
    service: ProductService = Depends(get_product_service),
):
    return await service.create_variant(product_id, payload)


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
    service: ProductService = Depends(get_product_service),
):
    return await service.update_variant(product_id, variant_id, payload)


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
    service: ProductService = Depends(get_product_service),
):
    await service.delete_variant(product_id, variant_id)
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
    service: ProductService = Depends(get_product_service),
):
    return await service.list_images(product_id)


@router.post(
    "/{product_id}/images",
    summary="Add product image",
    description="Upload an image file to ImageKit storage and attach it to the product.",
    response_model=ProductImageResponse,
    status_code=status.HTTP_201_CREATED,
    responses={
        status.HTTP_404_NOT_FOUND: {"model": ProblemDetails},
        status.HTTP_422_UNPROCESSABLE_CONTENT: {"model": ProblemDetails},
        status.HTTP_502_BAD_GATEWAY: {"model": ProblemDetails},
    },
)
async def create_product_image(
    product_id: int = Path(
        description="ID of the product to which the image belongs.",
    ),
    file: UploadFile = File(
        description="Image file to upload.",
    ),
    alt_text: str | None = Form(
        default=None,
        description="Alternative text for the image.",
    ),
    position: int = Form(
        default=0,
        ge=0,
        description="Position/order index of the image.",
    ),
    service: ProductService = Depends(get_product_service),
):
    file_bytes = await file.read()
    file_name = file.filename or f"product_{product_id}_image"
    return await service.upload_image(
        product_id=product_id,
        file=file_bytes,
        file_name=file_name,
        alt_text=alt_text,
        position=position,
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
    service: ProductService = Depends(get_product_service),
):
    return await service.update_image(product_id, image_id, payload)


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
    service: ProductService = Depends(get_product_service),
):
    await service.delete_image(product_id, image_id)
    return Response(status_code=status.HTTP_204_NO_CONTENT)
