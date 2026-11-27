from sqlalchemy import func, or_, select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import joinedload, selectinload

from app.modules.products.models import Product, ProductImage, ProductVariant


class ProductRepository:
    def __init__(self, session: AsyncSession) -> None:
        self.session = session

    async def get_by_id(
        self,
        product_id: int,
        load_relations: bool = False,
    ) -> Product | None:
        query = select(Product).where(Product.id == product_id)
        if load_relations:
            query = query.options(
                selectinload(Product.variants),
                selectinload(Product.images),
                joinedload(Product.category),
            )
        result = await self.session.execute(query)
        return result.scalar_one_or_none()

    async def get_list(
        self,
        page: int = 1,
        limit: int = 10,
        q: str | None = None,
        category_id: int | None = None,
        sort_by: str | None = None,
        order: str | None = None,
        is_active: bool | None = True,
    ) -> tuple[list[Product], int]:
        query = select(Product)
        count_query = select(func.count()).select_from(Product)

        filters = []
        if is_active is not None:
            filters.append(Product.is_active == is_active)
        if category_id is not None:
            filters.append(Product.category_id == category_id)
        if q:
            pattern = f"%{q.strip()}%"
            filters.append(
                or_(
                    Product.name.ilike(pattern),
                    Product.description.ilike(pattern),
                )
            )

        if filters:
            query = query.where(*filters)
            count_query = count_query.where(*filters)

        total_result = await self.session.execute(count_query)
        total = total_result.scalar_one()

        sort_columns = {
            "id": Product.id,
            "name": Product.name,
            "created_at": Product.created_at,
            "updated_at": Product.updated_at,
        }
        sort_col = sort_columns.get(sort_by or "id", Product.id)
        if (order or "asc").lower() == "desc":
            query = query.order_by(sort_col.desc())
        else:
            query = query.order_by(sort_col.asc())

        query = (
            query.options(selectinload(Product.images))
            .offset((page - 1) * limit)
            .limit(limit)
        )
        result = await self.session.execute(query)
        return list(result.scalars().all()), total

    async def create(self, product: Product) -> Product:
        self.session.add(product)
        await self.session.flush()
        await self.session.refresh(product)
        return product

    async def update(self, product: Product) -> Product:
        await self.session.flush()
        await self.session.refresh(product)
        return product

    async def soft_delete(self, product: Product) -> Product:
        product.is_active = False
        await self.session.flush()
        await self.session.refresh(product)
        return product


class ProductVariantRepository:
    def __init__(self, session: AsyncSession) -> None:
        self.session = session

    async def get_by_id(
        self,
        variant_id: int,
        product_id: int,
    ) -> ProductVariant | None:
        query = select(ProductVariant).where(
            ProductVariant.id == variant_id,
            ProductVariant.product_id == product_id,
        )
        result = await self.session.execute(query)
        return result.scalar_one_or_none()

    async def get_by_sku(self, sku: str) -> ProductVariant | None:
        query = select(ProductVariant).where(ProductVariant.sku == sku)
        result = await self.session.execute(query)
        return result.scalar_one_or_none()

    async def get_list(
        self,
        product_id: int,
        page: int = 1,
        limit: int = 10,
        is_active: bool | None = True,
    ) -> tuple[list[ProductVariant], int]:
        filters = [ProductVariant.product_id == product_id]
        if is_active is not None:
            filters.append(ProductVariant.is_active == is_active)

        count_query = (
            select(func.count()).select_from(ProductVariant).where(*filters)
        )
        total_result = await self.session.execute(count_query)
        total = total_result.scalar_one()

        query = (
            select(ProductVariant)
            .where(*filters)
            .order_by(ProductVariant.id)
            .offset((page - 1) * limit)
            .limit(limit)
        )
        result = await self.session.execute(query)
        return list(result.scalars().all()), total

    async def create(self, variant: ProductVariant) -> ProductVariant:
        self.session.add(variant)
        await self.session.flush()
        await self.session.refresh(variant)
        return variant

    async def update(self, variant: ProductVariant) -> ProductVariant:
        await self.session.flush()
        await self.session.refresh(variant)
        return variant

    async def soft_delete(self, variant: ProductVariant) -> ProductVariant:
        variant.is_active = False
        await self.session.flush()
        await self.session.refresh(variant)
        return variant


class ProductImageRepository:
    def __init__(self, session: AsyncSession) -> None:
        self.session = session

    async def get_by_id(
        self,
        image_id: int,
        product_id: int,
    ) -> ProductImage | None:
        query = select(ProductImage).where(
            ProductImage.id == image_id,
            ProductImage.product_id == product_id,
        )
        result = await self.session.execute(query)
        return result.scalar_one_or_none()

    async def get_by_file_id(self, imagekit_file_id: str) -> ProductImage | None:
        query = select(ProductImage).where(
            ProductImage.imagekit_file_id == imagekit_file_id
        )
        result = await self.session.execute(query)
        return result.scalar_one_or_none()

    async def get_list(self, product_id: int) -> list[ProductImage]:
        query = (
            select(ProductImage)
            .where(ProductImage.product_id == product_id)
            .order_by(ProductImage.position, ProductImage.id)
        )
        result = await self.session.execute(query)
        return list(result.scalars().all())

    async def create(self, image: ProductImage) -> ProductImage:
        self.session.add(image)
        await self.session.flush()
        await self.session.refresh(image)
        return image

    async def update(self, image: ProductImage) -> ProductImage:
        await self.session.flush()
        await self.session.refresh(image)
        return image

    async def delete(self, image: ProductImage) -> None:
        await self.session.delete(image)
        await self.session.flush()
