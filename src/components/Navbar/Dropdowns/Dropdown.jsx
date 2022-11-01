import React from "react";
import {
    DropdownDesc,
    DropdownItem,
    DropdownContainer,
    DropdownRouterLink,
    DropdownItemContainer,
    DropdownItemsContainer,
} from "./DropdownElements";

export default function Dropdown({ isOpen, toggle, closed, isResources, isLearn }) {
    const learn = [
        {
            title: "Roadmap",
            url: "/learn/roadmaps",
            desc: "Step by step guide to becoming a cybersecurity professional",
        },
        { title: "Courses", url: "/learn/courses", desc: "Learn from the best courses on the internet" },
        { title: "Blogs", url: "/learn/blogs", desc: "Learn from the best blogs on the internet" },
    ];

    const resources = [
        { title: "Jobs", url: "/resources/jobs", desc: "Find your dream job" },
        { title: "Quiz", url: "/resources/quiz", desc: "Test your knowledge" },
        { title: "Interview Questions", url: "/resources/interviewQuestions", desc: "Prepare for your interview" },
        { title: "News", url: "/resources/cyberNews", desc: "Stay up to date with the latest news" },
    ];

    return (
        closed && (
            <DropdownContainer isOpen={isOpen}>
                <DropdownItemsContainer>
                    {isLearn === true &&
                        learn.map((i, id) => (
                            <DropdownItemContainer key={id}>
                                <DropdownRouterLink to={i.url} onClick={() => toggle(false)}>
                                    <DropdownItem> {i.title} </DropdownItem>
                                    <DropdownDesc> {i.desc} </DropdownDesc>
                                </DropdownRouterLink>
                            </DropdownItemContainer>
                        ))}
                    {isResources === true &&
                        resources.map((i, id) => (
                            <DropdownItemContainer key={id}>
                                <DropdownRouterLink to={i.url} onClick={() => toggle(false)}>
                                    <DropdownItem> {i.title} </DropdownItem>
                                    <DropdownDesc> {i.desc} </DropdownDesc>
                                </DropdownRouterLink>
                            </DropdownItemContainer>
                        ))}
                </DropdownItemsContainer>
            </DropdownContainer>
        )
    );
}
