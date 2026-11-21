import pytest
from httpx import AsyncClient


@pytest.mark.asyncio
async def test_health_live(api_client: AsyncClient):
    response = await api_client.get("/health/live")
    assert response.status_code == 200
    assert response.json() == {"status": "healthy"}


@pytest.mark.asyncio
async def test_health_ready(client: AsyncClient):
    response = await client.get("/health/ready")
    assert response.status_code in (200, 503)
