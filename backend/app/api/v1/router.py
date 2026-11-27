from fastapi import APIRouter

from app.modules.categories.router import router as categories_router
from app.modules.products.router import router as products_router

api_router = APIRouter()
api_router.include_router(categories_router)
api_router.include_router(products_router)
