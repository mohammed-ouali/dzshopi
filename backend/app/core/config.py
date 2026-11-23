from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict

BASE_DIR = Path(__file__).resolve().parent.parent.parent


class Settings(BaseSettings):
    app_name: str = "DzShopi"
    debug: bool = True
    database_url: str = "postgresql+asyncpg://postgres:postgres@localhost:5432/dzshopi"
    version: str = "0.1.0"

    model_config = SettingsConfigDict(
        env_file=(BASE_DIR / ".env", ".env"),
        env_file_encoding="utf-8",
        extra="ignore",
    )


settings = Settings()
