import React from "react";
import { Wrapper } from "src/components/Dashboard/Profile/ProfileElements";
import {
    ROEDescription,
    ROEHeading,
    RulesOfEngagementContainer,
    RulesOfEngagementContentList,
    RulesOfEngagementContentSection,
} from "./RulesOfEngagementElements";
import { DotSymbol } from "src/components/Other/Support/SponsorsElements";
import SecurityNavigation from "./SecurityNavigation";

const RulesOfEngagement = () => {
    const rulesOfEngagement = [
        {
            title: `Scope of Testing`,
            description: (
                <>
                    Security testing should only be conducted on
                    <br /> <DotSymbol style={{ margin: "0 10px" }} />
                    <a
                        style={{ color: "#ed652f" }}
                        href="https://security.thecyberhub.org"
                        target="_blank"
                        rel="noreferrer"
                    >
                        security.thecyberhub.org
                    </a>
                    <br /> <DotSymbol style={{ margin: "0 10px" }} />
                    <a
                        style={{ color: "#ed652f" }}
                        href="https://security.api.thecyberhub.org"
                        target="_blank"
                        rel="noreferrer"
                    >
                        security.api.thecyberhub.org
                    </a>
                    <br /> <br />
                    Testing should not be conducted on any other domains or IP addresses owned by TheCyberHUB without
                    explicit prior written consent. <br /> <br />
                    Please note that only valid bugs that have an impact on our websites will be considered for
                    inclusion in our Hall of Fame.
                </>
            ),
        },
        {
            title: `Out of Scope Domains`,
            description: (
                <>
                    The following domains are out of scope for security testing and should not be tested under any
                    circumstances:
                    <br /> <DotSymbol style={{ margin: "0 10px" }} />
                    <a style={{ color: "#ed652f" }} href="https://thecyberhub.org" target="_blank" rel="noreferrer">
                        thecyberhub.org
                    </a>
                    <br /> <DotSymbol style={{ margin: "0 10px" }} />
                    <a style={{ color: "#ed652f" }} href="https://api.thecyberhub.org" target="_blank" rel="noreferrer">
                        api.thecyberhub.org
                    </a>
                    <br /> <DotSymbol style={{ margin: "0 10px" }} />
                    <a style={{ color: "#ed652f" }} href="https://dev.thecyberhub.org" target="_blank" rel="noreferrer">
                        dev.thecyberhub.org
                    </a>
                    <br /> <DotSymbol style={{ margin: "0 10px" }} />
                    <a
                        style={{ color: "#ed652f" }}
                        href="https://dev.api.thecyberhub.org"
                        target="_blank"
                        rel="noreferrer"
                    >
                        dev.api.thecyberhub.org
                    </a>
                </>
            ),
        },
        {
            title: `Reporting Vulnerabilities`,
            description: (
                <>
                    If you discover a vulnerability during your testing, please report it immediately to
                    <a style={{ color: "#ed652f", margin: "0 0 0 5px" }} href="mailto:info@thecyberhub.org">
                        info@thecyberhub.org
                    </a>
                    . Please do not disclose any information about the vulnerability to others until it has been
                    remediated.
                </>
            ),
        },
        {
            title: `Permitted Testing`,
            description: `The following types of testing are permitted:\n\n1. Automated vulnerability scanning with commercial or open source tools.\n2. Manual testing using commercial or open source tools.\n3. Network analysis and reconnaissance.`,
        },
        {
            title: `Prohibited Testing`,
            description: `The following types of testing are strictly prohibited:\n\n1. Physical testing such as breaking into facilities or stealing equipment.\n2. Exploiting any vulnerability or misconfiguration to steal, modify or destroy data or interfere with the operation of systems.\n3. Using any method that could cause disruption or harm to TheCyberHUB or its customers.\n4. Testing third-party applications, services or systems without explicit prior written consent from the third-party.`,
        },
        {
            title: `Compensation`,
            description: `TheCyberHUB does not offer any compensation for security testing activities. However, we greatly appreciate and acknowledge the efforts of the security community in helping us maintain a secure environment for our users.`,
        },
    ];
    return (
        <Wrapper>
            <RulesOfEngagementContainer>
                <SecurityNavigation heading={"Rules Of Engagement"} />
                <RulesOfEngagementContentSection>
                    {rulesOfEngagement?.map((rule, index) => (
                        <RulesOfEngagementContentList key={index}>
                            <ROEHeading>{rule.title}</ROEHeading>
                            <ROEDescription>{rule.description}</ROEDescription>
                        </RulesOfEngagementContentList>
                    ))}
                </RulesOfEngagementContentSection>
            </RulesOfEngagementContainer>
        </Wrapper>
    );
};

export default RulesOfEngagement;
