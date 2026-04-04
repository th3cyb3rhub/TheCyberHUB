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
        const response = await fetch(`${apiUrl}/api/companies/public/${slug}`, { next: { revalidate: 60 } });
        const data = await response.json();

        if (data?.data) {
            const company = data.data;
            return {
                title: `${company.name} Careers & Security Jobs | TheCyberHub`,
                description: company.description?.substring(0, 160) || `Explore career opportunities and open cybersecurity roles at ${company.name}.`,
                openGraph: {
                    title: `${company.name} Careers on TheCyberHub`,
                    description: company.description?.substring(0, 160) || `Explore career opportunities and open cybersecurity roles at ${company.name}.`,
                    images: company.logo ? [{ url: company.logo }] : [],
                    type: 'website',
                },
                twitter: {
                    card: 'summary_large_image',
                    title: `${company.name} Careers & Security Jobs`,
                    description: company.description?.substring(0, 160) || `Explore career opportunities and open cybersecurity roles at ${company.name}.`,
                    images: company.logo ? [company.logo] : [],
                }
            };
        }
    } catch (error) {
        console.error('Metadata fetch error:', error);
    }

    return {
        title: 'Company Profile | TheCyberHub',
        description: 'View company profiles and cybersecurity job openings on TheCyberHub.'
    };
}

export default function CompanyLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
