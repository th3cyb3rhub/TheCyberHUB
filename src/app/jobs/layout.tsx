import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Browse Jobs - TheCyberHub',
    description: 'Find cybersecurity jobs, penetration testing roles, SOC analyst positions, and more security career opportunities on TheCyberHub.',
    openGraph: {
        title: 'Cybersecurity Jobs - TheCyberHub',
        description: 'Browse the latest cybersecurity job listings from top organizations.',
        type: 'website',
    },
};

export default function JobsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
