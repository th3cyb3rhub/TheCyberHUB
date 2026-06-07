import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Notifications | TheCyberHub',
    description: 'Stay up to date with replies, mentions, badges, and activity on TheCyberHub.',
    robots: { index: false, follow: false },
};

export default function NotificationsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
