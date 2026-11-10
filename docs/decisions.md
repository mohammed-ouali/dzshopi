# Decisions Overview

## 1. Technology Stack

- **Frontend — React + Vite:** Selected for practical development, fast iteration, and suitability for the project's size without unnecessary frontend infrastructure.
- **Styling — Tailwind CSS:** Selected for efficient UI development and consistent styling.
- **Backend — FastAPI:** Selected for its performance, native asynchronous support, Pydantic integration, and automatic OpenAPI documentation.
- **Database — PostgreSQL:** Selected for relational consistency, strong constraints, transactions, and rich data types, including JSONB.
- **Language — Python:** Used for backend development and its ecosystem.
- **Validation — Pydantic:** Used for request validation, response schemas, and settings management.

## 2. Architecture & Code Organization

- **Modular Monolith:** The backend is organized into independent business modules within one application and deployment unit.
- **Layered Architecture:** Each module separates Router, Service, Repository, Schemas, and Models.
- **Centralized Routing:** `main.py` registers the central API router, which aggregates module routers.
- **Core and Shared:** `core/` contains application infrastructure; `shared/` contains reusable components shared across modules.
- **Module-by-Module Development:** Modules are implemented incrementally, following their dependencies and business requirements.
- **Contract-First Development:** Define schemas and exceptions, implement mock endpoints, validate the API contract with the frontend, then implement repository and service logic without unnecessarily changing the contract.
- **Frontend/Backend Separation:** Frontend and backend remain independently developed applications communicating through the API.

## 3. Database & Data Management

- **ORM — SQLAlchemy:** Selected for its mature ORM, explicit relationship mapping, query capabilities, and asynchronous support.
- **Asynchronous Database Driver — asyncpg:** Used for asynchronous PostgreSQL connections.
- **Migrations — Alembic:** Used to version and manage database schema changes.
- **Database Relationships:** Relational constraints and foreign keys enforce data integrity at the database level.
- **Flexible Variant Attributes:** PostgreSQL JSONB stores variant-specific attributes such as size, color, RAM, and storage.
- **Product Variants:** Price, stock, SKU, and variant attributes belong to variants rather than the product itself.
- **Order Snapshots:** Order items preserve purchase-time product information so historical orders remain meaningful when products change.
- **Soft Deactivation:** Users, products, categories, and variants are deactivated instead of routinely hard-deleted.
- **Order Retention:** Orders are preserved as historical records rather than deleted.
- **Disposable Data:** Cart and wishlist contents may be deleted when appropriate.
- **Image Storage — ImageKit.io:** Product image files are stored externally; the database stores their URLs and ImageKit file IDs.
- **Image Upload:** The frontend uploads directly to ImageKit, while the backend receives and manages image metadata.
- **No Wilaya Table:** Wilaya and delivery-office information are stored as order attributes rather than introducing a separate geographic table.

## 4. API Design

- **REST API:** Resources are exposed through REST-style endpoints.
- **API Versioning:** Routes use the `/api/v1` prefix.
- **Partial Updates:** PATCH is used for partial resource updates.
- **Response Schemas:** Pydantic response models define the API contract.
- **Pagination:** Collection endpoints use a shared pagination response structure.
- **Nested Resources:** Variants and images are nested under their parent product.
- **No Duplicate Parent IDs:** Parent identifiers are obtained from URL paths rather than duplicated in request bodies.
- **Mock Endpoints:** Representative schema-valid responses are used to establish and test the frontend contract before database integration.

## 5. Security & Authentication

- **Authentication — JWT Bearer:** JWT is used for stateless API authentication.
- **Password Hashing — Argon2:** Passwords are hashed using `pwdlib` with Argon2.
- **Guest-First Experience:** Browsing, cart operations, checkout, and order placement do not require an account.
- **Optional Accounts:** Accounts support order tracking, order history, and writing reviews.
- **Guest Order Access:** Order tracking must use a secure verification mechanism; an order ID alone is insufficient.
- **Account Deactivation:** Account deletion deactivates the user instead of routinely deleting the database record.
- **Authorization Boundaries:** Authentication is required only for endpoints that need an authenticated user.
- **CORS:** CORS middleware controls permitted cross-origin requests.
- **Security Headers:** Security headers are handled centrally through middleware.
- **Rate Limiting:** Rate limiting is applied at the API boundary.

## 6. Infrastructure & Deployment

- **Docker:** Used to containerize the application and its production dependencies.
- **Nginx:** Used as the production reverse proxy and entry point for HTTP/HTTPS traffic.
- **GitHub Actions:** Used for automated workflows such as testing, building, and deployment.
- **Environment Configuration:** Environment-specific configuration and secrets are kept outside source code.
- **Redis:** Planned for caching; its introduction is separate from the core application implementation.
- **Worker:** Deferred until background tasks such as email notifications or asset cleanup justify a separate process.
- **Email Service:** Designed as a shared service for application email operations; provider integration is implemented when needed.

## 7. Performance & Reliability

- **Asynchronous I/O:** Async database operations and FastAPI endpoints are used where they provide meaningful benefits.
- **Caching:** Redis is the planned caching solution; caching is introduced for identified performance needs rather than applied indiscriminately.
- **Logging:** Application logging is centralized rather than implemented independently in every module.
- **Request Monitoring:** Middleware measures request execution time and supports performance logging.
- **Atomic Operations:** Stock validation and decrement during order processing must be transaction-safe.
- **Database Optimization:** Constraints and indexes support data integrity and frequently executed queries.
- **Background Processing:** Long-running or non-critical tasks will be moved to a worker when the need arises, rather than delaying critical HTTP responses.