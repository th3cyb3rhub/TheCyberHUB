# TheCyberHub - Project Documentation

> Comprehensive guide for features, development checklist, and UI consistency.

---

## 🎯 Project Scope

### Architecture
```
thecyberhub.org              → Main platform (auth, content, submissions)
├── labs.thecyberhub.org     → Vulnerable web apps (Docker containers)
└── ctf.thecyberhub.org      → CTF machines / TryHackMe integration
```

### Core Features

| Feature | Description |
|---------|-------------|
| **Auth** | Register, login, profile, password reset |
| **Learning** | Roadmaps, cheatsheets, blog |
| **CTF Platform** | Challenges, flag submission, hints, leaderboards |
| **Security Labs** | OWASP Top 10, code review, Docker environments |
| **Events** | CTF competitions, webinars, workshops, meetups |
| **Tools** | JWT analyzer, subdomain finder, etc. |
| **Community** | Profiles, badges, points, Discord |

### Tech Stack
- **Frontend:** Next.js 15, React 19, TypeScript, TailwindCSS
- **Backend:** Node.js, Express, MongoDB
- **Labs:** Docker containers on subdomains

---

## 📁 Project Structure

```
thecyberhub/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx            # Homepage
│   │   ├── layout.tsx          # Root layout
│   │   ├── tools/              # Security tools
│   │   ├── cheatsheets/        # Cheatsheets
│   │   ├── roadmaps/           # Learning roadmaps
│   │   └── ...
│   ├── components/             # Reusable components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── HeroSection.tsx
│   │   └── ...
│   └── lib/                    # Utilities
├── public/                     # Static assets
└── PROJECT.md                  # This file
```

---

## 🎨 UI Design System

### Color Palette

| Color | Tailwind Class | Usage |
|-------|---------------|-------|
| Background | `bg-black` | Main background |
| Card Background | `bg-white/[0.02]` or `bg-white/5` | Cards, inputs |
| Border | `border-white/10` | All borders |
| Border Hover | `border-orange-500/30` | Hover states |
| Text Primary | `text-white` | Headings, important text |
| Text Secondary | `text-gray-400` | Body text, descriptions |
| Text Muted | `text-gray-500` | Labels, metadata |
| Accent | `text-orange-500` | Highlights, icons, CTAs |
| Accent Hover | `hover:bg-orange-600` | Button hover |

### Typography

```tsx
// Headings
<h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white">
<h2 className="text-xl font-semibold text-white">
<h3 className="font-medium text-white">

// Body
<p className="text-lg text-gray-400">           // Large body
<p className="text-sm text-gray-400">           // Regular body
<span className="text-xs text-gray-500">        // Small/meta
```

### Component Patterns

#### Page Layout
```tsx
<div className="min-h-screen bg-black">
    {/* Hero Section */}
    <section className="relative pt-32 pb-16 px-4 sm:px-6">
        {/* Subtle glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="relative max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-white/10 bg-white/5">
                <Icon className="w-4 h-4 text-orange-500" />
                <span className="text-sm text-gray-400">Badge Text</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6">
                Main Title
                <span className="text-orange-500"> Accent</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10">
                Description text here.
            </p>
        </div>
    </section>

    {/* Content Section */}
    <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-20">
        {/* Content */}
    </section>
</div>
```

#### Cards
```tsx
// Standard Card
<div className="rounded-xl border border-white/10 bg-white/[0.02] p-6 hover:border-orange-500/30 transition-colors">
    {/* Content */}
</div>

// Interactive Card
<a className="block rounded-xl border border-white/10 bg-white/[0.02] p-6 hover:border-orange-500/30 hover:bg-white/[0.04] transition-all group">
    <h3 className="text-white group-hover:text-orange-400 transition-colors">Title</h3>
</a>
```

#### Buttons
```tsx
// Primary Button
<button className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors">
    Button Text
</button>

// Secondary Button
<button className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 hover:border-white/40 text-white font-medium rounded-lg transition-colors hover:bg-white/5">
    Button Text
</button>
```

#### Inputs
```tsx
// Text Input
<input
    type="text"
    placeholder="Placeholder..."
    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:border-orange-500/50 focus:outline-none transition-colors"
/>

// Select
<select className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-orange-500/50 focus:outline-none transition-colors">
    <option className="bg-neutral-900">Option</option>
</select>
```

#### Badges/Tags
```tsx
// Difficulty Badge
<span className="text-xs px-2 py-1 rounded border bg-green-500/20 text-green-400 border-green-500/30">Beginner</span>
<span className="text-xs px-2 py-1 rounded border bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Intermediate</span>
<span className="text-xs px-2 py-1 rounded border bg-red-500/20 text-red-400 border-red-500/30">Advanced</span>

// Skill Tag
<span className="text-xs px-2 py-1 bg-white/5 text-gray-400 rounded">Skill Name</span>

// Free Badge
<span className="text-xs text-green-400 bg-green-500/10 px-2 py-0.5 rounded">Free</span>
```

---

## 📋 Features & Checklist

### Homepage
- [x] Hero section with CTA
- [x] Features section
- [x] Tools preview section
- [x] Content section
- [x] Footer
- [x] SEO metadata
- [x] Structured data (JSON-LD)
- [ ] Testimonials section
- [ ] Newsletter signup
- [ ] Recent blog posts

### Navbar
- [x] Logo + brand name
- [x] Desktop navigation
- [x] Mobile menu
- [x] Resources dropdown
- [x] Discord CTA button
- [x] Scroll effect (blur on scroll)
- [ ] User authentication (login/signup)
- [ ] User avatar dropdown
- [ ] Notifications

### Tools (`/tools`)
- [x] Tools listing page
- [x] Search functionality
- [x] Tool cards with status
- [x] JWT Analyzer
- [x] Encoder/Decoder
- [x] Google Dork Generator
- [x] Subdomain Finder
- [x] Password Generator
- [x] Hash Analyzer
- [x] IP Lookup
- [x] WHOIS Lookup
- [x] DNS Lookup
- [ ] Port Scanner (info only)
- [ ] CVE Search
- [ ] Exploit DB Search

### Cheatsheets (`/cheatsheets`)
- [x] Cheatsheets listing page
- [x] Search & filter
- [x] Linux Commands cheatsheet
- [x] Networking cheatsheet
- [ ] Web Security cheatsheet
- [ ] Privilege Escalation cheatsheet
- [x] Reverse Shells cheatsheet
- [x] SQL Injection cheatsheet
- [x] XSS cheatsheet
- [ ] OSINT cheatsheet
- [ ] Download as PDF

### Roadmaps (`/roadmaps`)
- [x] Roadmaps listing page
- [x] Search & filter
- [x] Backend API integration
- [x] Fallback data
- [x] Step-by-step view
- [x] Resource links
- [ ] Progress tracking (requires auth)
- [ ] Bookmark roadmaps
- [ ] User-submitted roadmaps

### Authentication
- [x] Login page
- [x] Register page
- [x] Forgot password
- [ ] Email verification
- [ ] OAuth (Google, GitHub)
- [ ] Protected routes
- [x] Auth context/provider

### User Profile
- [x] Profile page (`/profile`)
- [x] Edit profile (name, username)
- [x] Public profile page (`/user/[username]`)
- [x] Change password
- [ ] Avatar upload
- [ ] User stats
- [ ] Bookmarks
- [ ] Progress tracking
- [ ] Connections/following

### Blog (`/blog`)
- [x] Blog listing page
- [x] Blog post page
- [x] Categories/tags
- [x] Search
- [ ] Comments
- [ ] Like/bookmark
- [x] Share functionality
- [x] Author profile

### CTF Platform
- [ ] Challenge model & CRUD
- [ ] Challenge listing page
- [ ] Challenge detail page
- [ ] Flag submission
- [ ] Hints system (with point deduction)
- [ ] Writeups (unlock after solve)
- [ ] TryHackMe integration
- [ ] Team support
- [ ] Leaderboards

### Security Labs
- [ ] Lab model & CRUD
- [ ] Lab listing page
- [ ] Docker container management
- [ ] Web vulnerability labs (XSS, SQLi, SSRF, etc.)
- [ ] Code review exercises
- [ ] Guided walkthroughs
- [ ] Progress tracking

### Code Review (`/code-review`) ✅ PHASE 1 COMPLETE
**Implemented Features:**
- [x] Snippet data structure with TypeScript interfaces
- [x] Listing page with category filters & search
- [x] Detail page with interactive code display
- [x] "Show Issue" button - highlights vulnerable lines
- [x] "Inject Payload" toggle - shows attack in action
- [x] Secure + payload showing how attack is blocked
- [x] Attack scenario, hints, technical details panels

**Snippets Status (14 implemented):**

| Category | Easy | Medium | Hard |
|----------|:----:|:------:|:----:|
| **SQL Injection** | ✅ Login Bypass | ✅ ORDER BY | ✅ Second-Order |
| **XSS** | ✅ Reflected | ✅ Stored | ✅ DOM-based |
| **SSRF** | ✅ Image Proxy | ✅ Link Preview | ⬜ DNS Rebind |
| **IDOR** | ✅ Invoice API | ✅ User Data | ⬜ Mass Assignment |
| **Command Injection** | ⬜ | ✅ Ping | ⬜ PDF Generator |
| **Path Traversal** | ✅ File Download | ⬜ | ⬜ |
| **Cryptography** | ✅ MD5 Hash | ⬜ Weak Random | ⬜ |
| **Authentication** | ⬜ | ⬜ | ✅ JWT None Alg |

**Pending Snippets:**
- [ ] Command Injection Easy/Hard
- [ ] SSRF DNS Rebinding (Hard)
- [ ] IDOR Mass Assignment (Hard)
- [ ] Path Traversal Medium/Hard
- [ ] Crypto Medium (Weak Random)
- [ ] Deserialization (all levels)
- [ ] XXE (all levels)
- [ ] Open Redirect (all levels)

### Events (`/events`) ✅ COMPLETE

**Data Model:**
```javascript
Event {
  // Core Info
  title: String,              // "HackTheBox CTF 2024"
  slug: String,               // "hackthebox-ctf-2024" (auto-generated)
  description: String,        // Rich text/markdown
  shortDescription: String,   // For cards (max 150 chars)
  
  // Media
  image: String,              // Cover image URL
  bannerImage: String,        // Optional hero banner
  
  // Timing
  startDate: Date,            // Event start
  endDate: Date,              // Event end
  timezone: String,           // "Asia/Kolkata"
  isAllDay: Boolean,          // For multi-day events
  
  // Location
  locationType: Enum,         // "online" | "in-person" | "hybrid"
  location: String,           // Physical address or "Online"
  venue: String,              // "Discord Server" or "Tech Park Auditorium"
  
  // Links
  eventLink: String,          // Main event URL
  registrationLink: String,   // Sign-up URL
  streamLink: String,         // Live stream URL
  recordingLink: String,      // Post-event recording
  
  // Category & Tags
  category: Enum,             // "ctf" | "webinar" | "workshop" | "meetup" | "conference" | "hackathon"
  tags: [String],             // ["beginner-friendly", "web-security", "pwn"]
  
  // Organizer
  organizer: String,          // "TheCyberHub" or external org name
  organizerLogo: String,      // Logo URL
  speakers: [{                // For webinars/workshops
    name: String,
    title: String,
    avatar: String,
    linkedin: String
  }],
  
  // Status & Settings
  status: Enum,               // "upcoming" | "live" | "ended" | "cancelled"
  isFeatured: Boolean,        // Show on homepage
  maxParticipants: Number,    // Optional capacity limit
  registeredCount: Number,    // Current registrations
  
  // Meta
  createdBy: ObjectId,        // Admin user
  createdAt: Date,
  updatedAt: Date
}
```

**Frontend Pages:**
- [x] `/events` - Listing page with filters (category, date, status)
- [x] `/events/[slug]` - Event detail page
- [ ] `/events/calendar` - Calendar view (month/week)
- [x] Add to Calendar button (Google, Apple, Outlook, ICS)

**Backend API:**
- [x] `GET /api/events` - List events (filterable, paginated)
- [x] `GET /api/events/:slug` - Get single event
- [x] `POST /api/events` - Create event (admin)
- [x] `PUT /api/events/:id` - Update event (admin)
- [x] `DELETE /api/events/:id` - Delete event (admin)
- [x] `GET /api/events/upcoming` - Next 5 upcoming events
- [ ] `GET /api/events/calendar` - Events in date range

**Features:**
- [x] Event cards with countdown timer
- [x] Category badges with icons
- [ ] Responsive calendar view
- [x] "Add to Calendar" dropdown (generates ICS)
- [ ] Past events archive
- [x] Featured events carousel on homepage

### Community
- [ ] Discord integration
- [ ] Points system
- [ ] Badges/achievements
- [ ] User leaderboard
- [ ] Forum/discussions

### Admin Dashboard
- [ ] Admin layout
- [ ] User management
- [ ] Content management
- [ ] Analytics
- [ ] Settings

---

## 🔌 Backend API Endpoints

Base URL: `https://api.thecyberhub.org`

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/users/register` | Register new user |
| POST | `/api/users/login` | Login user |
| GET | `/api/users/me` | Get current user |
| PUT | `/api/users/update` | Update user |
| POST | `/api/users/forgot-password` | Forgot password |
| POST | `/api/users/reset-password` | Reset password |

### Resources
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/resources` | Get all resources |
| GET | `/api/resources/:title` | Get resource by name |

### Blogs
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/blogs` | Get all blogs |
| GET | `/api/blogs/:id` | Get blog by ID |
| POST | `/api/blogs` | Create blog (auth) |
| PUT | `/api/blogs/:id` | Update blog (auth) |
| DELETE | `/api/blogs/:id` | Delete blog (auth) |

### Tools
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tool` | Get all tools |
| POST | `/api/tool/:toolname` | Use tool |

---

## 🚀 Development Workflow

### Before Building a New Page

1. **Check this document** for UI patterns
2. **Use existing components** when possible
3. **Follow the color palette** strictly
4. **Test on mobile** (responsive design)
5. **Add to checklist** when complete

### Code Standards

```tsx
// File structure for pages
"use client"  // Only if needed

import React, { useState, useEffect } from 'react';
import { Icon1, Icon2 } from 'lucide-react';

const PageName = () => {
    // State
    const [state, setState] = useState();

    // Effects
    useEffect(() => {}, []);

    // Handlers
    const handleAction = () => {};

    // Render
    return (
        <div className="min-h-screen bg-black">
            {/* Sections */}
        </div>
    );
};

export default PageName;
```

### Git Commit Convention

```
feat: add new feature
fix: bug fix
style: UI/styling changes
refactor: code refactoring
docs: documentation
chore: maintenance
```

---

## 📱 Responsive Breakpoints

| Breakpoint | Width | Usage |
|------------|-------|-------|
| `sm` | 640px | Mobile landscape |
| `md` | 768px | Tablet |
| `lg` | 1024px | Desktop |
| `xl` | 1280px | Large desktop |

### Common Responsive Patterns

```tsx
// Text sizing
className="text-4xl sm:text-5xl md:text-6xl"

// Grid columns
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"

// Padding
className="px-4 sm:px-6 lg:px-8"

// Show/hide
className="hidden md:flex"  // Hide on mobile
className="md:hidden"       // Show only on mobile
```

---

## 🔧 Environment Variables

```env
# .env.local
NEXT_PUBLIC_API_URL=https://api.thecyberhub.org
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

---

## 📝 Notes

- All pages use `bg-black` as base background
- Orange (`orange-500`) is the primary accent color
- Use `white/10` opacity for borders, `white/5` for subtle backgrounds
- Icons from `lucide-react` only
- All external links should have `target="_blank" rel="noopener noreferrer"`
- Use semantic HTML (`section`, `article`, `nav`, etc.)

---

*Last updated: December 2024*
