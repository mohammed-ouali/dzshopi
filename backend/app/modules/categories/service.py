from app.modules.categories.exceptions import (
    CategoryNameAlreadyExists,
    CategoryNotFound,
)
from app.modules.categories.models import Category
from app.modules.categories.repository import CategoryRepository
from app.modules.categories.schemas import CategoryCreate, CategoryUpdate


class CategoryService:
    def __init__(self, repository: CategoryRepository) -> None:
        self.repository = repository

    async def get_all(self, is_active: bool | None = None) -> list[Category]:
        return await self.repository.get_all(is_active=is_active)

    async def get_by_id(self, category_id: int) -> Category:
        category = await self.repository.get_by_id(category_id)
        if category is None:
            raise CategoryNotFound()
        return category

    async def create(self, data: CategoryCreate) -> Category:
        existing = await self.repository.get_by_name(data.name)
        if existing is not None:
            raise CategoryNameAlreadyExists()

        category = Category(
            name=data.name,
            description=data.description,
            is_active=data.is_active,
        )
        created = await self.repository.create(category)
        await self.repository.session.commit()
        return created

    async def update(self, category_id: int, data: CategoryUpdate) -> Category:
        category = await self.get_by_id(category_id)
        update_data = data.model_dump(exclude_unset=True)

        if "name" in update_data and update_data["name"] != category.name:
            existing = await self.repository.get_by_name(update_data["name"])
            if existing is not None:
                raise CategoryNameAlreadyExists()

        for field, value in update_data.items():
            setattr(category, field, value)

        updated = await self.repository.update(category)
        await self.repository.session.commit()
        return updated

    async def delete(self, category_id: int) -> None:
        category = await self.get_by_id(category_id)
        await self.repository.delete(category)
        await self.repository.session.commit()
