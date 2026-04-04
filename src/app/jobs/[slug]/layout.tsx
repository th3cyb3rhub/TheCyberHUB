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
        const response = await fetch(`${apiUrl}/api/jobs/${slug}`, { next: { revalidate: 60 } });
        const data = await response.json();

        if (data?.data) {
            const job = data.data;
            const companyName = job.companyRef?.name || job.company;
            const logo = job.companyRef?.logo || job.companyLogo;

            return {
                title: `${job.title} at ${companyName} | TheCyberHub`,
                description: job.description?.substring(0, 160) || `Apply for the ${job.title} role at ${companyName} on TheCyberHub.`,
                openGraph: {
                    title: `${job.title} at ${companyName}`,
                    description: job.description?.substring(0, 160) || `Apply for the ${job.title} role at ${companyName} on TheCyberHub.`,
                    images: logo ? [{ url: logo }] : [],
                    type: 'website',
                },
                twitter: {
                    card: 'summary_large_image',
                    title: `${job.title} at ${companyName}`,
                    description: job.description?.substring(0, 160) || `Apply for the ${job.title} role at ${companyName} on TheCyberHub.`,
                    images: logo ? [logo] : [],
                }
            };
        }
    } catch (error) {
        console.error('Metadata fetch error:', error);
    }

    return {
        title: 'Cybersecurity Job Details | TheCyberHub',
        description: 'View detailed cybersecurity job descriptions on TheCyberHub.'
    };
}

export default function JobLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
