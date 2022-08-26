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
} from './PrepSidebarElements';

const PrepSidebar = ({isOpen, toggle}) => {
    return (
        <SidebarContainer isOpen={isOpen} onClick={toggle}>
            <Icon onClick={toggle}>
                <CloseIcon/>
            </Icon>
            <SidebarWrapper>
                <SidebarMenu>
                    <SidebarLink to={"interviewQuestions"}>Interview Questions</SidebarLink>
                    <SidebarLink to={"interviewExperiences"}>Interview Experiences</SidebarLink>
                    <SidebarLink to={"quiz"}>Quiz</SidebarLink>
                    <SidebarLink to={"jobs"}>Intern / Jobs</SidebarLink>
                </SidebarMenu>
            </SidebarWrapper>
        </SidebarContainer>
    );
};

export default PrepSidebar;