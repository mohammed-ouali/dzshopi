from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.storage import ImageKitStorage, storage
from app.modules.categories.dependencies import get_category_repository
from app.modules.categories.repository import CategoryRepository
from app.modules.products.repository import (
    ProductImageRepository,
    ProductRepository,
    ProductVariantRepository,
)
from app.modules.products.service import ProductService


def get_storage() -> ImageKitStorage:
    return storage


def get_product_repository(
    db: AsyncSession = Depends(get_db),
) -> ProductRepository:
    return ProductRepository(db)


def get_product_variant_repository(
    db: AsyncSession = Depends(get_db),
) -> ProductVariantRepository:
    return ProductVariantRepository(db)


def get_product_image_repository(
    db: AsyncSession = Depends(get_db),
) -> ProductImageRepository:
    return ProductImageRepository(db)


def get_product_service(
    product_repo: ProductRepository = Depends(get_product_repository),
    variant_repo: ProductVariantRepository = Depends(
        get_product_variant_repository
    ),
    image_repo: ProductImageRepository = Depends(get_product_image_repository),
    category_repo: CategoryRepository = Depends(get_category_repository),
    storage_service: ImageKitStorage = Depends(get_storage),
) -> ProductService:
    return ProductService(
        product_repo=product_repo,
        variant_repo=variant_repo,
        image_repo=image_repo,
        category_repo=category_repo,
        storage=storage_service,
    )

