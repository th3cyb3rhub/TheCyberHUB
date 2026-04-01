import React from "react";

interface PageHeroProps {
    badge?: string;
    badgeIcon?: React.ReactNode;
    title: string;
    highlight?: string;
    description: string;
    centered?: boolean;
    children?: React.ReactNode;
}

const PageHero: React.FC<PageHeroProps> = ({
    badge,
    badgeIcon,
    title,
    highlight,
    description,
    centered = false,
    children,
}) => {
    // Split the title around the highlight word so we can style it
    const renderTitle = () => {
        if (!highlight) {
            return <span>{title}</span>;
        }

        const index = title.toLowerCase().indexOf(highlight.toLowerCase());
        if (index === -1) {
            return (
                <>
                    {title}{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 animate-pulse-slow drop-shadow-[0_0_15px_rgba(249,115,22,0.5)]">
                        {highlight}
                    </span>
                </>
            );
        }

        const before = title.slice(0, index);
        const match = title.slice(index, index + highlight.length);
        const after = title.slice(index + highlight.length);

        return (
            <>
                {before}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 animate-pulse-slow drop-shadow-[0_0_15px_rgba(249,115,22,0.5)]">
                    {match}
                </span>
                {after}
            </>
        );
    };

    return (
        <section className="relative pt-32 pb-12 px-4 sm:px-6">
            {/* Background glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />

            <div
                className={`relative max-w-5xl mx-auto ${centered ? "text-center" : ""}`}
            >
                {/* Badge */}
                {badge && (
                    <div
                        className={`${centered ? "flex justify-center" : ""} mb-6`}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-white/5">
                            {badgeIcon && (
                                <span className="text-orange-500">{badgeIcon}</span>
                            )}
                            <span className="text-sm text-gray-500 dark:text-gray-400">{badge}</span>
                        </div>
                    </div>
                )}

                {/* Title */}
                <h1
                    className={`text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-4 ${centered ? "" : ""}`}
                >
                    {renderTitle()}
                </h1>

                {/* Description */}
                <p
                    className={`text-lg text-gray-600 dark:text-gray-400 mb-8 ${centered ? "max-w-2xl mx-auto" : "max-w-2xl"}`}
                >
                    {description}
                </p>

                {/* Optional children slot for search/filter/stats */}
                {children}
            </div>
        </section>
    );
};

export default PageHero;
