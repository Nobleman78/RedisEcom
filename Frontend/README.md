# Redis E-commerce

A full-stack e-commerce application with a Next.js storefront and an Express API. It supports product discovery, customer accounts, shopping carts, and checkout.

## Features

- Browse, search, and filter products by category
- View latest, featured, and sale products
- Sign up, log in, and manage authenticated sessions
- Manage a shopping cart and apply coupons
- Create Stripe checkout sessions
- Subscribe to the store newsletter
- Cache product data and store refresh tokens with Redis
- Store product and order data in MongoDB
- Use Supabase for frontend authentication integration

## Tech stack

- **Frontend:** Next.js, React, TypeScript, Redux Toolkit / RTK Query, Tailwind CSS
- **Backend:** Node.js, Express
- **Data and services:** MongoDB, Redis, Supabase, Stripe, Cloudinary

## Prerequisites

- Node.js and npm
- A MongoDB connection string
- A Redis instance
- Credentials for any integrations you want to enable (Supabase, Stripe, Cloudinary, and email)

## Run locally

Clone the repository, then install and start the backend in one terminal:

```bash
cd Redis-Ecom-Backend
npm install
node api/index.js
```

In a second terminal, install and start the frontend:

```bash
cd Frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The frontend proxies `/api/*` requests to `http://localhost:5000` by default.

## Environment variables

Create `Frontend/.env.local` and `Redis-Ecom-Backend/.env` as needed. Do not commit credentials or secret keys.

### Frontend (`Frontend/.env.local`)

```dotenv
BACKEND_URL=http://localhost:5000
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Configure the Supabase values for Supabase-backed authentication. `BACKEND_URL` defaults to `http://localhost:5000`; `NEXT_PUBLIC_SITE_URL` is used when constructing the authentication callback URL.

### Backend (`Redis-Ecom-Backend/.env`)

```dotenv
PORT=5000
MONGO_URI=
REDIS_URL=
ACCESS_TOKEN_SECRET=
REFRESH_TOKEN_SECRET=
CLIENT_URL=http://localhost:3000

STRIPE_SECRET_KEY=
CLOUNDINARY_CLOUD_NAME=
CLOUNDINARY_API_KEY=
CLOUNDINARY_API_SECRET=

EMAIL_USER=
EMAIL_PASS=
SUPABASE_URL=
SUPABASE_ANON_KEY=
```

`MONGO_URI` is required for API requests. Redis is used by authentication and product caching. Set the integration credentials for the features you intend to use. The Cloudinary variable names above match the backend configuration.

## API overview

The backend exposes these route groups under `/api`:

| Route | Purpose |
| --- | --- |
| `/auth` | Registration, login, logout, token refresh, and profile |
| `/products` | Product listings, search, categories, and product details |
| `/cart` | Authenticated cart operations |
| `/coupons` | Retrieve and validate coupons |
| `/payments` | Create checkout sessions and handle checkout success |
| `/subscribe` | Newsletter subscriptions |

## Available scripts

In `Frontend/`:

```bash
npm run dev
npm run build
npm run start
npm run lint
```


