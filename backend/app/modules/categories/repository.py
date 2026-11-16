from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.modules.categories.models import Category


class CategoryRepository:
    def __init__(self, session: AsyncSession) -> None:
        self.session = session

    async def get_all(self, is_active: bool | None = None) -> list[Category]:
        query = select(Category)
        if is_active is not None:
            query = query.where(Category.is_active == is_active)
        query = query.order_by(Category.id)
        result = await self.session.execute(query)
        return list(result.scalars().all())

    async def get_by_id(self, category_id: int) -> Category | None:
        query = select(Category).where(Category.id == category_id)
        result = await self.session.execute(query)
        return result.scalar_one_or_none()

    async def get_by_name(self, name: str) -> Category | None:
        query = select(Category).where(Category.name == name)
        result = await self.session.execute(query)
        return result.scalar_one_or_none()

    async def create(self, category: Category) -> Category:
        self.session.add(category)
        await self.session.flush()
        await self.session.refresh(category)
        return category

    async def update(self, category: Category) -> Category:
        await self.session.flush()
        await self.session.refresh(category)
        return category

    async def delete(self, category: Category) -> Category:
        category.is_active = False
        await self.session.flush()
        await self.session.refresh(category)
        return category
