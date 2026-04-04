import { Metadata } from 'next';

type Props = {
    params: Promise<{ slug: string }>
};

export async function generateMetadata(
    { params }: Props,
): Promise<Metadata> {
    const { slug } = await params;

    try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        const response = await fetch(`${apiUrl}/api/challenges/${slug}`, { next: { revalidate: 60 } });
        const data = await response.json();

        if (data?.data) {
            const challenge = data.data;
            const desc = challenge.shortDescription || challenge.description?.substring(0, 160) || `Solve the ${challenge.title} CTF challenge on TheCyberHub.`;
            return {
                title: `${challenge.title} – CTF Challenge | TheCyberHub`,
                description: desc,
                openGraph: {
                    title: `${challenge.title} – ${challenge.difficulty} ${challenge.category} CTF`,
                    description: desc,
                    type: 'website',
                },
                twitter: {
                    card: 'summary',
                    title: `${challenge.title} – CTF Challenge`,
                    description: desc,
                }
            };
        }
    } catch (error) {
        console.error('CTF Metadata fetch error:', error);
    }

    return {
        title: 'CTF Challenge | TheCyberHub',
        description: 'Solve cybersecurity CTF challenges on TheCyberHub.'
    };
}

export default function ChallengeLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
