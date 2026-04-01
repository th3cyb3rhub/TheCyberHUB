import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Employer Dashboard - TheCyberHub',
    description: 'Post and manage cybersecurity job listings on TheCyberHub. Reach top security talent across the community.',
    openGraph: {
        title: 'Employer Dashboard - TheCyberHub',
        description: 'Post and manage cybersecurity job listings on TheCyberHub.',
        type: 'website',
    },
};

export default function EmployerLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
