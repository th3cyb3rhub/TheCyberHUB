<h1 align="center">TheCyberHub</h1>

<p align="center">
  <strong>Open Source Cybersecurity Learning Platform</strong><br>
  Learn. Practice. Master Security.
</p>

<p align="center">
  <a href="https://www.thecyberhub.org/">Website</a> &bull;
  <a href="https://dev.thecyberhub.org/">Dev Site</a> &bull;
  <a href="https://discord.gg/QHBPq6xP5p">Discord</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js_15-000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind" />
</p>

---

## What is TheCyberHub?

TheCyberHub is an all-in-one cybersecurity education and community platform with:

- **100+ CTF Challenges** — Web, Crypto, Forensics, Reverse Engineering, OSINT
- **22+ Security Tools** — JWT Analyzer, Hash Cracker, Port Scanner, DNS Lookup, and more
- **8 Cheatsheet Categories** — Linux, Networking, XSS, SQL Injection, Privilege Escalation
- **Community Forums** — Ask questions, share knowledge, vote on answers
- **Social Feed** — Posts, likes, comments, reshares, hashtags
- **Job Board** — Cybersecurity careers, internships, employer dashboard
- **Mentorship Program** — Connect with experienced professionals
- **Events & CTF Competitions** — Workshops, webinars, meetups with registration
- **Learning Paths** — Guided courses from beginner to expert
- **Leaderboard** — Global rankings, streak tracking, achievements
- **Blog Platform** — Write tutorials, share writeups
- **Admin Dashboard** — Full moderation, analytics, user management

---

## Tech Stack

| Layer | Tech |
|-------|------|
| **Frontend** | Next.js 15 (App Router), React 19, TypeScript 5.8, Tailwind CSS |
| **Backend** | Express.js 4, MongoDB 7 (Mongoose 8), Redis 7 (ioredis) |
| **Auth** | JWT + httpOnly Refresh Tokens, Google/GitHub OAuth, 2FA (TOTP) |
| **Real-time** | Socket.IO with Redis adapter |
| **UI** | Radix UI + shadcn/ui, Lucide icons |
| **Testing** | Vitest (unit), Playwright (E2E), Jest (backend) |
| **Infra** | Docker, GitHub Actions CI/CD, Sentry, Winston logging |

---

## Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) v20+
- [Git](https://git-scm.com/)
- [MongoDB](https://www.mongodb.com/) (local or Atlas)
- [Redis](https://redis.io/) (optional, for caching)

### Frontend Setup

```bash
git clone https://github.com/th3cyb3rhub/TheCyberHub.git
cd TheCyberHub
npm install
cp .env.example .env.local
# Edit .env.local with your API URL
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Backend Setup

```bash
git clone https://github.com/th3cyb3rhub/thecyberhub-core.git
cd thecyberhub-core
npm install
cp .env.example .env
# Edit .env with MongoDB URI, JWT secret, etc.
npm run dev
```

API runs at [http://localhost:5001](http://localhost:5001)

### Docker (Full Stack)

```bash
# Clone both repos into same parent directory
docker compose up -d
```

| Service | URL |
|---------|-----|
| Frontend | http://localhost:3000 |
| API | http://localhost:5000 |
| MongoDB | localhost:27017 |
| Redis | localhost:6379 |

---

## Project Structure

```
TheCyberHub/                  # Next.js 15 Frontend
  src/
    app/                      # 105+ page routes (App Router)
    components/               # 88 reusable components
    hooks/                    # Custom React hooks + React Query
    lib/                      # API client, constants, validations
    context/                  # Auth, Theme, Toast, Notifications
  e2e/                        # Playwright E2E tests

thecyberhub-core/             # Express.js Backend
  src/
    controllers/              # 31 controllers
    models/                   # 41 Mongoose models
    routes/                   # 28 route modules
    middleware/                # Auth, validation, rate limiting
    services/                 # Business logic layer
    validations/              # Joi input schemas
    templates/emails/         # HTML email templates
  tests/                      # Jest tests
  migrations/                 # Database migrations
```

---

## Environment Variables

### Frontend (`.env.local`)

```env
NEXT_PUBLIC_API_URL=http://localhost:5001
NEXT_PUBLIC_SENTRY_DSN=              # Optional
```

### Backend (`.env`)

```env
# Required
MONGODB_URI=mongodb://localhost:27017/thecyberhub
JWT_SECRET=your-secret-here
JWT_2FA_SECRET=your-2fa-secret
REDIS_URL=redis://localhost:6379
PORT=5001

# Optional
SENTRY_DSN=
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

See `thecyberhub-core/.env.example` for the full list.

---

## Contributing

Contributions make the open source community amazing. Any contributions you make are **truly appreciated**.

1. Fork the repository
2. Create your branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request to `dev`

> **New to open source?** Check out [first-contribution](https://github.com/thecyberworld/first-contribution) first.

### Development Commands

```bash
# Frontend
npm run dev          # Dev server (Turbopack)
npm run build        # Production build
npm run lint         # ESLint
npm test             # Vitest unit tests
npm run test:e2e     # Playwright E2E

# Backend
npm run dev          # Nodemon dev server
npm test             # Jest tests
npm run lint         # ESLint
npm run migrate      # Database migrations
```

---

## License

[TheCyberHub](https://www.thecyberhub.org) is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Support

If you find this project useful, give it a star! It helps us grow the community.

---

## Connect With Us

<p>
  <a href="https://discord.gg/QHBPq6xP5p"><img src="https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white" alt="Discord" /></a>
  <a href="https://www.github.com/thecyberworld"><img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" alt="Github" /></a>
  <a href="https://www.linkedin.com/company/thecyberw0rld/"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" /></a>
  <a href="https://t.me/thecyberw0rld"><img src="https://img.shields.io/badge/Telegram-2CA5E0?style=for-the-badge&logo=telegram&logoColor=white" alt="Telegram" /></a>
  <a href="https://www.twitter.com/thecyberw0rld"><img src="https://img.shields.io/badge/Twitter-100000?style=for-the-badge&logo=x&logoColor=white" alt="Twitter" /></a>
</p>
