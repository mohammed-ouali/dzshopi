from fastapi import APIRouter, Depends, Path, Query, status
from fastapi.responses import Response

from app.core.exception_handlers import ProblemDetails
from app.modules.categories.dependencies import get_category_service
from app.modules.categories.schemas import (
    CategoryCreate,
    CategoryResponse,
    CategoryUpdate,
)
from app.modules.categories.service import CategoryService

router = APIRouter(
    prefix="/categories",
    tags=["Categories"],
)


@router.get(
    "",
    summary="List categories",
    description="Retrieve all categories with optional filtering by active status.",
    response_model=list[CategoryResponse],
    responses={
        status.HTTP_422_UNPROCESSABLE_CONTENT: {"model": ProblemDetails},
    },
)
async def get_categories(
    is_active: bool | None = Query(
        default=None,
        description="Filter categories by active status.",
    ),
    service: CategoryService = Depends(get_category_service),
):
    return await service.get_all(is_active=is_active)


@router.get(
    "/{category_id}",
    summary="Get category",
    description="Retrieve a category by ID.",
    response_model=CategoryResponse,
    responses={
        status.HTTP_404_NOT_FOUND: {"model": ProblemDetails},
    },
)
async def get_category(
    category_id: int = Path(
        description="ID of the category to retrieve.",
    ),
    service: CategoryService = Depends(get_category_service),
):
    return await service.get_by_id(category_id)


@router.post(
    "",
    summary="Create category",
    description="Create a new category.",
    response_model=CategoryResponse,
    status_code=status.HTTP_201_CREATED,
    responses={
        status.HTTP_409_CONFLICT: {"model": ProblemDetails},
        status.HTTP_422_UNPROCESSABLE_CONTENT: {"model": ProblemDetails},
    },
)
async def create_category(
    payload: CategoryCreate,
    service: CategoryService = Depends(get_category_service),
):
    return await service.create(payload)


@router.patch(
    "/{category_id}",
    summary="Update category",
    description="Partially update an existing category.",
    response_model=CategoryResponse,
    responses={
        status.HTTP_404_NOT_FOUND: {"model": ProblemDetails},
        status.HTTP_409_CONFLICT: {"model": ProblemDetails},
        status.HTTP_422_UNPROCESSABLE_CONTENT: {"model": ProblemDetails},
    },
)
async def update_category(
    category_id: int = Path(
        description="ID of the category to update.",
    ),
    payload: CategoryUpdate = ...,
    service: CategoryService = Depends(get_category_service),
):
    return await service.update(category_id, payload)


@router.delete(
    "/{category_id}",
    summary="Delete category",
    description="Deactivate an existing category.",
    status_code=status.HTTP_204_NO_CONTENT,
    responses={
        status.HTTP_404_NOT_FOUND: {"model": ProblemDetails},
    },
)
async def delete_category(
    category_id: int = Path(
        description="ID of the category to deactivate.",
    ),
    service: CategoryService = Depends(get_category_service),
):
    await service.delete(category_id)
    return Response(status_code=status.HTTP_204_NO_CONTENT)
