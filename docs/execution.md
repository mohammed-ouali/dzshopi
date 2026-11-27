# DzShopi — Execution Plan

```mermaid
flowchart LR
    M1["M1\nDocker\n& Test\nHarness"]
    M2["M2\nCategories"]
    M3["M3\nProducts\n& ImageKit"]
    M4["M4\nUsers\n& Auth"]
    M5["M5\nMiddleware\nSecurity\n& Caching"]
    M6["M6\nCarts"]
    M7["M7\nOrders\n& Checkout"]
    M8["M8\nReviews\n& Wishlists"]
    M9["M9\nBackground\nJobs"]
    M10["M10\nCI/CD"]
    M11["M11\nDeploy"]

    M1 --> M2 --> M3 --> M4 --> M5
    M5 --> M6 --> M7 --> M8 --> M9 --> M10 --> M11
```

> [!IMPORTANT]
> Every milestone ends with passing tests. No milestone is "done" until all its integration tests pass.

---

## Milestone 1 — Docker Environment & Test Harness

### Tasks

#### 1.1 — `docker-compose.yml`

| Service | Image | Purpose |
|---|---|---|
| `postgres` | `postgres:16-alpine` | Dev database on port 5432 |
| `redis` | `redis:7-alpine` | Cache/rate-limiting (used in M5) |
| `api` | Build from `backend/Dockerfile` | FastAPI app with live reload |

Environment variables for `api`:
- `DATABASE_URL=postgresql+asyncpg://postgres:postgres@postgres:5432/dzshopi`
- `APP_NAME=DzShopi`
- `DEBUG=true`
- `VERSION=0.1.0`

#### 1.2 — `backend/Dockerfile` (multi-stage)

| Stage | Purpose |
|---|---|
| `base` | Python 3.12 slim, install uv, copy pyproject.toml, sync deps |
| `dev` | FROM base, copy source, CMD uvicorn with --reload |
| `test` | FROM base, install dev deps, copy source + tests |
| `production` | FROM base, copy source only, non-root user, CMD uvicorn workers |

#### 1.3 — `docker-compose.test.yml`
Isolated `postgres_test` database, runs `pytest` inside a container, database destroyed after run.

#### 1.4 — `backend/tests/conftest.py`
Shared async test fixtures:
- `engine` → async engine pointing to test database
- `create_tables` → `Base.metadata.create_all` before session, drops after
- `db_session` → `AsyncSession` wrapped in a transaction that rolls back after each test
- `client` → `httpx.AsyncClient` with `ASGITransport`, `get_db` overridden to test session

#### 1.5 — Linting baseline
- Add `[tool.ruff]` to `pyproject.toml`: `line-length = 100`, `target-version = "py312"`
- Run `ruff check .` and `ruff format .`

### Verification
- [ ] `docker compose up` starts postgres, redis, and API; `/health/live` returns 200
- [ ] `docker compose -f docker-compose.test.yml run --rm test` executes pytest (0 tests collected, exit 0)
- [ ] `ruff check .` exits clean

---

## Milestone 2 — Categories Module

### Tasks

#### 2.1 — `categories/exceptions.py`
- `CategoryNotFound(DomainException)` → 404
- `CategoryNameAlreadyExists(DomainException)` → 409

#### 2.2 — `categories/repository.py`
Verify existing implementation:
- `get_all(is_active)` → `list[Category]`, ordered by `id`
- `get_by_id(category_id)` → `Category | None`
- `get_by_name(name)` → `Category | None`
- `create(category)` → flush + refresh
- `update(category)` → flush + refresh
- `delete(category)` → sets `is_active = False`

#### 2.3 — `categories/service.py`
- `get_all(is_active)` → delegates to repo
- `get_by_id(category_id)` → raises `CategoryNotFound` if `None`
- `create(data)` → check name uniqueness, raise `CategoryNameAlreadyExists` if taken, create + commit
- `update(category_id, data)` → fetch or 404, check name if changed, apply + commit
- `delete(category_id)` → fetch or 404, soft-delete + commit

#### 2.4 — `categories/router.py`

| Method | Path | Status Codes |
|---|---|---|
| `GET` | `/categories` | 200 |
| `GET` | `/categories/{category_id}` | 200, 404 |
| `POST` | `/categories` | 201, 409, 422 |
| `PATCH` | `/categories/{category_id}` | 200, 404, 409, 422 |
| `DELETE` | `/categories/{category_id}` | 204, 404 |

#### 2.5 — Wire into `api/v1/router.py`

#### 2.6 — Update `docs/api.md`

### Verification
Integration tests (`tests/integration/test_categories.py`):
- [ ] Create category → 201, verify response body
- [ ] Create duplicate name → 409
- [ ] List categories → 200, verify count
- [ ] Get by ID → 200, verify fields
- [ ] Get nonexistent → 404
- [ ] Update name → 200, verify new name
- [ ] Update with duplicate name → 409
- [ ] Delete → 204
- [ ] Get deleted → 404
- [ ] Empty update body → 422
- [ ] `docs/api.md` updated

---

## Milestone 3 — Products Module & ImageKit Object Storage

### Tasks

#### 3.1 — `products/repository.py`

**ProductRepository:**
- `get_by_id(product_id, load_relations=False)` → optional `selectinload(variants, images)`, `joinedload(category)`
- `get_list(page, limit, q, category_id, sort_by, order, is_active)` → `tuple[list[Product], int]`
- `create(product)`, `update(product)`, `soft_delete(product)`

**ProductVariantRepository:**
- `get_by_id(variant_id, product_id)` → scoped to parent product
- `get_by_sku(sku)` → uniqueness check
- `get_list(product_id, page, limit)` → paginated
- `create(variant)`, `update(variant)`, `soft_delete(variant)`

**ProductImageRepository:**
- `get_by_id(image_id, product_id)` → scoped to parent
- `get_by_file_id(imagekit_file_id)` → uniqueness check
- `get_list(product_id)` → ordered by `position`
- `create(image)`, `update(image)`, `delete(image)` → hard delete

#### 3.2 — `products/service.py`
- `get_product(id)` → 404 if not found, loads relations
- `list_products(filters)` → delegates to repo with filtering/sorting
- `create_product(data)` → verify `category_id` exists and is active, create
- `update_product(id, data)` → 404, verify category if changed, apply
- `delete_product(id)` → 404, soft-delete
- Variant CRUD: check SKU uniqueness → 409
- Image CRUD: check `imagekit_file_id` uniqueness

#### 3.3 — `products/router.py`
Replace all mock endpoints with real service calls. Keep existing endpoint signatures and schemas unchanged.

#### 3.4 — ImageKit Object Storage Integration

**`core/storage.py` — Storage adapter:**
- `ImageKitStorage` class wrapping the `imagekitio` SDK
- `upload(file_bytes, file_name, folder) -> tuple[str, str]` — returns `(image_url, imagekit_file_id)`
- `delete(file_id: str) -> None`

**`core/config.py` — Add settings:**
- `imagekit_public_key`, `imagekit_private_key`, `imagekit_url_endpoint`

**`products/dependencies.py` — Add `get_storage()` dependency**

**Partial failure handling in `ProductService`:**
- On `delete_image`: delete DB row first, then call `storage.delete(file_id)`; if ImageKit fails, log the error for later cleanup rather than rolling back the DB delete
- On image upload via product image router (`POST /products/{product_id}/images`): upload to ImageKit first, then save DB; if DB fails, rollback DB and call `storage.delete()` to clean up the orphaned file

**Tests: Mock storage adapter in `conftest.py`** to keep tests offline.

#### 3.5 — Tests: `tests/integration/test_products.py`

### Verification
- [ ] Product CRUD: create, list with pagination, filter by category, search by `q`, get detail with variants/images, update, soft-delete
- [ ] Variant CRUD: create under product, SKU conflict → 409, list, update, soft-delete
- [ ] Image CRUD: add, list ordered by position, update metadata, hard delete
- [ ] Create product with nonexistent category → 404
- [ ] Storage adapter delete called on image deletion
- [ ] 15+ integration tests passing

---

## Milestone 4 — Users & Authentication

### Tasks

#### 4.1 — `core/security.py`
- `hash_password(plain) -> str` — `pwdlib` with Argon2
- `verify_password(plain, hashed) -> bool`
- `create_access_token(data, expires_minutes) -> str` — PyJWT, HS256
- `create_refresh_token(data, expires_days) -> str`
- `decode_token(token) -> dict` — raises on expiry/invalid

Add to `config.py`: `secret_key`, `access_token_expire_minutes = 30`, `refresh_token_expire_days = 7`

#### 4.2 — `users/schemas.py`
- `UserCreate` — email, password, first_name, last_name
- `UserUpdate` — partial (first_name, last_name, email)
- `UserResponse` — id, email, first_name, last_name, is_active, created_at, updated_at (no password_hash)

#### 4.3 — `users/exceptions.py`
- `UserNotFound` (404)
- `EmailAlreadyExists` (409)

#### 4.4 — `users/repository.py`
- `get_by_id(user_id)`, `get_by_email(email)`, `create(user)`, `update(user)`, `soft_delete(user)`

#### 4.5 — `users/service.py`
- `get_user(user_id)` → 404
- `create_user(data)` → check email uniqueness, hash password, create
- `update_user(user_id, data)` → 404, check email if changed
- `deactivate_user(user_id)` → soft-delete

#### 4.6 — `auth/schemas.py`
- `LoginRequest` — email, password
- `RegisterRequest` — email, password, first_name, last_name
- `TokenResponse` — access_token, refresh_token, token_type
- `RefreshRequest` — refresh_token

#### 4.7 — `auth/exceptions.py`
- `InvalidCredentials` (401)
- `InvalidToken` (401)

#### 4.8 — `auth/dependencies.py`
- `get_current_user(token, db) -> User` — extracts user_id from JWT, fetches user, raises 401 if invalid/inactive
- `get_optional_user(...) -> User | None` — returns `None` if no token (for guest endpoints)

#### 4.9 — `auth/service.py`
- `register(data)` → delegates to `UserService.create_user()`
- `login(email, password)` → fetch user, verify password, generate tokens
- `refresh(refresh_token)` → decode, generate new access token

#### 4.10 — `auth/router.py`

| Method | Path | Status Codes |
|---|---|---|
| `POST` | `/auth/register` | 201, 409, 422 |
| `POST` | `/auth/login` | 200, 401 |
| `POST` | `/auth/refresh` | 200, 401 |

#### 4.11 — `users/router.py`

| Method | Path | Auth | Status Codes |
|---|---|---|---|
| `GET` | `/users/me` | Required | 200, 401 |
| `PATCH` | `/users/me` | Required | 200, 401, 409, 422 |
| `DELETE` | `/users/me` | Required | 204, 401 |

#### 4.12 — Wire into `api/v1/router.py`

#### 4.13 — Update `docs/api.md`

### Verification
- [ ] Register → 201, duplicate email → 409
- [ ] Login → 200 (verify tokens), wrong password → 401, nonexistent email → 401
- [ ] Refresh → 200, expired/invalid → 401
- [ ] `GET /users/me` with valid token → 200, without → 401
- [ ] Update profile, deactivate account
- [ ] `docs/api.md` updated

---

## Milestone 5 — Middleware, Security & Redis Caching

### Tasks

#### 5.1 — CORS Middleware
- Add `allowed_origins: list[str]` to `Settings`
- Configure `CORSMiddleware` in `main.py` with `allow_credentials=True`

#### 5.2 — Security Headers Middleware
Custom middleware adding to every response:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=()`

#### 5.3 — Request Logging & Performance Middleware (`core/logging.py`)
- Log each request: method, path, status code, duration in ms
- Inject `X-Request-ID` (UUID4) into request state and response headers

#### 5.4 — Rate Limiting with Redis
- Use `slowapi` with Redis backend (`REDIS_URL` in `Settings`)
- Auth endpoints: 5 requests/min per IP
- General API: 120 requests/min per IP

#### 5.5 — Redis Response Caching
- Add `core/cache.py` with `aioredis` client initialized from `REDIS_URL`
- Cache read-heavy endpoints:
  - `GET /categories` — TTL 5 min, invalidated on category create/update/delete
  - `GET /products` (list) — TTL 2 min, invalidated on product mutations
  - `GET /products/{id}` — TTL 2 min, invalidated on product/variant/image mutations
- Implement as a service-layer decorator or explicit cache-aside in the service methods
- Cache key strategy: `dzshopi:{resource}:{params_hash}`

#### 5.6 — Middleware order in `main.py`
1. CORS
2. Request ID + Logging
3. Security Headers
4. Rate Limiting

### Verification
- [ ] CORS headers present on responses
- [ ] Security headers present on every response
- [ ] `X-Request-ID` returned
- [ ] Rate limiting triggers 429 after threshold
- [ ] Cached GET endpoints return faster on second request
- [ ] Cache invalidated correctly after mutations (create/update/delete → next GET fetches fresh data)

---

## Milestone 6 — Carts Module

### Tasks

#### 6.1 — API Contract

Carts are tied to authenticated users (1:1). Guest carts are managed client-side (localStorage) and merged on login.

| Method | Path | Auth | Description |
|---|---|---|---|
| `GET` | `/cart` | Required | Get user's cart with items |
| `POST` | `/cart/items` | Required | Add item (variant_id, quantity) |
| `PATCH` | `/cart/items/{item_id}` | Required | Update quantity |
| `DELETE` | `/cart/items/{item_id}` | Required | Remove item |
| `DELETE` | `/cart` | Required | Clear entire cart |
| `POST` | `/cart/merge` | Required | Merge guest items into server cart |

#### 6.2 — Full layer implementation: Schemas, Exceptions, Repository, Service, Router
Key business rules:
- Auto-create cart on first `POST /cart/items` if none exists
- Validate `product_variant_id` exists and is active
- Validate quantity against `stock_quantity`
- `POST /cart/merge` accepts `list[{variant_id, quantity}]`, upserts into server cart

#### 6.3 — Update `docs/api.md`

### Verification
- [ ] Add item to cart → 201, verify response
- [ ] Add item with inactive variant → error
- [ ] Add item exceeding stock → error
- [ ] Update quantity → 200
- [ ] Remove item → 204
- [ ] Clear cart → 204
- [ ] Merge guest items → 200, duplicates upserted correctly
- [ ] Auto-create cart on first add

---

## Milestone 7 — Orders & Checkout

### Tasks

#### 7.1 — API Contract

| Method | Path | Auth | Description |
|---|---|---|---|
| `POST` | `/orders` | Optional | Place order (guest or authenticated) |
| `GET` | `/orders` | Required | List user's orders (paginated) |
| `GET` | `/orders/{order_id}` | Required or token | Get order detail |

#### 7.2 — Schemas
- `OrderCreate` — first_name, last_name, phone, wilaya, delivery_desk, notes, items (for guest) or use-cart flag
- `OrderResponse` — full order with items
- `OrderItemResponse` — snapshot: product_name, variant_attributes, quantity, unit_price, line_total

#### 7.3 — Atomic Checkout Logic (`orders/service.py`)
1. Validate delivery info (wilaya, phone format)
2. Resolve items (from cart if authenticated, from request body if guest)
3. For each item: `SELECT variant FOR UPDATE` (row lock), verify active and stock ≥ requested, decrement stock
4. Snapshot product_name, variant_attributes, unit_price into order_items
5. Calculate subtotal, delivery_fee, total
6. Create order + order_items in one transaction
7. If authenticated, clear user's cart
8. Commit and return order

#### 7.4 — Guest order access
Generate secure token (UUID) stored with order. Guest accesses via `GET /orders/{id}?token=<token>`.

#### 7.5 — Update `docs/api.md`

### Verification
- [ ] Place order as guest → 201, verify stock decremented, verify snapshots
- [ ] Place order as authenticated → 201, verify cart cleared
- [ ] Insufficient stock → error
- [ ] Inactive variant → error
- [ ] List orders for authenticated user → paginated
- [ ] Get order by ID with token (guest) → 200
- [ ] Get order by ID without auth → 401/403
- [ ] Order snapshots are immutable — changing product later doesn't affect existing orders

---

## Milestone 8 — Reviews & Wishlists

### Tasks

#### 8.1 — Reviews

| Method | Path | Auth | Description |
|---|---|---|---|
| `GET` | `/products/{product_id}/reviews` | No | List reviews (paginated) |
| `POST` | `/products/{product_id}/reviews` | Required | Write review |
| `PATCH` | `/products/{product_id}/reviews/{review_id}` | Required | Edit own review |
| `DELETE` | `/products/{product_id}/reviews/{review_id}` | Required | Delete own review |

Business rules:
- One review per user per product (DB unique constraint)
- Rating 1–5 (DB check constraint)
- Only review author can edit/delete

#### 8.2 — Wishlists

| Method | Path | Auth | Description |
|---|---|---|---|
| `GET` | `/wishlist` | Required | Get user's wishlist |
| `POST` | `/wishlist/items` | Required | Add product to wishlist |
| `DELETE` | `/wishlist/items/{item_id}` | Required | Remove from wishlist |

Business rules:
- One wishlist per user (auto-created on first add)
- One entry per product (DB unique constraint)

#### 8.3 — Full layer implementation for both: Schemas, Exceptions, Repository, Service, Router

#### 8.4 — Update `docs/api.md`

### Verification
- [ ] Create review → 201, duplicate review for same product → 409
- [ ] Rating outside 1–5 → 422
- [ ] Edit/delete by non-author → 403
- [ ] List reviews paginated
- [ ] Add to wishlist → 201, duplicate → 409
- [ ] Remove from wishlist → 204
- [ ] Wishlist auto-created on first add

---

## Milestone 9 — Background Jobs

Technology: **ARQ** (async Redis-based task queue, built on `aioredis`)

### Tasks

#### 9.1 — ARQ worker setup
- Add `arq` to dependencies
- Create `app/worker.py` with ARQ `WorkerSettings` class
- Worker connects to Redis (`REDIS_URL`)
- Add `arq-worker` service to `docker-compose.yml`

#### 9.2 — Order confirmation email job
- `send_order_confirmation(order_id)` — fetches order, renders email, sends via SMTP or transactional email service (e.g. Resend, Mailgun)
- Enqueued by `OrderService.create_order()` after commit
- Add `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`, `FROM_EMAIL` to `Settings`

#### 9.3 — ImageKit orphan cleanup job
- Scheduled/cron job: query `product_images` for deleted rows, call `storage.delete(file_id)` for any orphaned ImageKit files logged during failed deletions (from M3 error handling)
- Runs daily via ARQ cron

#### 9.4 — Stock low-warning job
- Scheduled job: query variants where `stock_quantity` < configurable threshold
- Sends notification email to admin with the list of low-stock items
- Runs daily via ARQ cron

### Verification
- [ ] ARQ worker starts and connects to Redis
- [ ] Order confirmation job enqueued after order placement
- [ ] Email delivered (test with Mailpit or mock SMTP in tests)
- [ ] Orphan cleanup job runs and deletes stale ImageKit files
- [ ] Low-stock job sends notification when threshold breached
- [ ] All jobs handle failures gracefully (retries, dead-letter logging)

---

## Milestone 10 — CI/CD

### Tasks

#### 10.1 — `.github/workflows/ci.yml`
Triggered on every push and PR to `main`:
- **lint:** `ruff check .` and `ruff format --check .`
- **test:** PostgreSQL + Redis services, `alembic upgrade head`, `pytest` with coverage, fail if coverage < 85%

#### 10.2 — `.github/workflows/deploy.yml`
Triggered on push to `main` (after CI passes):
- Build Docker image
- Push to GitHub Container Registry (ghcr.io)
- SSH into production server
- `docker compose pull && docker compose up -d`
- `docker compose exec api alembic upgrade head`

#### 10.3 — Migration safety
- Test `alembic upgrade head` and `alembic downgrade -1` in CI

#### 10.4 — Health probes
Verify `/health/live` and `/health/ready` work inside Docker with healthcheck directives.

#### 10.5 — Connection pool tuning
Configure in `database.py`: `pool_size=10`, `max_overflow=5`, `pool_timeout=30`, `pool_pre_ping=True`

#### 10.6 — `.env.production.example`
Document all required env vars: `DATABASE_URL`, `REDIS_URL`, `SECRET_KEY`, `ALLOWED_ORIGINS`, `IMAGEKIT_*`, `SMTP_*`, `DEBUG=false`

### Verification
- [ ] CI pipeline runs on every PR, blocks merge on failure
- [ ] Deploy pipeline can push to production server
- [ ] All tests pass with ≥85% coverage

---

## Milestone 11 — Deploy to Production

### Tasks

#### 11.1 — Oracle Cloud Infrastructure (Always Free Tier)
- Launch `VM.Standard.A1.Flex` instance (ARM, 4 OCPUs, 24 GB RAM)
- Ubuntu 22.04/24.04 (aarch64), 50 GB block volume
- Security List: open ports 80 and 443 only

#### 11.2 — Server setup
- Install Docker and Docker Compose plugin
- Clone repository, create `.env.production`

#### 11.3 — `docker-compose.prod.yml`

| Service | Details |
|---|---|
| `nginx` | nginx:alpine, ports 80/443, SSL termination |
| `api` | Build from production stage |
| `postgres` | postgres:16-alpine with persistent volume and healthcheck |
| `redis` | redis:7-alpine with persistent volume |
| `arq-worker` | ARQ worker for background jobs |

#### 11.4 — Nginx configuration
- Reverse proxy `/api` to `http://api:8000`
- SSL with Let's Encrypt (Certbot)
- HTTP → HTTPS redirect

#### 11.5 — SSL Certificate
Certbot standalone with auto-renewal via cron.

#### 11.6 — Frontend on Vercel
- Connect GitHub repo, root directory `frontend`
- Build command: `npm run build`, output: `dist`
- Environment: `VITE_API_BASE_URL=https://api.yourdomain.com/api/v1`

#### 11.7 — DNS Setup
- `yourdomain.com` → Vercel
- `api.yourdomain.com` → OCI instance IP (A record)

### Verification
- [ ] `https://api.yourdomain.com/health/live` returns 200 with valid SSL
- [ ] `https://dzshopi.vercel.app` loads the frontend
- [ ] Frontend successfully calls backend API (CORS works, data flows)
- [ ] GitHub Actions deploy pipeline pushes updates automatically
- [ ] ARQ worker running and processing jobs in production

---

## Summary

| # | Milestone | Tests |
|---|---|---|
| 1 | Docker & Test Harness | Harness works |
| 2 | Categories | ~10 integration |
| 3 | Products & ImageKit | ~15 integration |
| 4 | Users & Auth | ~15 integration |
| 5 | Middleware, Security & Redis Caching | ~8 integration |
| 6 | Carts | ~10 integration |
| 7 | Orders & Checkout | ~15 integration |
| 8 | Reviews & Wishlists | ~10 integration |
| 9 | Background Jobs (ARQ) | ~6 integration |
| 10 | CI/CD | Coverage gate |
| 11 | Deploy | Smoke test |
