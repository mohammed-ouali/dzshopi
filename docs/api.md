# DzShopi — API Endpoints Specification

## 1. Document Purpose

This document defines the API endpoint contract for DzShopi. It specifies the HTTP methods, endpoint paths, descriptions, response models, status codes, and parameters for each endpoint.

All backend modules will follow the same documentation structure and API design principles to ensure consistency across the application.

The document serves as a shared reference for frontend and backend development. The interactive API documentation will be generated automatically through FastAPI's OpenAPI specification.

## 2. General API Conventions

- **Base URL prefix:** `/api/v1`
- **HTTP methods:** GET, POST, PATCH, DELETE.
- **Updates:** PATCH is used for partial resource updates.
- **Creation:** POST endpoints return HTTP 201.
- **Retrieval:** GET endpoints return HTTP 200.
- **Updates:** PATCH endpoints return HTTP 200.
- **Deletion:** DELETE endpoints return HTTP 204 with no response body.
- **Path parameters:** Resource identifiers are passed through URL paths.
- **Request bodies:** Defined using Pydantic schemas.
- **Response models:** Defined using Pydantic response schemas where applicable.
- **Pagination:** Paginated endpoints use a consistent pagination response structure.

## 3. Products Module

**Router prefix:** `/products`

### 3.1 Products

| Method | Endpoint | Description | Response Model | Status Code | Parameters |
|---|---|---|---|---|---|
| GET | `/products` | Retrieve a paginated list of products. | `PaginatedResponse[ProductResponse]` | 200 | Query: `page`, `limit`, `q`, `category_id`, `sort_by`, `order` |
| GET | `/products/{product_id}` | Retrieve a product by its ID. | `ProductResponse` | 200 | Path: `product_id` |
| POST | `/products` | Create a new product. | `ProductResponse` | 201 | Body: `ProductCreate` |
| PATCH | `/products/{product_id}` | Partially update an existing product. | `ProductResponse` | 200 | Path: `product_id`; Body: `ProductUpdate` |
| DELETE | `/products/{product_id}` | Delete or deactivate a product. | None | 204 | Path: `product_id` |

**GET `/products` query parameters:**

| Parameter | Type | Required | Default | Description |
|---|---|---|---|---|
| `page` | int | No | 1 | Page number. |
| `limit` | int | No | 10 | Number of products per page (1–100). |
| `q` | string | No | None | Search products by name. |
| `category_id` | int | No | None | Filter products by category. |
| `sort_by` | string | No | `created_at` | Sort by `created_at` or `name`. |
| `order` | string | No | `desc` | Sorting direction: `asc` or `desc`. |

### 3.2 Product Variants

| Method | Endpoint | Description | Response Model | Status Code | Parameters |
|---|---|---|---|---|---|
| GET | `/products/{product_id}/variants` | Retrieve paginated variants belonging to a product. | `PaginatedResponse[ProductVariantResponse]` | 200 | Path: `product_id`; Query: `page`, `limit` |
| GET | `/products/{product_id}/variants/{variant_id}` | Retrieve a specific product variant. | `ProductVariantResponse` | 200 | Path: `product_id`, `variant_id` |
| POST | `/products/{product_id}/variants` | Create a new variant for a product. | `ProductVariantResponse` | 201 | Path: `product_id`; Body: `ProductVariantCreate` |
| PATCH | `/products/{product_id}/variants/{variant_id}` | Partially update a product variant. | `ProductVariantResponse` | 200 | Path: `product_id`, `variant_id`; Body: `ProductVariantUpdate` |
| DELETE | `/products/{product_id}/variants/{variant_id}` | Delete or deactivate a product variant. | None | 204 | Path: `product_id`, `variant_id` |

**GET `/products/{product_id}/variants` query parameters:**

| Parameter | Type | Required | Default | Description |
|---|---|---|---|---|
| `page` | int | No | 1 | Page number. |
| `limit` | int | No | 10 | Number of variants per page (1–100). |

### 3.3 Product Images

| Method | Endpoint | Description | Response Model | Status Code | Parameters |
|---|---|---|---|---|---|
| GET | `/products/{product_id}/images` | Retrieve all images belonging to a product. | `list[ProductImageResponse]` | 200 | Path: `product_id` |
| POST | `/products/{product_id}/images` | Add an image to a product. | `ProductImageResponse` | 201 | Path: `product_id`; Body: `ProductImageCreate` |
| PATCH | `/products/{product_id}/images/{image_id}` | Partially update product image metadata. | `ProductImageResponse` | 200 | Path: `product_id`, `image_id`; Body: `ProductImageUpdate` |
| DELETE | `/products/{product_id}/images/{image_id}` | Delete a product image. | None | 204 | Path: `product_id`, `image_id` |

## 4. API Design Notes

The following decisions apply to the Products module and should be considered when designing other modules.

### Resource Relationships

- Product variants and product images are nested under their parent product.
- `product_id` is obtained from the URL path when creating variants or images. It is not duplicated in the request body.
- Product details, variants, and images are retrieved through separate endpoints.

### Product Variants

- Product prices belong to variants rather than products.
- Variant attributes are flexible and may represent options such as size, color, RAM, or storage capacity.

### Product Images

- Images belong to products, not individual variants.
- Image files are uploaded directly from the frontend to ImageKit.
- The backend receives image metadata, including the image URL and ImageKit file ID.
- No individual image retrieval endpoint is provided; the product images list is sufficient.

### Update and Delete Operations

- PATCH is used for partial updates rather than PUT.
- DELETE endpoints return HTTP 204 without a response body.
- Product and variant deletion may be implemented as soft deactivation in the backend.

## 5. Current Development Phase

During the initial API development phase:

- Endpoints return predefined mock responses.
- Response schemas and endpoint parameters are defined to establish the frontend contract.
- Database operations, repositories, services, and business logic are not implemented yet.
- Error responses may be documented in OpenAPI without implementing their handling during this phase.

The mock implementations will later be replaced with actual backend logic while preserving the established API contract wherever possible.

---

**Module Summary**

| Resource | Number of Endpoints |
|---|---:|
| Products | 5 |
| Product Variants | 5 |
| Product Images | 4 |
| **Total** | **14** |
