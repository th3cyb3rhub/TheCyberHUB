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
} from './SidebarElements';

const Sidebar = ({isOpen, toggle}) => {
    return (
        <SidebarContainer isOpen={isOpen} onClick={toggle}>
            <Icon onClick={toggle}>
                <CloseIcon/>
            </Icon>
            <SidebarWrapper>
                <SidebarMenu>
                    <SidebarLink to={"about"}>About</SidebarLink>
                    <SidebarLink to={"courses"}>Courses</SidebarLink>
                    <SidebarLink to={"services"}>Services</SidebarLink>
                    <SidebarLink to={"contribute"}>Contribute</SidebarLink>
                    <SidebarLink to={"community"}>Community</SidebarLink>
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

export default Sidebar;