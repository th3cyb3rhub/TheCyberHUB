import React from 'react';
import {
    ServicesContainer,
    ServicesH1,
    ServicesWrapper,
    ServicesCard,
    ServicesIcon,
    ServicesH2,
    ServicesP,
} from './ServicesElements'

import Icon1 from '../../../assets/images/Servies/undraw_video_files_fu10.svg';
import Icon2 from '../../../assets/images/Servies/undraw_community_re_cyrm.svg';
import Icon3 from '../../../assets/images/Servies/undraw_version_control_re_mg66.svg';
import {ScrollText} from "./ServicesElements";

const Services = () => {
    return (
        <ServicesContainer id="services">
            <ServicesH1>Our Services</ServicesH1>
            <ServicesWrapper>
                <ScrollText to={"courses"} smooth={true} duration={500} spy={true} exact={"true"} offset={-80}>
                    <ServicesCard>
                        <ServicesIcon src={Icon1}/>
                        <ServicesH2>Free Courses</ServicesH2>
                        <ServicesP>Free courses that will help you to start with cyber security.</ServicesP>
                    </ServicesCard>
                </ScrollText>

                <ScrollText to={"community"} smooth={true} duration={500} spy={true} exact={"true"} offset={-80}>
                    <ServicesCard>
                        <ServicesIcon src={Icon2}/>
                        <ServicesH2>Community Support</ServicesH2>
                        <ServicesP>We have a Cyber-security community.</ServicesP>
                    </ServicesCard>
                </ScrollText>

                <ScrollText to={"contribute"} smooth={true} duration={500} spy={true} exact={"true"} offset={-80}>
                    <ServicesCard>
                        <ServicesIcon src={Icon3}/>
                        <ServicesH2>Open Source</ServicesH2>
                        <ServicesP>We have open-source projects, where you can contribute to it.</ServicesP>
                    </ServicesCard>
                </ScrollText>
            </ServicesWrapper>
        </ServicesContainer>
    );
};

export default Services;
