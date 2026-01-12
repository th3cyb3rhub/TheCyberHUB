'use client';

import { Badge } from '@/components/ui/badge';
import type { ExpertiseArea } from '@/lib/mentorship/types';

interface ExpertiseBadgeProps {
    area: ExpertiseArea;
    size?: 'sm' | 'md';
    showIcon?: boolean;
}

const expertiseConfig: Record<ExpertiseArea, { label: string; color: string; icon: string }> = {
    'web-security': { label: 'Web Security', color: 'bg-blue-500/10 text-blue-600 border-blue-500/20', icon: '🌐' },
    'network-security': { label: 'Network Security', color: 'bg-green-500/10 text-green-600 border-green-500/20', icon: '🔌' },
    'malware-analysis': { label: 'Malware Analysis', color: 'bg-red-500/10 text-red-600 border-red-500/20', icon: '🦠' },
    'forensics': { label: 'Forensics', color: 'bg-purple-500/10 text-purple-600 border-purple-500/20', icon: '🔍' },
    'osint': { label: 'OSINT', color: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20', icon: '🕵️' },
    'cryptography': { label: 'Cryptography', color: 'bg-indigo-500/10 text-indigo-600 border-indigo-500/20', icon: '🔐' },
    'reverse-engineering': { label: 'Reverse Engineering', color: 'bg-orange-500/10 text-orange-600 border-orange-500/20', icon: '⚙️' },
    'cloud-security': { label: 'Cloud Security', color: 'bg-cyan-500/10 text-cyan-600 border-cyan-500/20', icon: '☁️' },
    'mobile-security': { label: 'Mobile Security', color: 'bg-pink-500/10 text-pink-600 border-pink-500/20', icon: '📱' },
    'career-guidance': { label: 'Career Guidance', color: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20', icon: '🎯' },
    'ctf-training': { label: 'CTF Training', color: 'bg-amber-500/10 text-amber-600 border-amber-500/20', icon: '🏁' },
    'pentesting': { label: 'Pentesting', color: 'bg-rose-500/10 text-rose-600 border-rose-500/20', icon: '🔓' },
};

export function ExpertiseBadge({ area, size = 'md', showIcon = true }: ExpertiseBadgeProps) {
    const config = expertiseConfig[area];

    return (
        <Badge
            variant="outline"
            className={`${config.color} ${size === 'sm' ? 'text-xs px-1.5 py-0' : 'text-xs px-2 py-0.5'}`}
        >
            {showIcon && <span className="mr-1">{config.icon}</span>}
            {config.label}
        </Badge>
    );
}

export function getExpertiseLabel(area: ExpertiseArea): string {
    return expertiseConfig[area]?.label || area;
}

export function getExpertiseIcon(area: ExpertiseArea): string {
    return expertiseConfig[area]?.icon || '📚';
}

export const EXPERTISE_OPTIONS: { value: ExpertiseArea; label: string }[] = Object.entries(expertiseConfig).map(
    ([value, { label }]) => ({ value: value as ExpertiseArea, label })
);
