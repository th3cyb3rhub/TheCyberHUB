import React from "react";
import { FaDiscord, FaGithub, FaInstagram, FaLinkedinIn, FaTelegramPlane, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

import {
    SectionTitle,
    SocialCardDiscord,
    SocialCardGithub,
    SocialCardInstagram,
    SocialCardLinkedin,
    SocialCardTelegram,
    SocialCardTwitter,
    SocialCardYoutube,
    SocialLabel,
    SocialsContainer,
    SocialsGrid,
    SocialWrapper,
} from "src/components/Homepage/Socials/SocialsElements.jsx";

import * as PropTypes from "prop-types";

SocialsContainer.propTypes = { children: PropTypes.node };
const Socials = () => {
    const socialLinks = [
        {
            Component: SocialCardDiscord,
            Icon: FaDiscord,
            label: "Discord",
            href: "https://discord.com/invite/thecyberhub-799183504759324672",
        },
        {
            Component: SocialCardGithub,
            Icon: FaGithub,
            label: "Github",
            href: "https://www.github.com/th3cyb3rhub",
        },
        {
            Component: SocialCardYoutube,
            Icon: FaYoutube,
            label: "YouTube",
            href: "https://www.youtube.com/@th3cyb3rhub",
        },
        {
            Component: SocialCardLinkedin,
            Icon: FaLinkedinIn,
            label: "LinkedIn",
            href: "https://linkedin.com/company/th3cyb3rhub",
        },
        {
            Component: SocialCardTelegram,
            Icon: FaTelegramPlane,
            label: "Telegram",
            href: "https://t.me/th3cyb3rhub",
        },
        {
            Component: SocialCardTwitter,
            Icon: FaXTwitter,
            label: "Twitter",
            href: "https://www.twitter.com/th3cyb3rhub",
        },
        {
            Component: SocialCardInstagram,
            Icon: FaInstagram,
            label: "Instagram",
            href: "https://www.instagram.com/th3cyb3rhub",
        },
    ];

    return (
        <SocialWrapper>
            <SocialsContainer>
                <SectionTitle>{"COMMUNITY LINKS".toUpperCase()}</SectionTitle>
                <SocialsGrid>
                    {socialLinks.map(({ Component, Icon, label, href }, index) => (
                        <Component key={index} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                            <Icon />
                            <SocialLabel>{label}</SocialLabel>
                        </Component>
                    ))}
                </SocialsGrid>
            </SocialsContainer>
        </SocialWrapper>
    );
};

export default Socials;
