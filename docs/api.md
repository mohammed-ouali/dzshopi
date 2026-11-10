# API Overview

## Products

Manages products, their variants, and associated images.

### Products

| Route | Description | Response Schema | Accepted Schema | Status Codes |
|---|---|---|---|---|
| `GET /products` | Retrieve a paginated list of products. | `PaginatedResponse[ProductResponse]` | Query: `page`, `limit`, `q`, `category_id`, `sort_by`, `order` | 200, 422 |
| `GET /products/{product_id}` | Retrieve a product by ID. | `ProductDetailResponse` | Path: `product_id` | 200, 404 |
| `POST /products` | Create a product. | `ProductResponse` | `ProductCreate` | 201, 409, 422 |
| `PATCH /products/{product_id}` | Partially update a product. | `ProductResponse` | Path: `product_id`; Body: `ProductUpdate` | 200, 404, 409, 422 |
| `DELETE /products/{product_id}` | Deactivate a product. | None | Path: `product_id` | 204, 404 |

### Product Variants


| Route | Description | Response Schema | Accepted Schema | Status Codes |
|---|---|---|---|---|
| `GET /products/{product_id}/variants` | Retrieve a paginated list of product variants. | `PaginatedResponse[ProductVariantResponse]` | Path: `product_id`; Query: `page`, `limit` | 200, 404, 422 |
| `GET /products/{product_id}/variants/{variant_id}` | Retrieve a product variant. | `ProductVariantResponse` | Path: `product_id`, `variant_id` | 200, 404 |
| `POST /products/{product_id}/variants` | Create a product variant. | `ProductVariantResponse` | Path: `product_id`; Body: `ProductVariantCreate` | 201, 404, 409, 422 |
| `PATCH /products/{product_id}/variants/{variant_id}` | Partially update a product variant. | `ProductVariantResponse` | Path: `product_id`, `variant_id`; Body: `ProductVariantUpdate` | 200, 404, 409, 422 |
| `DELETE /products/{product_id}/variants/{variant_id}` | Deactivate a product variant. | None | Path: `product_id`, `variant_id` | 204, 404 |

### Product Images


| Route | Description | Response Schema | Accepted Schema | Status Codes |
|---|---|---|---|---|
| `GET /products/{product_id}/images` | Retrieve all images belonging to a product. | `list[ProductImageResponse]` | Path: `product_id` | 200, 404 |
| `POST /products/{product_id}/images` | Add an image to a product. | `ProductImageResponse` | Path: `product_id`; Body: `ProductImageCreate` | 201, 404, 422 |
| `PATCH /products/{product_id}/images/{image_id}` | Partially update product image metadata. | `ProductImageResponse` | Path: `product_id`, `image_id`; Body: `ProductImageUpdate` | 200, 404, 422 |
| `DELETE /products/{product_id}/images/{image_id}` | Delete a product image. | None | Path: `product_id`, `image_id` | 204, 404 |