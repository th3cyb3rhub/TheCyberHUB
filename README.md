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
| **Framework** | Next.js 15 (App Router), React 19, TypeScript 5.8 |
| **Styling** | Tailwind CSS, CSS Custom Properties (dark/light theming) |
| **UI** | Radix UI + shadcn/ui, Lucide icons |
| **State** | React Context + TanStack React Query |
| **Auth** | JWT tokens, Google/GitHub OAuth, 2FA (TOTP) |
| **Real-time** | Socket.IO for notifications |
| **Testing** | Vitest (unit), Playwright (E2E) |
| **Infra** | GitHub Actions CI/CD, Sentry error tracking |

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

The frontend connects to the TheCyberHub API. Set `NEXT_PUBLIC_API_URL` in your `.env.local` to point to the API server.

---

## Project Structure

```
TheCyberHub/
  src/
    app/                      # 105+ page routes (App Router)
    components/               # 88+ reusable components
    hooks/                    # Custom React hooks + React Query
    lib/                      # API client, constants, validations
    context/                  # Auth, Theme, Toast, Notifications
  e2e/                        # Playwright E2E tests
```

---

## Environment Variables

Copy the example file and you're ready to go — it points to the dev API by default:

```bash
cp .env.example .env.local
```

```env
# Dev API (default — no local backend needed)
NEXT_PUBLIC_API_URL=https://dev-api.thecyberhub.org

# Production API
# NEXT_PUBLIC_API_URL=https://api.thecyberhub.org

# Local backend (only if running thecyberhub-core locally)
# NEXT_PUBLIC_API_URL=http://localhost:5001
```

---

## Important: Existing Fork Owners

The repository has been restructured. **`dev` is now the default and only active branch.** If you forked this repo previously, you need to re-sync your fork:

```bash
# Option 1: Re-sync (recommended — keeps your fork)
cd TheCyberHub
git remote add upstream https://github.com/th3cyb3rhub/TheCyberHub.git
git fetch upstream
git checkout dev
git reset --hard upstream/dev
git push origin dev --force
```

```bash
# Option 2: Fresh fork (simplest if you have no local changes)
# Delete your old fork on GitHub, then fork again from
# https://github.com/th3cyb3rhub/TheCyberHub
```

After syncing, all future `git pull` will work normally.

---

## Contributing

Contributions make the open source community amazing. Any contributions you make are **truly appreciated**.

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/TheCyberHub.git`
3. Add upstream: `git remote add upstream https://github.com/th3cyb3rhub/TheCyberHub.git`
4. Create your branch from `dev`: `git checkout -b feature/amazing-feature`
5. Make your changes and commit: `git commit -m 'feat: add amazing feature'`
6. Push to your fork: `git push origin feature/amazing-feature`
7. Open a Pull Request targeting `dev` branch

### Before submitting a PR

```bash
git fetch upstream
git rebase upstream/dev
npm run build    # Must pass with zero errors
npm run lint     # Fix any lint warnings
```

> **New to open source?** Check out [first-contribution](https://github.com/th3cyb3rhub/first-contribution) first.

### Development Commands

```bash
npm run dev          # Dev server (Turbopack)
npm run build        # Production build
npm run lint         # ESLint
npm test             # Vitest unit tests
npm run test:e2e     # Playwright E2E
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
  <a href="https://www.github.com/th3cyb3rhub"><img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" alt="Github" /></a>
  <a href="https://www.linkedin.com/company/th3cyb3rhub/"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" /></a>
  <a href="https://t.me/th3cyb3rhub"><img src="https://img.shields.io/badge/Telegram-2CA5E0?style=for-the-badge&logo=telegram&logoColor=white" alt="Telegram" /></a>
  <a href="https://www.twitter.com/th3cyb3rhub"><img src="https://img.shields.io/badge/Twitter-100000?style=for-the-badge&logo=x&logoColor=white" alt="Twitter" /></a>
</p>
