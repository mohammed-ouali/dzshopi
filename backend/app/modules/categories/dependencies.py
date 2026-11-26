from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.modules.categories.repository import CategoryRepository
from app.modules.categories.service import CategoryService


def get_category_repository(
    db: AsyncSession = Depends(get_db),
) -> CategoryRepository:
    return CategoryRepository(db)


def get_category_service(
    repository: CategoryRepository = Depends(get_category_repository),
) -> CategoryService:
    return CategoryService(repository)
