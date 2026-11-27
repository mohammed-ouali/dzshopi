import logging

from app.core.storage import ImageKitStorage
from app.core.storage import storage as default_storage
from app.modules.categories.exceptions import CategoryNotFound
from app.modules.categories.repository import CategoryRepository
from app.modules.products.exceptions import (
    ProductImageNotFound,
    ProductNotFound,
    ProductVariantNotFound,
    ProductVariantSKUAlreadyExists,
)
from app.modules.products.models import Product, ProductImage, ProductVariant
from app.modules.products.repository import (
    ProductImageRepository,
    ProductRepository,
    ProductVariantRepository,
)
from app.modules.products.schemas import (
    ProductCreate,
    ProductImageCreate,
    ProductImageUpdate,
    ProductUpdate,
    ProductVariantCreate,
    ProductVariantUpdate,
)

logger = logging.getLogger(__name__)


class ProductService:
    def __init__(
        self,
        product_repo: ProductRepository,
        variant_repo: ProductVariantRepository,
        image_repo: ProductImageRepository,
        category_repo: CategoryRepository,
        storage: ImageKitStorage | None = None,
    ) -> None:
        self.product_repo = product_repo
        self.variant_repo = variant_repo
        self.image_repo = image_repo
        self.category_repo = category_repo
        self.storage = storage or default_storage

    async def _ensure_active_category(self, category_id: int) -> None:
        category = await self.category_repo.get_by_id(category_id)
        if category is None or not category.is_active:
            raise CategoryNotFound()

    # Products

    async def get_product(self, product_id: int) -> Product:
        product = await self.product_repo.get_by_id(
            product_id,
            load_relations=True,
        )
        if product is None or not product.is_active:
            raise ProductNotFound()
        return product

    async def list_products(
        self,
        page: int = 1,
        limit: int = 10,
        q: str | None = None,
        category_id: int | None = None,
        sort_by: str | None = None,
        order: str | None = None,
        is_active: bool | None = True,
    ) -> tuple[list[Product], int]:
        return await self.product_repo.get_list(
            page=page,
            limit=limit,
            q=q,
            category_id=category_id,
            sort_by=sort_by,
            order=order,
            is_active=is_active,
        )

    async def create_product(self, data: ProductCreate) -> Product:
        await self._ensure_active_category(data.category_id)
        product = Product(
            name=data.name,
            category_id=data.category_id,
            description=data.description,
            is_active=data.is_active,
        )
        created = await self.product_repo.create(product)
        await self.product_repo.session.commit()
        return created

    async def update_product(
        self,
        product_id: int,
        data: ProductUpdate,
    ) -> Product:
        product = await self.get_product(product_id)
        update_data = data.model_dump(exclude_unset=True)

        if (
            "category_id" in update_data
            and update_data["category_id"] != product.category_id
        ):
            await self._ensure_active_category(update_data["category_id"])

        for field, value in update_data.items():
            setattr(product, field, value)

        updated = await self.product_repo.update(product)
        await self.product_repo.session.commit()
        return updated

    async def delete_product(self, product_id: int) -> None:
        product = await self.get_product(product_id)
        await self.product_repo.soft_delete(product)
        await self.product_repo.session.commit()

    # Variants

    async def list_variants(
        self,
        product_id: int,
        page: int = 1,
        limit: int = 10,
    ) -> tuple[list[ProductVariant], int]:
        await self.get_product(product_id)
        return await self.variant_repo.get_list(
            product_id=product_id,
            page=page,
            limit=limit,
        )

    async def get_variant(
        self,
        product_id: int,
        variant_id: int,
    ) -> ProductVariant:
        await self.get_product(product_id)
        variant = await self.variant_repo.get_by_id(variant_id, product_id)
        if variant is None or not variant.is_active:
            raise ProductVariantNotFound()
        return variant

    async def create_variant(
        self,
        product_id: int,
        data: ProductVariantCreate,
    ) -> ProductVariant:
        await self.get_product(product_id)
        existing = await self.variant_repo.get_by_sku(data.sku)
        if existing is not None:
            raise ProductVariantSKUAlreadyExists()

        variant = ProductVariant(
            product_id=product_id,
            sku=data.sku,
            price=data.price,
            stock_quantity=data.stock_quantity,
            attributes=data.attributes,
            is_active=data.is_active,
        )
        created = await self.variant_repo.create(variant)
        await self.variant_repo.session.commit()
        return created

    async def update_variant(
        self,
        product_id: int,
        variant_id: int,
        data: ProductVariantUpdate,
    ) -> ProductVariant:
        variant = await self.get_variant(product_id, variant_id)
        update_data = data.model_dump(exclude_unset=True)

        if "sku" in update_data and update_data["sku"] != variant.sku:
            existing = await self.variant_repo.get_by_sku(update_data["sku"])
            if existing is not None:
                raise ProductVariantSKUAlreadyExists()

        for field, value in update_data.items():
            setattr(variant, field, value)

        updated = await self.variant_repo.update(variant)
        await self.variant_repo.session.commit()
        return updated

    async def delete_variant(self, product_id: int, variant_id: int) -> None:
        variant = await self.get_variant(product_id, variant_id)
        await self.variant_repo.soft_delete(variant)
        await self.variant_repo.session.commit()

    # Images

    async def list_images(self, product_id: int) -> list[ProductImage]:
        await self.get_product(product_id)
        return await self.image_repo.get_list(product_id)

    async def upload_image(
        self,
        product_id: int,
        file: bytes,
        file_name: str,
        folder: str = "/products",
        alt_text: str | None = None,
        position: int = 0,
    ) -> ProductImage:
        await self.get_product(product_id)

        # 1. External upload first
        image_url, file_id = await self.storage.upload(
            file=file,
            file_name=file_name,
            folder=folder,
        )

        try:
            # 2. Database transaction
            image = ProductImage(
                product_id=product_id,
                image_url=image_url,
                imagekit_file_id=file_id,
                alt_text=alt_text,
                position=position,
            )
            created = await self.image_repo.create(image)
            await self.image_repo.session.commit()
            return created
        except Exception:
            # 3. DB rolls back, and we explicitly clean up the external service
            await self.image_repo.session.rollback()
            try:
                await self.storage.delete(file_id)  # Compensating action
            except Exception as cleanup_exc:
                logger.error(
                    "Failed to delete orphaned ImageKit file %s after DB error: %s",
                    file_id,
                    cleanup_exc,
                )
            raise

    async def add_image(
        self,
        product_id: int,
        data: ProductImageCreate,
    ) -> ProductImage:
        await self.get_product(product_id)
        image = ProductImage(
            product_id=product_id,
            image_url=data.image_url,
            imagekit_file_id=data.imagekit_file_id,
            alt_text=data.alt_text,
            position=data.position,
        )
        created = await self.image_repo.create(image)
        await self.image_repo.session.commit()
        return created

    async def update_image(
        self,
        product_id: int,
        image_id: int,
        data: ProductImageUpdate,
    ) -> ProductImage:
        await self.get_product(product_id)
        image = await self.image_repo.get_by_id(image_id, product_id)
        if image is None:
            raise ProductImageNotFound()

        update_data = data.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(image, field, value)

        updated = await self.image_repo.update(image)
        await self.image_repo.session.commit()
        return updated

    async def delete_image(self, product_id: int, image_id: int) -> None:
        await self.get_product(product_id)
        image = await self.image_repo.get_by_id(image_id, product_id)
        if image is None:
            raise ProductImageNotFound()

        file_id = image.imagekit_file_id

        await self.image_repo.delete(image)
        await self.image_repo.session.commit()

        if file_id and self.storage:
            try:
                await self.storage.delete(file_id)
            except Exception as exc:
                logger.error(
                    "Failed to delete image %s with file_id %s from ImageKit storage: %s",
                    image_id,
                    file_id,
                    exc,
                )
