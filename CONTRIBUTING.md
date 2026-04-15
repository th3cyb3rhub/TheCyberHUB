# Contributing to TheCyberHub

Thank you for your interest in contributing to TheCyberHub! This document provides guidelines and setup instructions for contributors.

## Table of Contents

- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Code Style Guide](#code-style-guide)
- [Commit Convention](#commit-convention)
- [Pull Request Process](#pull-request-process)
- [Testing Requirements](#testing-requirements)
- [Review Process](#review-process)
- [Code of Conduct](#code-of-conduct)

## Getting Started

TheCyberHub is a monorepo with a Next.js 15 frontend and an Express.js 4 backend. Both projects need to be running for full functionality.

### Prerequisites

- Node.js 18+ and npm
- Git
- MongoDB 7 (local or Docker)
- Redis 7 (local or Docker)
- A code editor (VS Code recommended)

### Repository Structure

```
TheCyberHub/              # Monorepo root
  TheCyberHub/            # Next.js 15 frontend (App Router, React 19, TypeScript 5.8)
  thecyberhub-core/       # Express.js 4 backend (MongoDB, Redis, Socket.IO)
  docker-compose.yml      # Production: MongoDB + Redis + API + Frontend
  docker-compose.dev.yml  # Dev override with hot reload
```

## Development Setup

### Option 1: Docker (Recommended for Quick Start)

```bash
# Clone the repository
git clone https://github.com/thecyberhub/TheCyberHub.git
cd TheCyberHub

# Start all services with hot reload
docker compose -f docker-compose.yml -f docker-compose.dev.yml up
```

This starts MongoDB, Redis, the API, and the frontend. Visit `http://localhost:3000`.

### Option 2: Manual Setup

#### Backend (thecyberhub-core)

```bash
cd thecyberhub-core
npm install
cp .env.example .env.development
# Edit .env.development with your MongoDB URI and secrets
npm run dev
```

The API will be available at `http://localhost:5001`.

Required environment variables:
- `MONGO_URI` -- MongoDB connection string
- `JWT_SECRET` -- Secret for signing access tokens
- `JWT_REFRESH_SECRET` -- Secret for signing refresh tokens
- `REDIS_URL` -- Redis connection string (optional in development)

#### Frontend (TheCyberHub)

```bash
cd TheCyberHub
npm install
cp .env.example .env.local
# Set NEXT_PUBLIC_API_URL=http://localhost:5001
npm run dev
```

The frontend will be available at `http://localhost:3000` (Turbopack dev server).

## Code Style Guide

### TypeScript (Frontend)

- Use TypeScript for all new files -- no `.js` files in the frontend
- Use functional components with hooks
- Prefix custom hooks with `use` (e.g., `useDebounce`, `useConfirmDialog`)
- Use path alias `@/*` for imports from `./src/*`
- Use `fetchApi()` from `@/lib/api` for all API calls -- never call `fetch` directly
- Use `tokenStore` from `@/lib/api` for JWT access -- never access `localStorage` directly
- Use `<Image>` from `next/image` with explicit `width`, `height`, and `alt`
- Sanitize `dangerouslySetInnerHTML` content with `DOMPurify.sanitize()`
- Use `<ConfirmDialog>` + `useConfirmDialog()` -- never use `window.confirm()`
- Use `useDebounce` hook for search inputs

#### File Organization

```
src/app/{route}/page.tsx         -- Route page (server or client component)
src/app/{route}/layout.tsx       -- Route layout (optional)
src/components/ui/               -- Shared UI components (Radix + shadcn)
src/components/{feature}/        -- Feature-specific components
src/hooks/                       -- Custom React hooks
src/lib/                         -- Utilities and API client
src/data/                        -- Static data files
src/types/                       -- TypeScript type definitions
```

#### Naming Conventions

- Components: PascalCase (`CodeReviewPage.tsx`)
- Hooks: camelCase with `use` prefix (`useDebounce.ts`)
- Utilities: camelCase (`formatDate.ts`)
- Types/Interfaces: PascalCase (`CodeSnippet`, `UserProfile`)
- CSS classes: Tailwind utility classes, kebab-case for custom classes

### JavaScript (Backend)

- CommonJS modules (`require`/`module.exports`)
- Use `async/await` -- no raw Promise chains
- Wrap controller methods with `asyncHandler` or use `try/catch` with `next(error)`
- Use `logger` from `src/utils/logger.js` -- never use `console.log`
- Add `.lean()` to all read-only Mongoose queries
- Use atomic operations (`$addToSet`, `$pull`, `$inc`) instead of read-modify-write
- Use `mongoose.startSession()` for multi-document mutations

#### File Organization

```
src/controllers/{feature}.controller.js  -- Request handling only
src/services/{feature}.service.js        -- Business logic
src/models/{Model}.js                    -- Mongoose schemas
src/routes/{feature}.routes.js           -- Route definitions + middleware chains
src/validations/{feature}.validation.js  -- Joi schemas
src/middleware/                           -- Shared middleware
```

#### Naming Conventions

- Controllers: `{feature}.controller.js`
- Routes: `{feature}.routes.js`
- Models: PascalCase (`CodeSnippet.js`)
- Middleware chain order: `auth -> validate -> rateLimiter -> controller`

### Styling (Frontend)

- Use Tailwind CSS utility classes
- Use CSS custom properties for theming (`globals.css`)
- Use semantic tokens: `surface.primary`, `content.primary`, etc.
- Dark mode is the default; support light mode with `dark:` variants
- Ensure responsive design (mobile-first)

## Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Types

| Type | Description |
|------|-------------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation only |
| `style` | Formatting, missing semicolons, etc. (no code change) |
| `refactor` | Code change that neither fixes a bug nor adds a feature |
| `perf` | Performance improvement |
| `test` | Adding or updating tests |
| `build` | Build system or external dependencies |
| `ci` | CI configuration |
| `chore` | Other changes that don't modify src or test files |
| `revert` | Reverts a previous commit |

### Scope (Optional)

Use the feature area: `auth`, `blog`, `forum`, `feed`, `ctf`, `labs`, `jobs`, `mentorship`, `admin`, `api`, `ui`.

### Examples

```
feat(blog): add reading time estimation to blog cards
fix(auth): resolve token refresh race condition on concurrent requests
docs: update API setup instructions in CONTRIBUTING.md
refactor(api): extract blog service layer from controller
test(forum): add integration tests for discussion voting
perf(feed): add compound index on author + createdAt
```

## Pull Request Process

### 1. Fork and Branch

```bash
# Fork the repo on GitHub, then clone your fork
git clone https://github.com/YOUR_USERNAME/TheCyberHub.git
cd TheCyberHub

# Add upstream remote
git remote add upstream https://github.com/thecyberhub/TheCyberHub.git

# Create a feature branch from develop
git checkout develop
git pull upstream develop
git checkout -b feature/your-feature-name
```

### 2. Develop

- Make your changes following the code style guide
- Write or update tests as needed
- Keep commits small and focused

### 3. Rebase Before Submitting

```bash
git fetch upstream
git rebase upstream/develop
# Resolve any conflicts
```

### 4. Submit PR

- Push your branch to your fork
- Open a PR against the `develop` branch (not `main`)
- Use a clear, descriptive title following commit conventions
- Fill out the PR template

### PR Template

```markdown
## Description
Brief description of changes and motivation.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update
- [ ] Code refactoring

## Testing
- [ ] Tested locally with `npm run dev`
- [ ] Build passes (`npm run build`)
- [ ] Lint passes (`npm run lint`)
- [ ] Added/updated unit tests
- [ ] Added/updated E2E tests (if UI change)

## Screenshots (if applicable)
Add screenshots for UI changes.

## Related Issues
Closes #123
```

### Branch Naming

- `feature/description` -- new features
- `fix/description` -- bug fixes
- `docs/description` -- documentation
- `refactor/description` -- code refactoring

## Testing Requirements

### Frontend

```bash
cd TheCyberHub

# Unit tests (Vitest + Testing Library)
npm test

# E2E tests (Playwright)
npm run test:e2e

# Lint
npm run lint

# Type check + build
npm run build
```

- All new components should have unit tests in `__tests__/` directories
- UI-facing features should have Playwright E2E tests in `e2e/`
- Tests must pass before a PR can be merged

### Backend

```bash
cd thecyberhub-core

# Unit + integration tests (Jest + mongodb-memory-server)
npm test

# Lint
npm run lint
```

- Controllers should have integration tests in `tests/integration/`
- Services should have unit tests in `tests/`
- Property-based tests (fast-check) are encouraged for data validation

### What to Test

- Happy path and edge cases
- Error handling (invalid input, unauthorized access, not found)
- Pagination boundaries
- Rate limiting behavior
- Authorization (different user roles)

## Review Process

1. **Automated checks**: CI runs lint, type-check, build, and tests on every PR
2. **Code review**: At least one maintainer reviews the code
3. **Feedback**: Address review comments and push fixes
4. **Approval**: Once approved and CI passes, a maintainer merges the PR
5. **Merge strategy**: Squash and merge to keep history clean

### What Reviewers Look For

- Adherence to code style and conventions
- Test coverage for new functionality
- No security vulnerabilities (input validation, auth checks, etc.)
- No hardcoded secrets or credentials
- Performance considerations (`.lean()`, indexes, pagination)
- Proper error handling
- Backward compatibility

## What to Avoid

- Do not commit `.env`, `.env.local`, or any files with secrets
- Do not commit `node_modules/` or build artifacts (`.next/`, `dist/`)
- Do not commit large binary files
- Do not leave `console.log` statements in production code
- Do not make unrelated changes in one PR
- Do not push directly to `main` or `develop`

## Code of Conduct

We are committed to providing a welcoming and inclusive environment. All contributors are expected to:

- Be respectful and constructive in all interactions
- Welcome newcomers and help them get started
- Accept constructive criticism gracefully
- Focus on what is best for the community
- Show empathy towards other community members

Harassment, discrimination, and abusive behavior will not be tolerated. Violations can be reported to the maintainers via email.

## Getting Help

- **Discord**: Join our community server for real-time discussion
- **GitHub Issues**: For bug reports and feature requests
- **GitHub Discussions**: For questions and general discussion

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [Mongoose Documentation](https://mongoosejs.com/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Conventional Commits](https://www.conventionalcommits.org/)
