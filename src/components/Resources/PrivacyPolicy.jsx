import React from "react";
import { Wrapper } from "../Dashboard/Profile/ProfileElements";
import {
    List,
    TermsAndConditionContainer,
    TermsDescription,
    TermsHeading,
    RouterLink,
    Heading,
} from "./TermsAndConditionElements";

const PrivacyPolicy = () => {
    return (
        <Wrapper>
            <Heading>Privacy Policy</Heading>
            <TermsAndConditionContainer>
                <TermsHeading> Introduction: </TermsHeading>
                <TermsDescription>
                    At Thecyberhub.org and Thecyberworld Community, we are committed to protecting the privacy of our
                    users. This Privacy Policy explains how we collect, use, disclose, and protect the information that
                    we receive from you when you use our website and services.
                </TermsDescription>

                <TermsHeading> Information Collection: </TermsHeading>
                <TermsDescription>
                    We may collect the following types of information from you:
                    <List>
                        Personal Information: This includes your name, email address, and any other information that can
                        be used to identify you personally.
                    </List>
                    <List>
                        Usage Information: This includes information about how you use our website and services, such as
                        the pages you visit, the actions you take, and the date and time of your visits.
                    </List>
                    {/* Technical Information: This includes information about your device, such as its type, operating system, and browser type, as well as your IP address. */}
                    {/* Location Information: This includes information about your location, such as your country, region, and city. */}
                </TermsDescription>

                <TermsHeading> Information Use: </TermsHeading>
                <TermsDescription>
                    The information that we collect from you may be used for the following purposes:
                    <List>To provide you with the services that you request from us.</List>
                    <List>To communicate with you about your account and to provide you with customer support.</List>
                    <List>To improve our website and services.</List>
                    <List>To detect and prevent fraud and other illegal activities.</List>
                </TermsDescription>

                <TermsHeading>Information Disclosure:</TermsHeading>
                <TermsDescription>
                    We do not sell, rent, or otherwise share your personal information with third parties, except in the
                    following circumstances:
                    <List>
                        With your consent: We may share your information with third parties if you give us permission to
                        do so.
                    </List>
                    <List>
                        For legal reasons: We may disclose your information if we believe that it is required by law or
                        necessary to protect our rights.
                    </List>
                    <List>
                        To service providers: We may share your information with service providers who perform functions
                        on our behalf, such as hosting our website, analyzing data, and providing customer support.
                    </List>
                </TermsDescription>
                <TermsHeading>Information Protection:</TermsHeading>
                <TermsDescription>
                    We implement appropriate technical and organizational measures to protect your information from
                    unauthorized access, disclosure, alteration, and destruction.
                </TermsDescription>

                <TermsHeading>Changes to this Privacy Policy:</TermsHeading>
                <TermsDescription>
                    We may update this Privacy Policy from time to time to reflect changes in our practices or
                    applicable laws. When we make changes, we will update the &quot;Last Updated&quot; date at the top
                    of this Privacy Policy.
                </TermsDescription>

                <TermsHeading>Contact Us:</TermsHeading>
                <TermsDescription>
                    If you have any questions or concerns about our Privacy Policy, please contact us at
                    <RouterLink to={"/contact"}>Contact Us</RouterLink>
                    <br />
                    Last Updated: 2023-02-12.
                </TermsDescription>
            </TermsAndConditionContainer>
        </Wrapper>
    );
};

export default PrivacyPolicy;
