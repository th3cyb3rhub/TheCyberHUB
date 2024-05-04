import React from "react";
import {
    DropdownDesc,
    DropdownItem,
    DropdownContainer,
    DropdownRouterLink,
    DropdownItemContainer,
    DropdownItemsContainer,
} from "./DropdownElements";

export default function Dropdown({
    isOpen,
    toggle,
    isResources,
    isOpportunities,
    toggleDropdown,
    backgroundColor,
    color,
}) {
    const opportunities = [
        {
            title: "Internships",
            to: "/internship",
            desc: "Unlock Your Career Potential: Discover Internship Opportunities to Kickstart Your Journey.",
        },
        {
            title: "OpenSec Projects",
            to: "/opensec-projects",
            desc: "Open Source Projects for Cybersecurity Enthusiasts.",
        },
        {
            title: "TheCyberEvents",
            to: "/community-events",
            desc: "Checkout and Join to our Weekly Cyber Community Events",
        },
        {
            title: "Volunteer",
            to: "/volunteer",
            desc: `Volunteer for Change: \nJoin Our Community Program and Make an Impact.`,
        },
        // {
        //     title: "TheCyberXcel",
        //     to: "/thecyberxcel",
        //     desc: "Learn with community, Project and Resume Reviews, Mock Interviews, and more.",
        // },
        // {
        //     title: "TheCyberSpeak",
        //     to: "/thecyberspeak",
        //     desc: "Engage, Learn, Inspire. Speak or Attend and Be part of our Weekly Cyber Community Event.",
        // },
    ];

    const resources = [
        // { title: "Cyber Security Complete Course", to: "/learning-path", desc: "Learn everything about Cyber Security" },
        { title: "Roadmap", to: "/roadmaps", desc: "Guide to becoming a cybersecurity professional" },
        { title: "Interview Questions", to: "/interviewQuestions", desc: "Prepare for your interview" },
        { title: "Quiz", to: "/quiz", desc: "Test your knowledge" },
        // { title: "Cheat Sheets", to: "/cheatsheets", desc: "Cheat Sheets for quick reference" },
        { title: "Tools", to: "tools", desc: "Tools for your hacking needs" },
        { title: "Community", to: "/community", desc: "Join our community" },
        { title: "Methodology", to: "/resources/methodology", desc: "Test your knowledge" },
        { title: "Victim Help", to: "/victimhelp", desc: "Guidance and Support for Victim" },
        { title: "Support", to: "/support", desc: "Support us" },
        // {title: "News", to: "/cyberNews", desc: "Stay up to date with the latest news"},
    ];

    return (
        toggleDropdown && (
            <DropdownContainer $isOpen={isOpen} style={{ backgroundColor, color }}>
                <DropdownItemsContainer>
                    {isOpportunities === true &&
                        opportunities.map((program, id) => (
                            <DropdownItemContainer key={id}>
                                <DropdownRouterLink to={program.to} onClick={() => toggle(false)}>
                                    <DropdownItem style={{ color }}>{program.title}</DropdownItem>
                                    <DropdownDesc>{program.desc}</DropdownDesc>
                                </DropdownRouterLink>
                            </DropdownItemContainer>
                        ))}
                    {isResources === true &&
                        resources.map((i, id) => (
                            <DropdownItemContainer key={id}>
                                <DropdownRouterLink to={i.to} onClick={() => toggle(false)}>
                                    <DropdownItem style={{ color }}>{i.title}</DropdownItem>
                                    <DropdownDesc> {i.desc} </DropdownDesc>
                                </DropdownRouterLink>
                            </DropdownItemContainer>
                        ))}
                </DropdownItemsContainer>
            </DropdownContainer>
        )
    );
}
