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

const ResourcesSidebar = ({isOpen, toggle}) => {
    return (
        <SidebarContainer isOpen={isOpen} onClick={toggle}>
            <Icon onClick={toggle}>
                <CloseIcon/>
            </Icon>
            <SidebarWrapper>
                <SidebarMenu>
                    <SidebarLink to={"events"}>Home</SidebarLink>
                    <SidebarLink to={"events"}>Courses</SidebarLink>
                    <SidebarLink to={"events"}>WriteUps</SidebarLink>
                    <SidebarLink to={"events"}>Events</SidebarLink>
                    <SidebarLink to={"events"}>Jobs</SidebarLink>
                </SidebarMenu>
                <SideBtnWrap>
                    <SidebarRoute to={"/subscribe"}>
                        Subscribe
                    </SidebarRoute>
                </SideBtnWrap>
            </SidebarWrapper>
        </SidebarContainer>
    );
};

export default ResourcesSidebar;