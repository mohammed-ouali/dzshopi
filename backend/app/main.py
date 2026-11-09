from fastapi import FastAPI
from fastapi import HTTPException, status
from fastapi.exceptions import RequestValidationError

from sqlalchemy import text

from app.core.database import engine

from app.core.config import settings
from app.core.exceptions import DomainException
from app.core.exception_handlers import domain_exception_handler, validation_exception_handler, unhandled_exception_handler

app = FastAPI(
    title=settings.app_name,
    description=(
        "The DzShopi API provides the HTTP interface to the DzShopi e-commerce "
        "platform. It exposes endpoints for product catalog browsing, category "
        "management, shopping carts, order placement and tracking, customer "
        "accounts, and product reviews. The API is designed around a guest-first "
        "shopping experience, with authentication required only for "
        "customer-specific features."
    ),
    version=settings.version,
    debug=settings.debug
)

@app.get(
    "/health/live",
    summary="Liveness check",
    description="Verify that the API application is running.",
    tags=["Health"],
)
async def check_health():
    return {"status": "healthy"}

@app.get(
    "/health/ready",
    summary="Readiness check",
    description="Check whether the API can connect to its database.",
    tags=["Health"],
)
async def check_readiness():
    try:
        async with engine.connect() as connection:
            await connection.execute(text("SELECT 1"))
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Service is not ready.",
        )

    return {"status": "ready"}

app.add_exception_handler(DomainException, domain_exception_handler)
app.add_exception_handler(RequestValidationError, validation_exception_handler) 
app.add_exception_handler(Exception, unhandled_exception_handler)