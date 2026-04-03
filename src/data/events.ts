export interface Speaker {
    name: string;
    title: string;
    bio?: string;
    avatar?: string;
    linkedin?: string;
    twitter?: string;
    github?: string;
    website?: string;
}

export interface EventFeedback {
    user: { username: string; name?: string; avatar?: string };
    rating: number;
    comment: string;
    submittedAt: string;
}

export interface Event {
    id: string;
    title: string;
    slug: string;
    description: string;
    shortDescription: string;
    image: string;
    bannerImage?: string;
    startDate: string;
    endDate?: string;
    timezone: string;
    locationType: 'online' | 'in-person' | 'hybrid';
    location: string;
    venue?: string;
    eventLink?: string;
    registrationLink?: string;
    category: 'ctf' | 'webinar' | 'workshop' | 'meetup' | 'conference' | 'hackathon';
    tags: string[];
    organizer: string;
    organizerLogo?: string;
    speakers?: Speaker[];
    status: 'upcoming' | 'live' | 'ended' | 'cancelled';
    isFeatured: boolean;
    // Archive fields (past events)
    recordingLink?: string;
    slidesLink?: string;
    summaryNotes?: string;
    // Feedback
    feedback?: EventFeedback[];
}

export const sampleEvents: Event[] = [
    {
        id: '1',
        title: 'Web Security Fundamentals Workshop',
        slug: 'web-security-fundamentals-workshop',
        description: `Join us for an in-depth workshop covering the fundamentals of web security. 

## What You'll Learn
- OWASP Top 10 vulnerabilities
- XSS, SQL Injection, and CSRF attacks
- Secure coding practices
- Hands-on labs with real examples

## Prerequisites
- Basic understanding of HTML/JavaScript
- Laptop with browser

## Instructor
Led by experienced security professionals from TheCyberHub team.`,
        shortDescription: 'Learn web security basics with hands-on labs covering OWASP Top 10 vulnerabilities.',
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800',
        startDate: '2024-12-15T14:00:00+05:30',
        endDate: '2024-12-15T17:00:00+05:30',
        timezone: 'Asia/Kolkata',
        locationType: 'online',
        location: 'Online',
        venue: 'Discord Server',
        eventLink: 'https://discord.gg/thecyberhub',
        registrationLink: 'https://forms.gle/example',
        category: 'workshop',
        tags: ['beginner-friendly', 'web-security', 'owasp'],
        organizer: 'TheCyberHub',
        status: 'upcoming',
        isFeatured: true,
    },
    {
        id: '2',
        title: 'HackTheBox CTF - Winter Edition',
        slug: 'hackthebox-ctf-winter-2024',
        description: `48-hour Capture The Flag competition with challenges across multiple categories.

## Categories
- Web Exploitation
- Binary Exploitation (PWN)
- Reverse Engineering
- Cryptography
- Forensics
- OSINT

## Prizes
- 1st Place: $500 + Swag
- 2nd Place: $250 + Swag
- 3rd Place: $100 + Swag

## Rules
- Teams of up to 4 members
- No automated tools for flag submission
- Have fun and learn!`,
        shortDescription: '48-hour CTF competition with Web, PWN, RE, Crypto, and Forensics challenges.',
        image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800',
        startDate: '2024-12-20T18:00:00+05:30',
        endDate: '2024-12-22T18:00:00+05:30',
        timezone: 'Asia/Kolkata',
        locationType: 'online',
        location: 'Online',
        venue: 'CTFd Platform',
        eventLink: 'https://ctf.thecyberhub.org',
        registrationLink: 'https://ctf.thecyberhub.org/register',
        category: 'ctf',
        tags: ['ctf', 'competition', 'prizes', 'team'],
        organizer: 'TheCyberHub',
        status: 'upcoming',
        isFeatured: true,
    },
    {
        id: '3',
        title: 'Bug Bounty Hunting Masterclass',
        slug: 'bug-bounty-hunting-masterclass',
        description: `Learn the art of bug bounty hunting from experienced hunters.

## Topics Covered
- Setting up your hunting environment
- Reconnaissance techniques
- Finding vulnerabilities in real applications
- Writing effective reports
- Getting paid for your findings

## Speaker
**John Doe** - Top 50 HackerOne researcher with $100k+ in bounties`,
        shortDescription: 'Learn bug bounty hunting from experienced hunters with live demonstrations.',
        image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800',
        startDate: '2024-12-28T19:00:00+05:30',
        endDate: '2024-12-28T21:00:00+05:30',
        timezone: 'Asia/Kolkata',
        locationType: 'online',
        location: 'Online',
        venue: 'YouTube Live',
        eventLink: 'https://youtube.com/thecyberhub',
        category: 'webinar',
        tags: ['bug-bounty', 'live', 'intermediate'],
        organizer: 'TheCyberHub',
        speakers: [
            {
                name: 'John Doe',
                title: 'Security Researcher',
                linkedin: 'https://linkedin.com/in/johndoe',
            }
        ],
        status: 'upcoming',
        isFeatured: false,
    },
    {
        id: '4',
        title: 'Delhi Security Meetup #12',
        slug: 'delhi-security-meetup-12',
        description: `Monthly security meetup for professionals and enthusiasts in Delhi NCR.

## Agenda
- 6:00 PM - Networking & Refreshments
- 6:30 PM - Talk 1: "Cloud Security Best Practices"
- 7:15 PM - Talk 2: "Introduction to Malware Analysis"
- 8:00 PM - Open Discussion & Q&A
- 8:30 PM - Wrap up

## Venue
TechHub Coworking, Connaught Place, New Delhi`,
        shortDescription: 'Monthly in-person meetup for security professionals in Delhi NCR.',
        image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
        startDate: '2025-01-10T18:00:00+05:30',
        endDate: '2025-01-10T20:30:00+05:30',
        timezone: 'Asia/Kolkata',
        locationType: 'in-person',
        location: 'TechHub Coworking, Connaught Place, New Delhi',
        venue: 'TechHub Coworking',
        registrationLink: 'https://meetup.com/delhi-security',
        category: 'meetup',
        tags: ['networking', 'talks', 'delhi'],
        organizer: 'TheCyberHub',
        status: 'upcoming',
        isFeatured: false,
    },
    {
        id: '5',
        title: 'CyberCon India 2025',
        slug: 'cybercon-india-2025',
        description: `India's largest cybersecurity conference bringing together professionals, researchers, and enthusiasts.

## Highlights
- 50+ Speakers
- Hands-on Workshops
- CTF Competition
- Career Fair
- Networking Events

## Tracks
- Offensive Security
- Defensive Security
- Cloud & DevSecOps
- Career Development`,
        shortDescription: "India's largest cybersecurity conference with 50+ speakers and hands-on workshops.",
        image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800',
        bannerImage: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1600',
        startDate: '2025-02-15T09:00:00+05:30',
        endDate: '2025-02-16T18:00:00+05:30',
        timezone: 'Asia/Kolkata',
        locationType: 'hybrid',
        location: 'Bangalore International Exhibition Centre',
        venue: 'BIEC, Bangalore',
        eventLink: 'https://cybercon.in',
        registrationLink: 'https://cybercon.in/register',
        category: 'conference',
        tags: ['conference', 'networking', 'speakers', 'workshops'],
        organizer: 'CyberCon India',
        organizerLogo: 'https://cybercon.in/logo.png',
        status: 'upcoming',
        isFeatured: true,
    },
    {
        id: '6',
        title: 'Python for Security Automation',
        slug: 'python-security-automation',
        description: `2-day intensive hackathon focused on building security automation tools.

## Challenge
Build a security tool using Python that solves a real-world problem.

## Categories
- Vulnerability Scanners
- Log Analysis Tools
- Threat Intelligence
- Incident Response

## Prizes
Best projects will be featured on TheCyberHub!`,
        shortDescription: '2-day hackathon to build security automation tools using Python.',
        image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800',
        startDate: '2025-01-25T10:00:00+05:30',
        endDate: '2025-01-26T22:00:00+05:30',
        timezone: 'Asia/Kolkata',
        locationType: 'online',
        location: 'Online',
        venue: 'Discord Server',
        eventLink: 'https://discord.gg/thecyberhub',
        registrationLink: 'https://forms.gle/hackathon',
        category: 'hackathon',
        tags: ['python', 'automation', 'hackathon', 'tools'],
        organizer: 'TheCyberHub',
        status: 'upcoming',
        isFeatured: false,
    }
];

export const eventCategories = [
    { id: 'ctf', name: 'CTF', icon: 'Flag', color: 'red' },
    { id: 'webinar', name: 'Webinar', icon: 'Video', color: 'blue' },
    { id: 'workshop', name: 'Workshop', icon: 'Wrench', color: 'green' },
    { id: 'meetup', name: 'Meetup', icon: 'Users', color: 'purple' },
    { id: 'conference', name: 'Conference', icon: 'Building', color: 'orange' },
    { id: 'hackathon', name: 'Hackathon', icon: 'Code', color: 'yellow' },
];
