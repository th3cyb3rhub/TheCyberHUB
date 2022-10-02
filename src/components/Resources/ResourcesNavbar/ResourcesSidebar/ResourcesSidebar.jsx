import React from 'react';

import {
    SidebarContainer,
    Icon,
    CloseIcon,
    SidebarWrapper,
    SidebarLink,
    SidebarMenu,
    SideBtnWrap,
    SidebarRoute
} from './ResourcesSidebarElements';
import {RedirectButton} from "../../../MixComponents/Buttons/ButtonElements";
import {FaTwitter, FaYoutube} from "react-icons/fa";
import {Text} from "../ResourcesNavbarElements";

const ResourcesSidebar = ({isOpen, toggle}) => {
    return (
        <SidebarContainer isOpen={isOpen} onClick={toggle}>
            <Icon onClick={toggle}>
                <CloseIcon/>
            </Icon>
            <SidebarWrapper>
                <SidebarMenu>
                    <SidebarLink to={"roadmapResources"}>Roadmap</SidebarLink>
                    <SidebarLink to={"/prep"}>Prep</SidebarLink>

                    <SidebarLink to={"blogs"}>Blogs</SidebarLink>
                    <SidebarLink to={"cyberNews"}>Cyber News</SidebarLink>
                    <SidebarLink to={"events"}>Events</SidebarLink>
                </SidebarMenu>
                <SideBtnWrap>
                    <RedirectButton
                        href={"https://youtube.com/c/thecyberworld"}
                        rel="noopener"
                        target="_blank"
                        smooth={true}
                        duration={500}
                        spy={true}
                        exact="true"
                        offset={-80}
                    >
                        <FaYoutube/>
                        <Text>
                            Tutorials
                        </Text>
                    </RedirectButton>
                </SideBtnWrap>
            </SidebarWrapper>
        </SidebarContainer>
    );
};

export default ResourcesSidebar;