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
                    <SidebarLink onClick={toggle} to={"about"}>About</SidebarLink>
                    <SidebarLink onClick={toggle} to={"resources"}>Resources</SidebarLink>
                    <SidebarLink onClick={toggle} to={"contribute"}>Contribute</SidebarLink>
                    <SidebarLink onClick={toggle} to={"community"}>Community</SidebarLink>
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