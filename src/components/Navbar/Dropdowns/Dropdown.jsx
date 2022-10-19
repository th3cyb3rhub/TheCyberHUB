import React from "react";
import styled from "styled-components";
import {
    DropdownDesc,
    DropdownItem,
    DropdownContainer,
    DropdownRouterLink, DropdownItemContainer, DropdownItemsContainer,
} from "./DropdownElements";

export default function Dropdown({ isOpen, toggle }) {
    const menu = [
        {title: "Roadmap", url: "/resources/roadmapResources", desc: "Learn about the roadmap of cybersecurity"},
        {title: "Courses", url: "/resources/courses", desc: "Learn about the courses of cybersecurity"},
        {title: "Events", url: "/events", desc: "Learn about the events of cybersecurity"},
        {title: "Blogs", url: "/blogs", desc: "Learn about the blogs of cybersecurity"},
        {title: "News", url: "/resources/cyberNews", desc: "Learn about the news of cybersecurity"},
    ];

    return (
        <DropdownContainer isOpen={isOpen}>
            <DropdownItemsContainer>
                {menu.map((i) =>
                    <DropdownItemContainer>
                        <DropdownRouterLink to={i.url} onClick={toggle}>
                            <DropdownItem> {i.title} </DropdownItem>
                            <DropdownDesc> {i.desc} </DropdownDesc>
                        </DropdownRouterLink>
                    </DropdownItemContainer>
                )}
            </DropdownItemsContainer>
        </DropdownContainer>
    );
}
