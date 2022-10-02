import React, { useState } from 'react';
import Dropdown from '../Dropdowns/Dropdown';

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
                    <SidebarLink onClick={toggle} to={"about"}>About</SidebarLink>
                    <SidebarLink onClick={()=>setDrop(!drop)} to={"resources"}>Resources</SidebarLink>
                    {drop && <Dropdown sidebar={true} />}
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