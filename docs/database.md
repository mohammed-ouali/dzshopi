# Database overview
## Entity–relationship diagram

```mermaid
erDiagram
	users {
		int id PK
		varchar(100) first_name
		varchar(100) last_name
		varchar(254) email UK
		varchar(255) password_hash
		boolean is_active
		timestamptz created_at
		timestamptz updated_at
	}
	categories {
		int id PK
		varchar(100) name
		text description "nullable"
		boolean is_active
		timestamptz created_at
		timestamptz updated_at
	}
	products {
		int id PK
		int category_id FK
		varchar(200) name
		text description "nullable"
		boolean is_active
		timestamptz created_at
		timestamptz updated_at
	}
	product_variants {
		int id PK
		int product_id FK
		varchar(100) sku UK
		numeric price
		int stock_quantity
		jsonb attributes
		boolean is_active
		timestamptz created_at
		timestamptz updated_at
	}
	product_images {
		int id PK
		int product_id FK
		text image_url
		varchar(255) imagekit_file_id UK
		varchar(255) alt_text "nullable"
		int position
		timestamptz created_at
	}
	carts {
		int id PK
		int user_id FK, UK
		timestamptz created_at
		timestamptz updated_at
	}
	cart_items {
		int id PK
		int cart_id FK
		int product_variant_id FK
		int quantity
		timestamptz created_at
		timestamptz updated_at
	}
	wishlists {
		int id PK
		int user_id FK, UK
		timestamptz created_at
		timestamptz updated_at
	}
	wishlist_items {
		int id PK
		int wishlist_id FK
		int product_id FK
		timestamptz created_at
	}
	orders {
		int id PK
		int user_id FK "nullable"
		varchar(150) first_name
		varchar(150) last_name
		varchar(30) customer_phone
		varchar(100) wilaya
		varchar(200) delivery_desk
		varchar(10) status
		varchar(30) payment_method
		numeric subtotal
		numeric delivery_fee
		numeric total
		text notes "nullable"
		timestamptz created_at
		timestamptz updated_at
	}
	order_items {
		int id PK
		int order_id FK
		int product_variant_id FK "nullable"
		varchar(200) product_name
		jsonb variant_attributes
		int quantity
		numeric unit_price
		numeric line_total
	}
	reviews {
		int id PK
		int user_id FK
		int product_id FK
		smallint rating
		text comment "nullable"
		timestamptz created_at
		timestamptz updated_at
	}

	users ||--o| carts : owns
	users ||--o| wishlists : owns
	users o|--o{ orders : places
	users ||--o{ reviews : writes
	categories ||--o{ products : categorizes
	products ||--o{ product_variants : has
	products ||--o{ product_images : displays
	products ||--o{ wishlist_items : saved_in
	products ||--o{ reviews : receives
	carts ||--o{ cart_items : contains
	product_variants ||--o{ cart_items : selected_as
	wishlists ||--o{ wishlist_items : contains
	orders ||--o{ order_items : includes
	product_variants o|--o{ order_items : referenced_by
```

`||` denotes exactly one, `o|` zero or one, and `o{` zero or more. Each order item must reference one order, but the schema permits orders with no items. `imagekit_file_id` is non-null and unique in the actual model and migration.

## Entity responsibilities

| Entity | Responsibility |
|---|---|
| `users` | Registered account identity, credentials, activation, timestamps. |
| `categories` | Product classification and activation. |
| `products` | Catalog item identity, category, description, activation. |
| `product_variants` | SKU-specific price, stock, JSONB attributes, and activation. |
| `product_images` | Product image URL, ImageKit file ID, alt text, ordering, creation time. |
| `carts` | At most one persisted cart per registered user. |
| `cart_items` | Variant and quantity entries in a registered user's cart. |
| `wishlists` | At most one wishlist per registered user. |
| `wishlist_items` | Products saved in a wishlist. |
| `orders` | Checkout, customer/delivery snapshots, status, payment method, and totals. |
| `order_items` | Purchased-item snapshots and optional link to a current variant. |
| `reviews` | User product rating and optional comment. |

## Relationships and deletion policy

| Parent | Child | Foreign key | Nullable? | `ON DELETE` |
|---|---|---|---|---|
| `users` | `carts` | `carts.user_id` | No | `CASCADE` |
| `users` | `wishlists` | `wishlists.user_id` | No | `CASCADE` |
| `users` | `orders` | `orders.user_id` | Yes | `SET NULL` |
| `users` | `reviews` | `reviews.user_id` | No | `CASCADE` |
| `categories` | `products` | `products.category_id` | No | `RESTRICT` |
| `products` | `product_variants` | `product_variants.product_id` | No | `RESTRICT` |
| `products` | `product_images` | `product_images.product_id` | No | `CASCADE` |
| `products` | `wishlist_items` | `wishlist_items.product_id` | No | `RESTRICT` |
| `products` | `reviews` | `reviews.product_id` | No | `RESTRICT` |
| `carts` | `cart_items` | `cart_items.cart_id` | No | `CASCADE` |
| `product_variants` | `cart_items` | `cart_items.product_variant_id` | No | `RESTRICT` |
| `wishlists` | `wishlist_items` | `wishlist_items.wishlist_id` | No | `CASCADE` |
| `orders` | `order_items` | `order_items.order_id` | No | `RESTRICT` |
| `product_variants` | `order_items` | `order_items.product_variant_id` | Yes | `SET NULL` |

ORM behavior supplements these actions: cart and wishlist contents use delete-orphan cascades; product images use delete-orphan; order items have no delete cascade and `Order.items` uses `passive_deletes="all"`, leaving the database `RESTRICT` rule to reject order deletion when items exist. User deletion cascades to its cart, wishlist, and reviews in the ORM as well; order rows are retained and detached by the nullable FK.

## Important constraints and indexes

| Table | Unique constraints / indexes | Check constraints |
|---|---|---|
| `users` | Unique index on `email` (`ix_users_email`; case-sensitive) | — |
| `categories` | — | — |
| `products` | Index `ix_products_category_id` | — |
| `product_variants` | Unique `sku`; index `ix_product_variants_product_id` | `price >= 0`; `stock_quantity >= 0` |
| `product_images` | Unique `imagekit_file_id`; index `(product_id, position)` | `position >= 0` |
| `carts` | Unique `user_id` | — |
| `cart_items` | Unique `(cart_id, product_variant_id)`; index `product_variant_id` | `quantity > 0` |
| `wishlists` | Unique `user_id` | — |
| `wishlist_items` | Unique `(wishlist_id, product_id)`; index `product_id` | — |
| `orders` | Indexes `(user_id, created_at)` and `(status, created_at)` | COD-only payment method; amounts nonnegative; `total = subtotal + delivery_fee`; generated status check for the six `OrderStatus` values |
| `order_items` | Indexes `order_id`, `product_variant_id` | `quantity > 0`; amounts nonnegative; `line_total = quantity * unit_price` |
| `reviews` | Unique `(user_id, product_id)`; index `product_id` | `rating BETWEEN 1 AND 5` |

## Design notes

- `orders.user_id` is nullable, supporting guest checkout in the schema. Recipient name, phone, wilaya, and delivery desk are stored on the order; deleting a user sets the FK to null.
- `order_items` stores product name, variant attributes, quantity, unit price, and line total as historical snapshots. Its variant link is nullable and becomes null if the variant is deleted.
- Products and variants have `is_active`; categories also have `is_active`. These columns represent deactivation state; they do not themselves enforce an application deletion policy.
- `product_images` stores `image_url` and a required unique `imagekit_file_id`; image assets themselves are external to PostgreSQL. The schema does not implement external asset lifecycle operations.
- Guest carts are not represented by a separate table; the schema only has carts tied to users.