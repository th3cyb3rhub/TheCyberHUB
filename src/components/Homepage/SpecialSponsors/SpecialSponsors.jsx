import React from "react";
import { H1 } from "src/components/Homepage/ContactForm/ContactFormElements";
import {
    SponsorsWrapper,
    SponsorsContainer,
    SponsorsLayout,
    SponsorsTopHeader,
    SponsorsH2,
    SponsorsGrid1,
    SponsorsGridColTop,
    SponsorsH1,
    SponsorsGrid2,
    SponsorsGrid3,
    // SponsorsImg,
    SponsorsGridColLast,
    SponsorsGridColHidden,
    SponsorsGridColHiddenSm,
    SponsorsFooterBar,
    SponsorButton,
} from "./SpecialSponsorsElement";

const SpecialSponsors = () => {
    return (
        <SponsorsWrapper>
            <SponsorsContainer>
                <H1>SPONSORS</H1>
                <SponsorsLayout>
                    <SponsorsTopHeader
                        style={{
                            borderRadius: "1rem 1rem 0 0",
                        }}
                    >
                        <SponsorsH2>Special Sponsors</SponsorsH2>
                    </SponsorsTopHeader>
                    <SponsorsGrid1>
                        <SponsorsGridColTop>
                            <SponsorsH1 href={"https://thecyber-sec.com"} target={"_blank"} rel={"noreferrer"}>
                                TheCyberSEC
                            </SponsorsH1>
                        </SponsorsGridColTop>
                        <SponsorsGridColTop>
                            <SponsorsH1 href="">Thecyberworld</SponsorsH1>
                        </SponsorsGridColTop>
                        <SponsorsGridColTop>
                            {/* <SponsorsH1>Thecyberworld</SponsorsH1> */}
                            {/* <SponsorsImg src={tailwind} alt="tailwind"/> */}
                        </SponsorsGridColTop>
                    </SponsorsGrid1>
                    <SponsorsTopHeader>
                        <SponsorsH2>Platinum Sponsors</SponsorsH2>
                    </SponsorsTopHeader>
                    <SponsorsGrid2>
                        {/* After adding text to links, ensure that you remove the Arial label or modify it accordingly as well as hrefs */}
                        <SponsorsGridColTop>
                            <SponsorsH1 href="" aria-label="sponsors link"></SponsorsH1>
                        </SponsorsGridColTop>
                        <SponsorsGridColTop>
                            <SponsorsH1 href="" aria-label="sponsors link"></SponsorsH1>
                        </SponsorsGridColTop>
                        <SponsorsGridColTop>
                            <SponsorsH1 href="" aria-label="sponsors link"></SponsorsH1>
                        </SponsorsGridColTop>
                        <SponsorsGridColTop>
                            <SponsorsH1 href="" aria-label="sponsors link"></SponsorsH1>
                        </SponsorsGridColTop>
                        <SponsorsGridColTop>
                            <SponsorsH1 href="" aria-label="sponsors link"></SponsorsH1>
                        </SponsorsGridColTop>
                        <SponsorsGridColTop>
                            <SponsorsH1 href="" aria-label="sponsors link"></SponsorsH1>
                        </SponsorsGridColTop>
                    </SponsorsGrid2>
                    <SponsorsTopHeader>
                        <SponsorsH2>Gold Sponsors</SponsorsH2>
                    </SponsorsTopHeader>
                    <SponsorsGrid3>
                        <SponsorsGridColLast>
                            <SponsorsH1 href="" aria-label="sponsors link"></SponsorsH1>
                        </SponsorsGridColLast>
                        <SponsorsGridColLast>
                            <SponsorsH1 href="" aria-label="sponsors link"></SponsorsH1>
                        </SponsorsGridColLast>
                        <SponsorsGridColLast>
                            <SponsorsH1 href="" aria-label="sponsors link"></SponsorsH1>
                        </SponsorsGridColLast>
                        <SponsorsGridColLast>
                            <SponsorsH1 href="" aria-label="sponsors link"></SponsorsH1>
                        </SponsorsGridColLast>
                        <SponsorsGridColLast>
                            <SponsorsH1 href="" aria-label="sponsors link"></SponsorsH1>
                        </SponsorsGridColLast>
                        <SponsorsGridColLast>
                            <SponsorsH1 href="" aria-label="sponsors link"></SponsorsH1>
                        </SponsorsGridColLast>
                        <SponsorsGridColHiddenSm>
                            <SponsorsH1 href="" aria-label="sponsors link"></SponsorsH1>
                        </SponsorsGridColHiddenSm>
                        <SponsorsGridColHiddenSm>
                            <SponsorsH1 href="" aria-label="sponsors link"></SponsorsH1>
                        </SponsorsGridColHiddenSm>
                        <SponsorsGridColHidden>
                            <SponsorsH1 href="" aria-label="sponsors link"></SponsorsH1>
                        </SponsorsGridColHidden>
                        <SponsorsGridColHidden>
                            <SponsorsH1 href="" aria-label="sponsors link"></SponsorsH1>
                        </SponsorsGridColHidden>
                    </SponsorsGrid3>
                    <SponsorsFooterBar>
                        <SponsorsH2>{""}</SponsorsH2>
                    </SponsorsFooterBar>
                </SponsorsLayout>
                <SponsorButton href={"https://github.com/sponsors/Thecyberworld"} target={"_blank"} rel={"noreferrer"}>
                    Sponsor Thecyberworld Community
                </SponsorButton>
            </SponsorsContainer>
        </SponsorsWrapper>
    );
};

export default SpecialSponsors;
