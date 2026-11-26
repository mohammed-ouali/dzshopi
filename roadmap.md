# DzShopi — Checkpoint-to-Production Roadmap

> **Date:** November 20, 2026  
> **Audience:** You (Backend + Docs + DevOps) and your Frontend Developer  
> **Scope:** Everything from the current checkpoint to a live, deployed product

---

## Current Checkpoint — What Exists Today

### Backend (You)

| Layer | Status |
|---|---|
| **Project skeleton** | FastAPI app, `app/core/`, `app/modules/`, `app/shared/`, `app/api/v1/` — all wired |
| **Database schema** | Full initial Alembic migration covering all 11 tables (users, categories, products, product_variants, product_images, carts, cart_items, wishlists, wishlist_items, orders, order_items, reviews) |
| **SQLAlchemy models** | Complete for every module — all relationships, indexes, check constraints, foreign keys defined |
| **Products module** | Schemas ✅, Exceptions ✅, Router with mock endpoints ✅, Repository ❌ (empty), Service ❌ (empty) |
| **Categories module** | Model ✅, Schemas ✅, Repository ✅ (implemented), Exceptions ❌ (empty), Service ❌ (empty), Router ❌ (empty) |
| **Users module** | Model ✅, everything else ❌ (empty) |
| **Auth module** | All files empty — no schemas, no JWT, no password hashing |
| **Carts module** | Models ✅, everything else ❌ (empty) |
| **Orders module** | Models ✅, everything else ❌ (empty) |
| **Reviews module** | Models ✅, everything else ❌ (empty) |
| **Wishlists module** | Models ✅, everything else ❌ (empty) |
| **Core infrastructure** | `config.py` ✅, `database.py` ✅, `exceptions.py` ✅, `exception_handlers.py` ✅ (RFC 7807 ProblemDetails), `security.py` ❌ (empty), `logging.py` ❌ (empty) |
| **Tests** | Zero tests — empty conftest files, empty test directories |
| **Docker** | Dockerfile exists but is empty. No docker-compose |
| **CI/CD** | `.github/` directory exists but is empty |
| **Docs** | `api.md` (products only), `architecture.md`, `database.md`, `decisions.md` — all solid |

### Frontend (Your Partner)

| Layer | Status |
|---|---|
| **Stack** | React 19 + Vite 8 + Tailwind CSS 4 + React Router 7 |
| **Pages** | Skeleton stubs only: `Home.jsx`, `Product.jsx`, `Cart.jsx`, `Login.jsx` — all return a single `<div>` |
| **Components** | `NavBar.jsx`, `Footer.jsx`, `WilcomBaner.jsx` — layout shells |
| **API Integration** | None yet — no HTTP client, no API service layer, no env config for API base URL |
| **Routing** | `App.jsx` renders NavBar + Footer, no `<Routes>` configured yet |

---

## The Plan — 10 Milestones

```mermaid
flowchart LR
    M1["M1\nDocker\n& Test\nHarness"]
    M2["M2\nCategories\nFull Stack"]
    M3["M3\nProducts\nFull Stack"]
    M4["M4\nUsers\n& Auth"]
    M5["M5\nMiddleware\n& Security"]
    M6["M6\nCarts"]
    M7["M7\nOrders\n& Checkout"]
    M8["M8\nReviews\n& Wishlists"]
    M9["M9\nHardening\n& CI/CD"]
    M10["M10\nDeploy\nto Production"]

    M1 --> M2 --> M3 --> M4 --> M5
    M5 --> M6 --> M7 --> M8 --> M9 --> M10
```

> [!IMPORTANT]
> Every milestone ends with passing tests. No milestone is "done" until its integration tests run green inside the Docker test environment.

---

## Milestone 1 — Docker Environment & Test Harness

**Owner:** You  
**Duration:** 1 day  
**Prerequisite for:** Everything else

### What you build

#### 1.1 — `docker-compose.yml` (project root)
Three services for local development:

| Service | Image | Purpose |
|---|---|---|
| `postgres` | `postgres:16-alpine` | Dev database on port 5432 |
| `redis` | `redis:7-alpine` | Cache (initially unused, ready for rate limiting later) |
| `api` | Build from `backend/Dockerfile` | FastAPI app with live reload |

Environment variables passed to `api`:
- `DATABASE_URL=postgresql+asyncpg://postgres:postgres@postgres:5432/dzshopi`
- `APP_NAME=DzShopi`
- `DEBUG=true`
- `VERSION=0.1.0`

#### 1.2 — `backend/Dockerfile` (multi-stage)
```
Stage: base       → Python 3.12 slim, install uv, copy pyproject.toml, sync deps
Stage: dev        → FROM base, copy source, CMD uvicorn with --reload
Stage: test       → FROM base, install dev deps, copy source + tests
Stage: production → FROM base, copy source only, non-root user, CMD uvicorn workers
```

#### 1.3 — `docker-compose.test.yml`
Spins up an isolated `postgres_test` database and runs `pytest` inside a container. The test database is destroyed after the run.

#### 1.4 — `backend/tests/conftest.py`
Shared async test fixtures:
- `engine` → creates async engine pointing to the test database
- `create_tables` → runs `Base.metadata.create_all` before the session, drops after
- `db_session` → yields an `AsyncSession` wrapped in a transaction that rolls back after each test (test isolation)
- `client` → `httpx.AsyncClient` using `ASGITransport` against the FastAPI app, with the `get_db` dependency overridden to use the test session

#### 1.5 — Linting baseline
- Add `[tool.ruff]` section to `pyproject.toml` with `line-length = 100`, `target-version = "py312"`
- Run `ruff check .` and `ruff format .` to establish a clean baseline

### Definition of Done
- [ ] `docker compose up` starts postgres, redis, and the API; `/health/live` returns `200`
- [ ] `docker compose -f docker-compose.test.yml run --rm test` executes pytest (0 tests collected, exit 0)
- [ ] `ruff check .` exits clean

---

## Milestone 2 — Categories Module (Full Stack)

**Owner:** You  
**Duration:** 1–2 days  
**Frontend dependency:** None — frontend doesn't consume categories yet

### What you build

#### 2.1 — `categories/exceptions.py`
```python
class CategoryNotFound(DomainException):       # 404
class CategoryNameAlreadyExists(DomainException): # 409
```

#### 2.2 — `categories/repository.py`
Already implemented. Verify it matches the test expectations:
- `get_all(is_active)` → `list[Category]`, ordered by `id`
- `get_by_id(category_id)` → `Category | None`
- `get_by_name(name)` → `Category | None` (for uniqueness checks)
- `create(category)` → flush + refresh
- `update(category)` → flush + refresh
- `delete(category)` → sets `is_active = False`

#### 2.3 — `categories/service.py`
Business logic layer. Receives `AsyncSession`, creates `CategoryRepository` internally:
- `get_all(is_active)` → delegates to repo
- `get_by_id(category_id)` → raises `CategoryNotFound` if `None`
- `create(data: CategoryCreate)` → check name uniqueness via `get_by_name()`, raise `CategoryNameAlreadyExists` if taken, build `Category` model, call `repo.create()`, commit
- `update(category_id, data: CategoryUpdate)` → fetch or 404, check name uniqueness if name changed, apply updates, commit
- `delete(category_id)` → fetch or 404, soft-delete, commit

#### 2.4 — `categories/router.py`
Five endpoints under `prefix="/categories"`, `tags=["Categories"]`:

| Method | Path | Service call | Status |
|---|---|---|---|
| `GET` | `/categories` | `service.get_all(is_active)` | 200 |
| `GET` | `/categories/{category_id}` | `service.get_by_id(id)` | 200, 404 |
| `POST` | `/categories` | `service.create(payload)` | 201, 409, 422 |
| `PATCH` | `/categories/{category_id}` | `service.update(id, payload)` | 200, 404, 409, 422 |
| `DELETE` | `/categories/{category_id}` | `service.delete(id)` | 204, 404 |

The `db: AsyncSession = Depends(get_db)` dependency is injected into every endpoint and passed to `CategoryService(db)`.

#### 2.5 — Wire into `api/v1/router.py`
Add `from app.modules.categories.router import router as categories_router` and include it.

#### 2.6 — Update `docs/api.md`
Add the Categories section with the five endpoints, their schemas, and status codes.

#### 2.7 — Tests: `tests/integration/test_categories.py`
Test every endpoint end-to-end against the real test database:
- Create a category → 201, verify response body
- Create duplicate name → 409
- List categories → 200, verify count
- Get by ID → 200, verify fields
- Get nonexistent → 404
- Update name → 200, verify new name
- Update with duplicate name → 409
- Delete → 204
- Get deleted → 404 (since `is_active` filter applies)
- Empty update body → 422

### Definition of Done
- [ ] All integration tests pass inside Docker
- [ ] Manual test: `POST /api/v1/categories` creates a row in the database, `GET` returns it
- [ ] `docs/api.md` updated

---

## Milestone 3 — Products Module (Full Stack)

**Owner:** You  
**Duration:** 3–4 days  
**Frontend dependency:** Frontend developer can begin connecting product listing and detail pages after this

### What you build

#### 3.1 — `products/repository.py`

Three logical sections in one class (or split into classes — your call):

**ProductRepository:**
- `get_by_id(product_id, load_relations=False)` → optional `selectinload(Product.variants)`, `selectinload(Product.images)`, plus `joinedload(Product.category)`
- `get_list(page, limit, q, category_id, sort_by, order, is_active)` → returns `tuple[list[Product], int]` with count
- `create(product)`, `update(product)`, `soft_delete(product)`

**ProductVariantRepository:**
- `get_by_id(variant_id, product_id)` → scoped to parent product
- `get_by_sku(sku)` → for uniqueness check
- `get_list(product_id, page, limit)` → paginated
- `create(variant)`, `update(variant)`, `soft_delete(variant)`

**ProductImageRepository:**
- `get_by_id(image_id, product_id)` → scoped to parent
- `get_by_file_id(imagekit_file_id)` → for uniqueness check
- `get_list(product_id)` → ordered by `position`
- `create(image)`, `update(image)`, `delete(image)` → hard delete for images

#### 3.2 — `products/service.py`
- `get_product(id)` → 404 if not found, loads relations
- `list_products(filters)` → delegates to repo with filtering/sorting
- `create_product(data)` → verify `category_id` exists and is active (call `CategoryRepository.get_by_id`), create
- `update_product(id, data)` → 404, verify category if changed, apply
- `delete_product(id)` → 404, soft-delete
- Same pattern for variant and image CRUD
- Variant: check SKU uniqueness → 409
- Image: check `imagekit_file_id` uniqueness

#### 3.3 — `products/router.py`
Replace mock data with real service calls. Existing endpoint signatures and schemas stay identical — the frontend contract doesn't break.

The `db: AsyncSession = Depends(get_db)` injection replaces mock returns.

#### 3.4 — Tests: `tests/integration/test_products.py`
- CRUD for products (create, list with pagination, filter by category, search by `q`, get detail with variants/images, update, soft-delete)
- CRUD for variants (create under product, SKU conflict, list, update, soft-delete)
- CRUD for images (add, list ordered by position, update metadata, hard delete)
- Edge cases: create product with nonexistent category → appropriate error

### What the frontend developer does (in parallel after M3 is deployed to dev)

> [!NOTE]
> The frontend developer can start this work using the mock endpoints that already exist. Once M3 lands, they just point to the same URLs and get real data instead.

- **Set up API client:** Create `frontend/src/api/client.js` with axios or fetch wrapper, `VITE_API_BASE_URL` env variable
- **Product listing page (`Home.jsx`):** Fetch `GET /api/v1/products`, render cards with name, first image, price range from variants
- **Product detail page (`Product.jsx`):** Fetch `GET /api/v1/products/{id}`, display images, variant selector, description
- **Routing:** Configure React Router with `/`, `/products/:id`, `/cart`, `/login`

### Definition of Done
- [ ] All mock responses in `products/router.py` replaced with real DB calls
- [ ] 15+ integration tests passing
- [ ] Frontend developer has a working API base URL to call

---

## Milestone 4 — Users & Authentication

**Owner:** You  
**Duration:** 2–3 days  
**Frontend dependency:** Frontend developer builds Login/Register pages after this

### What you build

#### 4.1 — `core/security.py`
- `hash_password(plain: str) -> str` — using `pwdlib` with Argon2
- `verify_password(plain: str, hashed: str) -> bool`
- `create_access_token(data: dict, expires_minutes: int) -> str` — PyJWT, HS256
- `create_refresh_token(data: dict, expires_days: int) -> str`
- `decode_token(token: str) -> dict` — raises on expiry/invalid

Add to `config.py`:
- `secret_key: str`
- `access_token_expire_minutes: int = 30`
- `refresh_token_expire_days: int = 7`

Add to `.env` and `.env.example`:
- `SECRET_KEY=<generate-a-random-key>`
- `ACCESS_TOKEN_EXPIRE_MINUTES=30`
- `REFRESH_TOKEN_EXPIRE_DAYS=7`

#### 4.2 — `users/schemas.py`
- `UserCreate` — email, password, first_name, last_name (email validator from pydantic[email])
- `UserUpdate` — partial update (first_name, last_name, email)
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
Two FastAPI dependencies:
- `get_current_user(token: str = Depends(oauth2_scheme), db = Depends(get_db)) -> User` — extracts user_id from JWT, fetches user, raises 401 if invalid/inactive
- `get_optional_user(...) -> User | None` — same but returns `None` if no token provided (for guest-compatible endpoints)

#### 4.9 — `auth/service.py`
- `register(data)` → delegates to `UserService.create_user()`
- `login(email, password)` → fetch user by email, verify password, generate tokens
- `refresh(refresh_token)` → decode, generate new access token

#### 4.10 — `auth/router.py`
Prefix: `/auth`, Tags: `["Auth"]`

| Method | Path | Description | Status |
|---|---|---|---|
| `POST` | `/auth/register` | Create account | 201, 409, 422 |
| `POST` | `/auth/login` | Get tokens | 200, 401 |
| `POST` | `/auth/refresh` | Refresh access token | 200, 401 |

#### 4.11 — `users/router.py`
Prefix: `/users`, Tags: `["Users"]`

| Method | Path | Auth | Description | Status |
|---|---|---|---|---|
| `GET` | `/users/me` | Required | Get current user profile | 200, 401 |
| `PATCH` | `/users/me` | Required | Update profile | 200, 401, 409, 422 |
| `DELETE` | `/users/me` | Required | Deactivate account | 204, 401 |

#### 4.12 — Wire into `api/v1/router.py`

#### 4.13 — Update `docs/api.md` with Auth and Users sections

#### 4.14 — Tests
- Register → 201, duplicate email → 409
- Login → 200 (verify tokens), wrong password → 401, nonexistent email → 401
- Refresh → 200, expired/invalid → 401
- `GET /users/me` with valid token → 200, without → 401
- Update profile, deactivate account

### What the frontend developer does (in parallel / after)
- **Login page (`Login.jsx`):** Form with email + password, POST to `/auth/login`, store tokens (localStorage or httpOnly cookie discussion)
- **Register page:** Form, POST to `/auth/register`
- **Auth context/store:** React context or Zustand store to hold user state and tokens
- **Axios interceptor:** Attach `Authorization: Bearer <token>` to requests, auto-refresh on 401

### Definition of Done
- [ ] Register, login, refresh, profile endpoints all tested
- [ ] Auth dependency (`get_current_user`) works and is reusable by later modules
- [ ] `docs/api.md` updated

---

## Milestone 5 — Middlewares & Security Hardening

**Owner:** You  
**Duration:** 1–2 days  
**Frontend dependency:** Frontend developer needs to know the allowed CORS origins

### What you build

#### 5.1 — CORS Middleware (in `main.py`)
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins,  # ["http://localhost:5173", "https://dzshopi.vercel.app"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```
Add `allowed_origins: list[str]` to `Settings` and `.env`.

#### 5.2 — Security Headers Middleware
Custom middleware that adds to every response:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=()`

#### 5.3 — Request Logging & Performance Middleware (`core/logging.py`)
- Log each request: method, path, status code, duration in ms
- Use Python `logging` module with structured format
- Inject `X-Request-ID` (UUID4) into request state and response headers

#### 5.4 — Rate Limiting
Decide implementation:
- **Option A (Simple):** `slowapi` library with in-memory or Redis backend
- **Option B (Manual):** Custom middleware with Redis token bucket

Apply stricter limits to auth endpoints (5/min per IP), relaxed for general API (120/min per IP).

Add `REDIS_URL` to `Settings` and `.env`.

#### 5.5 — Middleware order in `main.py`
Register in this order (outermost first):
1. CORS
2. Request ID + Logging
3. Security Headers
4. Rate Limiting

#### 5.6 — Tests
- Verify CORS headers present on responses
- Verify security headers present
- Verify `X-Request-ID` returned
- Verify rate limiting triggers 429 after threshold

### What the frontend developer needs to know
- The exact list of `allowed_origins` — give them the dev URL (`http://localhost:5173`) and the eventual production URL
- If using `credentials: "include"` in fetch calls, CORS must have `allow_credentials=True`

### Definition of Done
- [ ] Every response includes security headers and request ID
- [ ] Rate limiting works (testable by rapid-fire requests)
- [ ] CORS allows the frontend dev origin

---

## Milestone 6 — Carts Module

**Owner:** You  
**Duration:** 2 days  
**Frontend dependency:** Frontend developer builds cart UI after this

### What you build

#### 6.1 — API Contract (define in `docs/api.md` first)

Carts are tied to authenticated users (1:1 relationship). Guest carts are managed client-side (localStorage) and merged on login.

| Method | Path | Auth | Description |
|---|---|---|---|
| `GET` | `/cart` | Required | Get the user's cart with items |
| `POST` | `/cart/items` | Required | Add item (variant_id, quantity) |
| `PATCH` | `/cart/items/{item_id}` | Required | Update quantity |
| `DELETE` | `/cart/items/{item_id}` | Required | Remove item |
| `DELETE` | `/cart` | Required | Clear entire cart |
| `POST` | `/cart/merge` | Required | Merge guest items into server cart |

#### 6.2 — Schemas, Exceptions, Repository, Service, Router
Follow the same layer pattern. Key business rules:
- Auto-create cart on first `POST /cart/items` if the user doesn't have one
- Validate `product_variant_id` exists and is active
- Validate quantity against `stock_quantity`
- `POST /cart/merge` accepts `list[{variant_id, quantity}]` from the guest localStorage cart, upserts into the server cart

#### 6.3 — Tests

### What the frontend developer does
- **Cart page (`Cart.jsx`):** Display items with quantities, update/remove buttons, total calculation
- **Add-to-cart button:** On product detail page, POST to `/cart/items`
- **Guest cart logic:** Store items in localStorage, on login call `POST /cart/merge` then switch to server cart
- **Cart icon badge:** Show item count in NavBar

### Definition of Done
- [ ] Authenticated cart CRUD working end-to-end
- [ ] Merge endpoint handles guest → authenticated transition
- [ ] Tests pass

---

## Milestone 7 — Orders & Checkout

**Owner:** You  
**Duration:** 3–4 days  
**Frontend dependency:** Frontend developer builds checkout flow after this

### What you build

#### 7.1 — API Contract

| Method | Path | Auth | Description |
|---|---|---|---|
| `POST` | `/orders` | Optional | Place an order (guest or authenticated) |
| `GET` | `/orders` | Required | List user's orders (paginated) |
| `GET` | `/orders/{order_id}` | Required or token | Get order detail |

#### 7.2 — Schemas
- `OrderCreate` — first_name, last_name, phone, wilaya, delivery_desk, notes, items list (for guest) or flag to use cart
- `OrderResponse` — full order with items
- `OrderItemResponse` — snapshot: product_name, variant_attributes, quantity, unit_price, line_total

#### 7.3 — Service — Atomic Checkout Logic
This is the most critical service in the entire backend:

```
1. Validate delivery info (wilaya, phone format)
2. Resolve items (from cart if authenticated, from request body if guest)
3. For each item:
   a. SELECT variant FOR UPDATE (row lock)
   b. Verify variant is_active and stock_quantity >= requested
   c. Decrement stock_quantity
4. Snapshot product_name, variant_attributes, unit_price into order_items
5. Calculate subtotal, delivery_fee, total
6. Verify total = subtotal + delivery_fee (DB constraint will also enforce)
7. Create order + order_items in one transaction
8. If authenticated, clear the user's cart
9. Commit
10. Return order with tracking info
```

#### 7.4 — Guest order access
Generate a secure token (UUID or signed JWT) stored with the order. Guest can access via `GET /orders/{id}?token=<token>`.

#### 7.5 — Tests
- Place order as guest → 201, verify stock decremented, verify snapshots
- Place order as authenticated user → 201, verify cart cleared
- Place order with insufficient stock → error
- Place order with inactive variant → error
- List orders for authenticated user → paginated
- Get order by ID with token (guest) → 200
- Get order by ID without auth → 401/403

### What the frontend developer does
- **Checkout page:** Multi-step form: delivery info → order summary → confirm
- **Order confirmation page:** Show order ID, items, total
- **Order history page:** (authenticated users) List past orders
- **Guest order tracking:** Input order ID + token to view status

### Definition of Done
- [ ] Atomic stock decrement tested under concurrent scenarios
- [ ] Guest and authenticated checkout both working
- [ ] Order snapshots are immutable — changing a product later doesn't affect existing orders
- [ ] Tests pass

---

## Milestone 8 — Reviews & Wishlists

**Owner:** You  
**Duration:** 2 days  
**Frontend dependency:** Frontend developer adds review display and wishlist buttons

### What you build

#### 8.1 — Reviews

| Method | Path | Auth | Description |
|---|---|---|---|
| `GET` | `/products/{product_id}/reviews` | No | List reviews for a product (paginated) |
| `POST` | `/products/{product_id}/reviews` | Required | Write a review |
| `PATCH` | `/products/{product_id}/reviews/{review_id}` | Required | Edit own review |
| `DELETE` | `/products/{product_id}/reviews/{review_id}` | Required | Delete own review |

Business rules:
- One review per user per product (DB unique constraint)
- Rating 1–5 (DB check constraint)
- Only the review author can edit/delete

#### 8.2 — Wishlists

| Method | Path | Auth | Description |
|---|---|---|---|
| `GET` | `/wishlist` | Required | Get user's wishlist items |
| `POST` | `/wishlist/items` | Required | Add product to wishlist |
| `DELETE` | `/wishlist/items/{item_id}` | Required | Remove from wishlist |

Business rules:
- One wishlist per user (auto-created on first add)
- One entry per product (DB unique constraint)

#### 8.3 — Full layer implementation for both: Schemas, Exceptions, Repository, Service, Router, Tests

### What the frontend developer does
- **Reviews section:** On product detail page, show reviews list, star ratings, comment form (if logged in)
- **Wishlist icon:** Heart button on product cards, toggles add/remove
- **Wishlist page:** List of saved products

### Definition of Done
- [ ] Review uniqueness enforced, ownership checked on edit/delete
- [ ] Wishlist add/remove idempotent and tested
- [ ] Tests pass

---

## Milestone 9 — Production Hardening & CI/CD

**Owner:** You  
**Duration:** 2–3 days

### 9.1 — `.github/workflows/ci.yml`
Triggered on every push and PR to `main`:

```yaml
jobs:
  lint:
    - ruff check .
    - ruff format --check .

  test:
    services:
      postgres: postgres:16-alpine
    steps:
      - Install dependencies with uv
      - Run alembic upgrade head
      - Run pytest with coverage
      - Fail if coverage < 85%
```

### 9.2 — `.github/workflows/deploy.yml`
Triggered on push to `main` (after CI passes):

```yaml
jobs:
  deploy:
    steps:
      - Build Docker image
      - Push to GitHub Container Registry (ghcr.io)
      - SSH into OCI server
      - docker compose pull && docker compose up -d
      - docker compose exec api alembic upgrade head
```

### 9.3 — Migration safety
- Test `alembic upgrade head` and `alembic downgrade -1` in CI
- Ensure the migration is idempotent

### 9.4 — Health probes
Already have `/health/live` and `/health/ready`. Verify they work inside Docker with healthcheck directives.

### 9.5 — Connection pool tuning
In `database.py`, configure:
```python
engine = create_async_engine(
    url=settings.database_url,
    pool_size=10,
    max_overflow=5,
    pool_timeout=30,
    pool_pre_ping=True,
)
```

### 9.6 — Environment configuration
Create `.env.production.example` documenting all required env vars:
- `DATABASE_URL`, `REDIS_URL`, `SECRET_KEY`, `ALLOWED_ORIGINS`, `DEBUG=false`

### Definition of Done
- [ ] CI pipeline runs on every PR, blocks merge on failure
- [ ] Deploy pipeline can push to production server
- [ ] All tests pass with ≥85% coverage

---

## Milestone 10 — Deploy to Production

**Owner:** You  
**Duration:** 2–3 days (includes OCI setup)

### 10.1 — Oracle Cloud Infrastructure (Always Free Tier)

#### Server provisioning
1. Create an OCI account (free forever tier)
2. Launch a `VM.Standard.A1.Flex` instance (ARM, up to 4 OCPUs, 24 GB RAM — free)
3. OS: Ubuntu 22.04 or 24.04 (aarch64)
4. Attach 50 GB block volume (free)
5. Configure Security List: open ports 80 (HTTP) and 443 (HTTPS) only
6. SSH key pair for access

#### Server setup
```bash
# Install Docker
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER

# Install Docker Compose plugin
sudo apt install docker-compose-plugin

# Clone repository
git clone https://github.com/<your-repo>/dzshopi.git
cd dzshopi

# Create .env.production with real values
# Run the production stack
docker compose -f docker-compose.prod.yml up -d
```

### 10.2 — `docker-compose.prod.yml`

```yaml
services:
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
      - certbot-data:/etc/letsencrypt:ro
    depends_on:
      - api

  api:
    build:
      context: ./backend
      target: production
    environment:
      - DATABASE_URL=postgresql+asyncpg://postgres:${DB_PASSWORD}@postgres:5432/dzshopi
      - SECRET_KEY=${SECRET_KEY}
      - ALLOWED_ORIGINS=https://dzshopi.vercel.app
      - DEBUG=false
    depends_on:
      postgres:
        condition: service_healthy

  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: dzshopi
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 5s
      timeout: 3s
      retries: 5

  redis:
    image: redis:7-alpine
    volumes:
      - redisdata:/var/lib/redis/data

volumes:
  pgdata:
  redisdata:
  certbot-data:
```

### 10.3 — Nginx configuration
- Reverse proxy `/api` to `http://api:8000`
- SSL with Let's Encrypt (Certbot)
- HTTP → HTTPS redirect
- Security headers

### 10.4 — SSL Certificate
```bash
# Initial cert
docker run --rm -p 80:80 \
  -v certbot-data:/etc/letsencrypt \
  certbot/certbot certonly --standalone -d api.yourdomain.com

# Auto-renewal via cron
0 0 1 * * docker run --rm -v certbot-data:/etc/letsencrypt certbot/certbot renew
```

### 10.5 — Frontend on Vercel

#### Vercel setup
1. Connect GitHub repository to Vercel
2. Set root directory to `frontend`
3. Build command: `npm run build`
4. Output directory: `dist`
5. Environment variable: `VITE_API_BASE_URL=https://api.yourdomain.com/api/v1`

#### `frontend/vercel.json`
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### 10.6 — DNS Setup
- Point `yourdomain.com` to Vercel (CNAME or Vercel DNS)
- Point `api.yourdomain.com` to the OCI instance public IP (A record)

### Definition of Done
- [ ] `https://api.yourdomain.com/health/live` returns 200 with valid SSL
- [ ] `https://dzshopi.vercel.app` loads the frontend
- [ ] Frontend successfully calls backend API (CORS works, data flows)
- [ ] GitHub Actions deploy pipeline pushes updates automatically

---

## Coordination Timeline

Here's how you and the frontend developer work in parallel:

```mermaid
flowchart LR
    subgraph YOU["You (Backend + DevOps)"]
        direction TB
        Y1["M1: Docker & Tests\n(Day 1)"]
        Y2["M2: Categories\n(Day 2-3)"]
        Y3["M3: Products\n(Day 3-6)"]
        Y4["M4: Users & Auth\n(Day 7-9)"]
        Y5["M5: Middleware\n(Day 10-11)"]
        Y6["M6: Carts\n(Day 12-13)"]
        Y7["M7: Orders\n(Day 14-17)"]
        Y8["M8: Reviews & Wishlists\n(Day 18-19)"]
        Y9["M9: CI/CD\n(Day 20-22)"]
        Y10["M10: Deploy\n(Day 23-25)"]
        Y1 --> Y2 --> Y3 --> Y4 --> Y5 --> Y6 --> Y7 --> Y8 --> Y9 --> Y10
    end

    subgraph FE["Frontend Developer"]
        direction TB
        F1["Layout, Routing\nNavBar, Footer\n(Day 1-3)"]
        F2["Product List Page\nProduct Detail Page\n(Day 4-8)"]
        F3["Login, Register\nAuth Context, Interceptor\n(Day 9-12)"]
        F4["Cart Page\nAdd-to-Cart\nGuest/Auth merge\n(Day 13-16)"]
        F5["Checkout Flow\nOrder Confirmation\nOrder History\n(Day 17-20)"]
        F6["Reviews UI\nWishlist UI\n(Day 20-22)"]
        F7["Polish, Responsive\nVercel Preview Deploy\n(Day 23-25)"]
        F1 --> F2 --> F3 --> F4 --> F5 --> F6 --> F7
    end
```

> [!TIP]
> The frontend developer can start building UI with the **existing mock endpoints** immediately. Each milestone you complete transparently replaces mocks with real data — same URLs, same schemas, same status codes.

---

## Communication Protocol Between You and the Frontend Developer

| When | You Do | Frontend Developer Does |
|---|---|---|
| **Before each milestone** | Share the API contract from `docs/api.md` | Review and flag any concerns |
| **After each milestone** | Merge to `main`, announce "Module X is live" | Switch from mock/static data to real API calls |
| **Schema changes** | Never change response schemas without discussing first | Report any unexpected response shapes immediately |
| **Bug reports** | Frontend dev sends: endpoint, request body, response, expected behavior | You reproduce with integration test, fix, add regression test |
| **Environment** | Provide `VITE_API_BASE_URL` for dev and production | Configure in `.env` / Vite config |

---

## Summary Checklist

| # | Milestone | Your Deliverables | Tests | Docs Update |
|---|---|---|---|---|
| 1 | Docker & Test Harness | Dockerfile, docker-compose, conftest | Harness works | — |
| 2 | Categories | Exceptions, Service, Router, wire | ~10 integration | api.md |
| 3 | Products | Repository, Service, Router swap | ~15 integration | api.md |
| 4 | Users & Auth | security.py, full Users + Auth modules | ~15 integration | api.md |
| 5 | Middleware & Security | CORS, headers, logging, rate limit | ~5 integration | — |
| 6 | Carts | Full Carts module + merge endpoint | ~10 integration | api.md |
| 7 | Orders & Checkout | Atomic checkout, guest tokens | ~15 integration | api.md |
| 8 | Reviews & Wishlists | Full modules | ~10 integration | api.md |
| 9 | CI/CD | GitHub Actions workflows | Coverage gate | — |
| 10 | Deploy | OCI server, Nginx, SSL, Vercel | Smoke test | README.md |

**Total estimated timeline: ~25 working days for backend, running in parallel with the frontend developer.**
