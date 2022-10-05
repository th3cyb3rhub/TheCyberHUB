import React, { useState } from 'react';
import Dropdown from '../Dropdowns/Dropdown';
import {DropdownIcon} from "../Navbar/NavbarElements";

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
    const [drop, setDrop] = useState(false);
    return (
        <SidebarContainer isOpen={isOpen}>
            <Icon onClick={toggle}>
                <CloseIcon/>
            </Icon>
            <SidebarWrapper>
                <SidebarMenu>
                    <SidebarLink onClick={()=>setDrop(!drop)} to={"resources"}>Learn <DropdownIcon/> </SidebarLink>                    {drop && <Dropdown sidebar={true} />}
                    <SidebarLink onClick={toggle} to={"events"}>Events</SidebarLink>
                    <SidebarLink onClick={toggle} to={"blogs"}>Blogs</SidebarLink>
                    <SidebarLink onClick={toggle} to={"community"}>Community</SidebarLink>
                    <SidebarLink onClick={toggle} to={"about"}>About</SidebarLink>
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