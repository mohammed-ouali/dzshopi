from app.core.exceptions import DomainException


class ProductNotFound(DomainException):
    status_code = 404
    title = "Product Not Found"
    default_message = "The requested product could not be found."


class ProductVariantNotFound(DomainException):
    status_code = 404
    title = "Product Variant Not Found"
    default_message = "The requested product variant could not be found."


class ProductImageNotFound(DomainException):
    status_code = 404
    title = "Product Image Not Found"
    default_message = "The requested product image could not be found."


class ProductVariantSKUAlreadyExists(DomainException):
    status_code = 409
    title = "Product Variant SKU Conflict"
    default_message = "A product variant with this SKU already exists."