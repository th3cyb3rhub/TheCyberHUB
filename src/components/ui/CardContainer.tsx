import React from "react";

interface CardContainerProps {
    children: React.ReactNode;
    className?: string;
    hover?: boolean;
    onClick?: () => void;
}

const CardContainer: React.FC<CardContainerProps> = ({
    children,
    className = "",
    hover = false,
    onClick,
}) => {
    const baseClasses =
        "rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/[0.02] backdrop-blur-md";

    const hoverClasses = hover
        ? "hover:border-orange-500/40 hover:bg-gradient-to-b hover:from-orange-500/10 hover:to-transparent transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-500/20"
        : "";

    const clickableClasses = onClick ? "cursor-pointer" : "";

    const Component = onClick ? "button" : "div";

    return (
        <Component
            className={`${baseClasses} ${hoverClasses} ${clickableClasses} ${className}`}
            onClick={onClick}
        >
            {children}
        </Component>
    );
};

export default CardContainer;
