from __future__ import annotations

from datetime import datetime
from decimal import Decimal
from typing import Any
from urllib.parse import urlparse

from pydantic import (
    BaseModel,
    ConfigDict,
    Field,
    field_validator,
    model_validator,
)


class ProductBase(BaseModel):
    name: str = Field(min_length=1, max_length=200)
    category_id: int = Field(gt=0)
    description: str | None = None
    is_active: bool = True

    @field_validator("name")
    @classmethod
    def validate_name(cls, value: str) -> str:
        value = value.strip()
        if not value:
            raise ValueError("Product name cannot be empty.")
        return value

    @field_validator("description")
    @classmethod
    def sanitize_description(cls, value: str | None) -> str | None:
        if value is None:
            return None
        return value.strip() or None


class ProductCreate(ProductBase):
    pass


class ProductUpdate(BaseModel):
    name: str | None = Field(default=None, min_length=1, max_length=200)
    category_id: int | None = Field(default=None, gt=0)
    description: str | None = None
    is_active: bool | None = None

    @field_validator("name")
    @classmethod
    def validate_name(cls, value: str | None) -> str | None:
        if value is None:
            return None

        value = value.strip()
        if not value:
            raise ValueError("Product name cannot be empty.")
        return value

    @field_validator("description")
    @classmethod
    def sanitize_description(cls, value: str | None) -> str | None:
        if value is None:
            return None
        return value.strip() or None

    @model_validator(mode="after")
    def validate_update(self):
        if not self.model_fields_set:
            raise ValueError("Update payload cannot be empty.")

        non_nullable_fields = {"name", "category_id", "is_active"}

        for field in non_nullable_fields:
            if field in self.model_fields_set and getattr(self, field) is None:
                raise ValueError(f"{field} cannot be null.")

        return self


class ProductResponse(ProductBase):
    id: int
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)



class ProductVariantBase(BaseModel):
    sku: str = Field(min_length=1, max_length=100)
    price: Decimal = Field(
        ge=Decimal("0"),
        max_digits=12,
        decimal_places=2,
    )
    stock_quantity: int = Field(default=0, ge=0)
    attributes: dict[str, Any] = Field(default_factory=dict)
    is_active: bool = True

    @field_validator("sku")
    @classmethod
    def validate_sku(cls, value: str) -> str:
        value = value.strip()
        if not value:
            raise ValueError("SKU cannot be empty.")
        return value


class ProductVariantCreate(ProductVariantBase):
    pass


class ProductVariantUpdate(BaseModel):
    sku: str | None = Field(default=None, min_length=1, max_length=100)
    price: Decimal | None = Field(
        default=None,
        ge=Decimal("0"),
        max_digits=12,
        decimal_places=2,
    )
    stock_quantity: int | None = Field(default=None, ge=0)
    attributes: dict[str, Any] | None = None
    is_active: bool | None = None

    @field_validator("sku")
    @classmethod
    def validate_sku(cls, value: str | None) -> str | None:
        if value is None:
            return None

        value = value.strip()
        if not value:
            raise ValueError("SKU cannot be empty.")
        return value

    @model_validator(mode="after")
    def validate_update(self):
        if not self.model_fields_set:
            raise ValueError("Update payload cannot be empty.")

        for field in self.model_fields_set:
            if getattr(self, field) is None:
                raise ValueError(f"{field} cannot be null.")

        return self


class ProductVariantResponse(ProductVariantBase):
    id: int
    product_id: int
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)



class ProductImageBase(BaseModel):
    image_url: str = Field(min_length=1)
    imagekit_file_id: str = Field(min_length=1, max_length=255)
    alt_text: str | None = Field(default=None, max_length=255)
    position: int = Field(default=0, ge=0)

    @field_validator("image_url")
    @classmethod
    def validate_image_url(cls, value: str) -> str:
        value = value.strip()
        parsed = urlparse(value)

        if (
            parsed.scheme not in {"http", "https"}
            or not parsed.netloc
            or not parsed.hostname
        ):
            raise ValueError("A valid HTTP or HTTPS URL is required.")

        return value

    @field_validator("imagekit_file_id")
    @classmethod
    def validate_file_id(cls, value: str) -> str:
        value = value.strip()
        if not value:
            raise ValueError("ImageKit file ID cannot be empty.")
        return value

    @field_validator("alt_text")
    @classmethod
    def sanitize_alt_text(cls, value: str | None) -> str | None:
        if value is None:
            return None
        return value.strip() or None


class ProductImageCreate(ProductImageBase):
    pass


class ProductImageUpdate(BaseModel):
    image_url: str | None = Field(default=None, min_length=1)
    imagekit_file_id: str | None = Field(
        default=None,
        min_length=1,
        max_length=255,
    )
    alt_text: str | None = Field(default=None, max_length=255)
    position: int | None = Field(default=None, ge=0)

    @field_validator("image_url")
    @classmethod
    def validate_image_url(cls, value: str | None) -> str | None:
        if value is None:
            return None

        value = value.strip()
        parsed = urlparse(value)

        if (
            parsed.scheme not in {"http", "https"}
            or not parsed.netloc
            or not parsed.hostname
        ):
            raise ValueError("A valid HTTP or HTTPS URL is required.")

        return value

    @field_validator("imagekit_file_id")
    @classmethod
    def validate_file_id(cls, value: str | None) -> str | None:
        if value is None:
            return None

        value = value.strip()
        if not value:
            raise ValueError("ImageKit file ID cannot be empty.")
        return value

    @field_validator("alt_text")
    @classmethod
    def sanitize_alt_text(cls, value: str | None) -> str | None:
        if value is None:
            return None
        return value.strip() or None

    @model_validator(mode="after")
    def validate_update(self):
        if not self.model_fields_set:
            raise ValueError("Update payload cannot be empty.")

        non_nullable_fields = {
            "image_url",
            "imagekit_file_id",
            "position",
        }

        for field in non_nullable_fields:
            if field in self.model_fields_set and getattr(self, field) is None:
                raise ValueError(f"{field} cannot be null.")

        return self


class ProductImageResponse(ProductImageBase):
    id: int
    product_id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class ProductDetailResponse(ProductResponse):
    variants: list[ProductVariantResponse]
    images: list[ProductImageResponse]