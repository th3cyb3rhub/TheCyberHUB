# Security Policy

## Supported Versions

| Version | Supported |
|---------|-----------|
| 2.x (current) | Yes |
| 1.x | Security fixes only |
| < 1.0 | No |

Only the latest major version receives active security updates. Previous major versions may receive critical security patches at the maintainers' discretion.

## Reporting a Vulnerability

If you discover a security vulnerability in TheCyberHub, please report it responsibly. **Do not** create a public GitHub issue.

### How to Report

1. **Email**: Send details to **security@thecyberhub.org**
2. Include:
   - A clear description of the vulnerability
   - Steps to reproduce (or a proof of concept)
   - Affected components (frontend, API, specific endpoint)
   - Potential impact and severity assessment
   - Suggested fix, if you have one

### What to Expect

| Step | Timeline |
|------|----------|
| Acknowledgment | Within 48 hours |
| Initial assessment | Within 7 days |
| Status update | Every 7 days until resolved |
| Fix deployed | Depends on severity (critical: 24-72h, high: 1-2 weeks, medium/low: next release) |
| Public disclosure | After fix is deployed and users have had time to update |

### Credit

We credit researchers in our security advisories (unless you prefer to remain anonymous). Let us know your preference when reporting.

## Disclosure Policy

- We follow coordinated disclosure. Reporters are asked to keep vulnerabilities confidential until a fix is released.
- We will work with you to understand and verify the issue.
- We will not take legal action against researchers acting in good faith.
- We aim to fix critical vulnerabilities within 72 hours of confirmation.
- Security advisories are published on GitHub after patches are deployed.

## Security Features

### Authentication

- **Password hashing**: bcrypt with 12 salt rounds
- **JWT access tokens**: Short-lived, signed with `JWT_SECRET`
- **Refresh tokens**: Long-lived, stored as httpOnly cookies, signed with separate `JWT_REFRESH_SECRET`
- **Token rotation**: Refresh tokens are invalidated and replaced on each use
- **Two-factor authentication (2FA)**: TOTP-based with separate `JWT_2FA_SECRET` for temporary tokens
- **Google OAuth**: ID token verification for social login
- **Account lockout**: Progressive delays after failed login attempts, full lockout after 5 failures (60-minute duration)

### Authorization

- Role-based access control: `user`, `moderator`, `admin`, `owner`
- Route-level authorization middleware (`protect`, `authorize`, `isAdmin`, `isModerator`)
- Resource ownership checks in controllers (e.g., only blog authors can edit their posts)

### Rate Limiting

Seven specialized rate limiters protect against abuse:

| Limiter | Window | Max Requests | Scope |
|---------|--------|-------------|-------|
| Global API | 15 min | 50 anonymous / 200 authenticated | All /api/* |
| Authentication | 15 min | 5 attempts | Per IP |
| 2FA verification | 15 min | 5 attempts | Per IP |
| Registration | 1 hour | 2 accounts | Per IP |
| Password reset | 1 hour | 3 requests | Per IP |
| Search | 1 min | 30 queries | Per user/IP |
| Upload | 1 hour | 10 files | Per user |
| General mutation | 1 min | 30 requests | Per user |

Rate limiters use Redis in production for distributed enforcement. In development, limits are multiplied by 50x to avoid interrupting workflow.

### Input Validation

- **Server-side**: Joi schemas validate all request bodies, params, and query strings
- **NoSQL injection prevention**: `express-mongo-sanitize` strips `$` and `.` operators from all input
- **HTTP parameter pollution**: `hpp` middleware prevents duplicate query parameter attacks
- **XSS sanitization**: Custom middleware sanitizes all incoming request bodies
- **Client-side**: DOMPurify sanitizes all `dangerouslySetInnerHTML` content

### Security Headers

Configured via Helmet middleware:

- `Content-Security-Policy` -- restricts resource loading sources
- `Strict-Transport-Security` -- enforces HTTPS (max-age: 1 year, includeSubDomains)
- `X-Frame-Options: DENY` -- prevents clickjacking
- `X-Content-Type-Options: nosniff` -- prevents MIME sniffing
- `X-XSS-Protection` -- legacy XSS filter
- `Referrer-Policy` -- controls referrer information
- `Permissions-Policy` -- restricts browser feature access

### Data Protection

- Passwords are never stored in plaintext or logged
- Sensitive fields are excluded from API responses (password, tokens, etc.)
- File uploads go to AWS S3 (not stored on the application server)
- Body parser limits enforced (1MB max) to prevent memory exhaustion

### Infrastructure

- HTTPS enforced in production (HTTP-to-HTTPS redirect)
- Trust proxy configured for accurate client IP detection behind reverse proxies
- MongoDB connections use authenticated URIs in production
- Redis connections support TLS in production
- Docker containers run with resource limits (memory, CPU)
- Graceful shutdown prevents data corruption on deployment

### Error Handling

- Custom `ApiError` class hierarchy with standardized error codes
- Stack traces stripped from production error responses
- Request ID tracking (`X-Request-Id`) for incident investigation
- Structured logging via Winston (no `console.log` in production)
- Sentry integration for error monitoring and alerting

## Security Best Practices for Contributors

### Before Committing

- [ ] No secrets, API keys, or credentials in code
- [ ] `.env` files are not committed (check `.gitignore`)
- [ ] All user inputs are validated with Joi schemas
- [ ] Database queries use parameterized inputs (Mongoose handles this)
- [ ] `dangerouslySetInnerHTML` content is sanitized with DOMPurify
- [ ] New endpoints have appropriate auth and rate limiting middleware
- [ ] Sensitive data is not logged or exposed in error responses

### Environment Variables

- Use `.env.example` files for documentation only (never include real values)
- Use `NEXT_PUBLIC_` prefix only for non-sensitive frontend values
- Never hardcode credentials -- always use environment variables
- Use different credentials for development, staging, and production

### Dependencies

- Run `npm audit` before submitting PRs
- Keep dependencies updated -- Dependabot creates automated PRs
- Review dependency changes carefully (supply chain attacks)
- Use `package-lock.json` to pin exact versions

## Contact

- **Security issues**: security@thecyberhub.org
- **General questions**: GitHub Discussions
- **Community**: Discord Server
