# TheCyberHub Architecture

This document describes the system architecture of TheCyberHub, a cybersecurity education and community platform.

## High-Level Overview

```
                         +------------------+
                         |   Cloudflare /   |
                         |   Nginx Proxy    |
                         +--------+---------+
                                  |
                    +-------------+-------------+
                    |                           |
           +-------v--------+         +--------v--------+
           |  Next.js 15    |         |  Express.js 4   |
           |  Frontend      |         |  API Server     |
           |  (Port 3000)   |         |  (Port 5001)    |
           +-------+--------+         +---+----+----+---+
                   |                      |    |    |
                   |               +------+    |    +------+
                   |               |           |           |
              +----v----+    +-----v---+  +----v----+  +---v------+
              | Browser |    | MongoDB |  |  Redis  |  | AWS S3   |
              | Client  |    |   7     |  |   7     |  | (Uploads)|
              +---------+    +---------+  +---------+  +----------+
                   |
              +----v---------+
              | Socket.IO    |
              | (Real-time)  |
              +--------------+
```

## Frontend Architecture

### Framework

- **Next.js 15** with App Router (file-based routing under `src/app/`)
- **React 19** with Server and Client Components
- **TypeScript 5.8** for type safety
- **Turbopack** for development bundling

### Routing

All routes live under `src/app/`. Each route directory contains:

- `page.tsx` -- the page component (server or client)
- `layout.tsx` -- optional layout wrapper
- `loading.tsx` -- loading UI (Suspense boundary)
- `error.tsx` -- error boundary

Key routes: `/auth`, `/blog`, `/forums`, `/feed`, `/ctf`, `/challenges`, `/events`, `/jobs`, `/mentorship`, `/labs`, `/code-review`, `/tools`, `/cheatsheets`, `/admin`.

### Data Flow

```
User Action
    |
    v
React Component (Client)
    |
    v
fetchApi() from @/lib/api.ts
    |
    +-- Attaches JWT from tokenStore
    +-- Handles 401 with automatic token refresh
    |
    v
Express API (/api/*)
    |
    v
React Component receives JSON response
    |
    v
TanStack React Query caches client-side
```

- **fetchApi()** (`src/lib/api.ts`) is the centralized API client. It auto-attaches the Bearer token from `tokenStore` and performs a single token refresh attempt on 401 responses.
- **TanStack React Query** handles client-side caching, deduplication, and background refetching.
- **tokenStore** (`src/lib/api.ts`) provides `get()`, `set()`, `remove()` methods for JWT access. Direct `localStorage` access is avoided everywhere else.

### Styling

- **Tailwind CSS** with CSS custom properties for theming
- Semantic design tokens in `globals.css` (e.g., `surface.primary`, `content.primary`)
- Dark mode is the default; `dark:` variants support light mode
- **Radix UI** primitives + **shadcn/ui** components in `src/components/ui/`
- **Lucide React** for icons (tree-shaken via `optimizePackageImports`)

### State Management

- **React Context** providers for global state:
  - `AuthContext` -- user session, login/logout
  - `ThemeContext` -- dark/light mode
  - `NotificationProvider` -- Socket.IO real-time notifications
  - `ToastContext` -- ephemeral toast messages
- **TanStack React Query** for server state (API data caching)

### Error Tracking

- **Sentry** with separate configs for client (`sentry.client.config.ts`), server (`sentry.server.config.ts`), and edge (`sentry.edge.config.ts`)
- Custom `global-error.tsx` and per-route `error.tsx` boundaries

### Testing

- **Vitest** + **Testing Library** for unit tests (`src/**/__tests__/*.test.{ts,tsx}`)
- **Playwright** for E2E tests (`e2e/*.spec.ts`) targeting Chromium, Firefox, and Mobile Chrome

---

## Backend Architecture

### Framework

- **Express.js 4** with MVC pattern
- CommonJS modules (Node.js)
- Entry point: `src/server.js`

### Request Pipeline

```
Incoming Request
    |
    v
Trust Proxy (production)
    |
    v
HTTPS Redirect (production)
    |
    v
Sentry Request Handler
    |
    v
Request ID Middleware (X-Request-Id)
    |
    v
CORS (origin whitelist)
    |
    v
Security Headers (Helmet: CSP, HSTS, X-Frame-Options)
    |
    v
Global Rate Limiter (/api/* -- 50 req/15min anonymous, 200 authenticated)
    |
    v
Body Parser (1MB limit) + Cookie Parser
    |
    v
Input Sanitization (XSS prevention via DOMPurify)
    |
    v
NoSQL Injection Prevention (express-mongo-sanitize)
    |
    v
HTTP Parameter Pollution Prevention (hpp)
    |
    v
Route Handler
    |   Route-level middleware chain: auth -> validate -> rateLimiter -> controller
    v
Sentry Error Handler
    |
    v
404 Handler (notFound)
    |
    v
Global Error Handler (errorHandler)
```

### Directory Structure

```
thecyberhub-core/src/
  controllers/     -- Request handling (one per feature)
  services/        -- Business logic, reusable operations
  models/          -- Mongoose schemas (40 models)
  routes/          -- Route definitions with middleware chains
  middleware/      -- auth, validate, rateLimiter, cache, error, sanitize, security
  validations/     -- Joi schemas (also embedded in validate.js)
  config/          -- db, cache (Redis), swagger, sentry
  utils/           -- asyncHandler, ApiError, logger (Winston), errorCodes
  modules/         -- Feature modules (cache service)
  jobs/            -- Background job scheduler
  socket.js        -- Socket.IO initialization
  server.js        -- Application entry point
```

### Database Layer

- **MongoDB 7** via **Mongoose 8**
- 40 models covering Users, Blogs, Discussions, Challenges, Events, Jobs, Mentorships, Labs, and more
- Compound indexes on frequently queried fields
- Text indexes for full-text search
- Read queries use `.lean()` for performance
- Multi-document mutations use `mongoose.startSession()` transactions
- Atomic operations (`$addToSet`, `$pull`, `$inc` with `findOneAndUpdate`) preferred over read-modify-write

### Caching Layer

- **Redis 7** via **ioredis**
- `cache.service.js` provides `get`, `set`, `del`, `invalidatePattern`
- Cache middleware (`middleware/cache.js`) wraps GET endpoints with configurable TTL
- Rate limiter uses Redis store in production (falls back to memory in development)
- Socket.IO uses Redis adapter for multi-instance pub/sub
- Cache invalidation: always call `cacheService.invalidatePattern()` after mutations

---

## Authentication Flow

### JWT + Refresh Token

```
1. Login (POST /api/auth/login)
   Client sends email + password
       |
       v
   Server validates credentials (bcrypt, 12 rounds)
       |
       +-- If 2FA enabled: returns tempToken, client must POST /api/auth/verify-2fa
       |
       +-- If no 2FA: returns accessToken (short-lived) + sets httpOnly refresh cookie
       |
       v
2. Authenticated Requests
   Client sends: Authorization: Bearer <accessToken>
       |
       v
   protect middleware (middleware/auth.js):
     - Extracts token from Authorization header
     - Verifies with JWT_SECRET
     - Loads user from DB
     - Checks user.isActive
     - Sets req.user
       |
       v
3. Token Refresh (POST /api/auth/refresh)
   Client sends refresh token (httpOnly cookie or body)
       |
       v
   Server validates refresh token (JWT_REFRESH_SECRET)
     - Checks RefreshToken model for revocation
     - Issues new access + refresh token pair
     - Rotates refresh token (old one invalidated)
       |
       v
4. Client-side auto-refresh
   fetchApi() detects 401 -> calls tryRefreshToken() -> retries original request
```

### Google OAuth

```
Client obtains Google ID token
    |
    v
POST /api/auth/google { idToken }
    |
    v
Server verifies with Google's tokeninfo endpoint
    |
    v
Creates or links User account -> issues JWT pair
```

### Two-Factor Authentication (2FA)

- TOTP-based (time-based one-time password)
- Separate `JWT_2FA_SECRET` for temporary tokens during 2FA verification
- Enable: `POST /api/auth/enable-2fa` (returns QR code secret)
- Verify on login: `POST /api/auth/verify-2fa` (validates 6-digit code)
- Rate limited: 5 attempts per 15 minutes

### Authorization

- Role-based: `user`, `moderator`, `admin`, `owner`
- `authorize(...roles)` middleware restricts to specific roles
- `isAdmin` requires `admin` or `owner`
- `isModerator` requires `moderator`, `admin`, or `owner`
- `optionalAuth` sets `req.user` if token present but does not require it

---

## Real-Time Communication

### Socket.IO

```
Client (NotificationProvider)
    |
    v
socket.handshake.auth = { token: JWT }
    |
    v
Socket.IO Server (src/socket.js)
    |
    +-- Authenticates via JWT on connection
    +-- Joins user-specific room
    +-- Redis adapter for multi-instance support
    |
    v
Server emits events:
    - notification (new notification)
    - notification:read (mark as read)
    - online-status (presence updates)
```

The Socket.IO server initializes in `server.js` after the HTTP server starts. Authentication is performed via the token passed in `socket.handshake.auth`. The Redis adapter enables horizontal scaling across multiple API instances.

---

## Caching Strategy

### Server-Side (Redis)

| Cache Target | TTL | Invalidation |
|---|---|---|
| Blog list | 5 min | On blog create/update/delete |
| Blog detail | 2 min | On blog update/delete |
| Category stats | 10 min | On blog create/delete |
| Forum list | 5 min | On discussion create/update |
| Search results | 1 min | Time-based expiry |
| Rate limit counters | 1-60 min | Auto-expire |

### Client-Side (React Query)

- Default stale time: configured per query
- Background refetch on window focus
- Deduplication of concurrent identical requests
- Optimistic updates for like/bookmark toggles
- Cache persisted in memory (cleared on page refresh)

---

## Deployment Architecture

### Docker Compose (Production)

```
docker-compose.yml
  |
  +-- mongodb (mongo:7)
  |     - Volume: mongo-data
  |     - Health check: mongosh ping
  |     - Memory limit: 2GB
  |
  +-- redis (redis:7-alpine)
  |     - Volume: redis-data
  |     - Health check: redis-cli ping
  |     - Memory limit: 512MB
  |
  +-- api (thecyberhub-core)
  |     - Port: 5000:5001
  |     - Depends on: mongodb, redis (healthy)
  |     - Health check: HTTP GET /api/health
  |     - Memory limit: 1GB
  |
  +-- frontend (TheCyberHub)
        - Port: 3000:3000
        - Depends on: api
        - Health check: HTTP GET /
        - Memory limit: 1GB
```

### CI/CD (GitHub Actions)

```
Push / PR to main or develop
    |
    v
Lint (ESLint)
    |
    v
Type Check (tsc --noEmit)
    |
    v
Build (next build / tsc)
    |
    v
Test (Vitest / Jest with MongoDB service container)
    |
    v
Deploy (on merge to main)
```

### Health Checks

The API exposes four health endpoints:

- `GET /api/health` -- basic health status
- `GET /api/health/live` -- liveness probe (is the process running?)
- `GET /api/health/ready` -- readiness probe (are dependencies connected?)
- `GET /api/health/detailed` -- full health report (DB, Redis, memory, uptime)

### Graceful Shutdown

The server handles `SIGTERM` and `SIGINT` signals:
1. Stops accepting new connections
2. Closes MongoDB connection
3. Exits cleanly
4. Force-exits after 10 second timeout if shutdown hangs

---

## Security Architecture

### Frontend Security

- **DOMPurify** sanitizes all `dangerouslySetInnerHTML` content
- **CSP headers** via Next.js config
- **HSTS** enforced in production
- No direct `localStorage` access outside `tokenStore`

### Backend Security

- **Helmet** sets security headers (CSP, X-Frame-Options, X-Content-Type-Options, etc.)
- **express-mongo-sanitize** strips `$` and `.` from request data to prevent NoSQL injection
- **hpp** prevents HTTP parameter pollution
- **Custom input sanitization** middleware strips XSS payloads from request bodies
- **7 specialized rate limiters**: API, auth (with progressive delays + account lockout), 2FA, registration, password reset, search, upload, blog/forum/feed creation, general mutation
- **Joi validation** on all mutating endpoints (body, params, and query)
- **bcrypt** with 12 salt rounds for password hashing
- **JWT token rotation** on refresh (old refresh tokens are invalidated)
- **httpOnly cookies** for refresh tokens (not accessible via JavaScript)

### Error Handling

- Custom `ApiError` class hierarchy with error codes
- Global error handler strips stack traces in production
- Request ID tracking for debugging
- Structured logging via Winston (no `console.log` in production)
- Sentry integration for error tracking and alerting
