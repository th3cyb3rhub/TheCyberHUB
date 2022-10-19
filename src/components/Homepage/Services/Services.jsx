import React from "react";
import {
  ServicesContainer,
  ServicesH1,
  ServicesWrapper,
  ServicesCard,
  ServicesIcon,
  ServicesH2,
  ServicesP,
} from "./ServicesElements";

import Icon1 from "../../../assets/images/Servies/undraw_video_files_fu10.svg";
import Icon2 from "../../../assets/images/Servies/undraw_community_re_cyrm.svg";
import Icon3 from "../../../assets/images/Servies/undraw_version_control_re_mg66.svg";
import Icon4 from "../../../assets/images/open-source-contribution.svg";
import { ScrollText } from "./ServicesElements";

const Services = () => {
  return (
    <ServicesContainer id="services">
      <ServicesH1>Our Focus</ServicesH1>
      <ServicesWrapper>
        <ScrollText to={"contribute"} smooth={true} duration={500} spy={true} exact={"true"} offset={-80}>
          <ServicesCard>
            <ServicesIcon src={Icon4} />
            <ServicesH2>Open Source</ServicesH2>
            <ServicesP>We have many Open Source projects.</ServicesP>
          </ServicesCard>
        </ScrollText>

        <ScrollText to={"contribute"} smooth={true} duration={500} spy={true} exact={"true"} offset={-80}>
          <ServicesCard>
            <ServicesIcon src={Icon3} />
            <ServicesH2>Contribute</ServicesH2>
            <ServicesP>Contribute to the Open Source.</ServicesP>
          </ServicesCard>
        </ScrollText>

        <ScrollText to={"community"} smooth={true} duration={500} spy={true} exact={"true"} offset={-80}>
          <ServicesCard>
            <ServicesIcon src={Icon2} />
            <ServicesH2>Community</ServicesH2>
            <ServicesP>Join Cyber Security and Open Source communities.</ServicesP>
          </ServicesCard>
        </ScrollText>
      </ServicesWrapper>
    </ServicesContainer>
  );
};

export default Services;
