import React from "react";
import { Wrapper } from "src/components/Dashboard/Profile/ProfileElements";
import { VictimHelpWrapper, ScamSteps, ResourcesSection } from "./VictimhelpElements";

const VictimHelp = () => {
    return (
        <Wrapper>
            <VictimHelpWrapper>
                <ScamSteps>
                    <h1>Dealing with a Scam: What to Do Next</h1>
                    <p>
                        If you have fallen victim to a scam, it is important to take immediate action to mitigate the
                        impact and report the incident. Follow these steps to navigate through the aftermath of being
                        scammed:
                    </p>
                    <ol>
                        <li>
                            <strong>Stay Calm:</strong> Take a deep breath. It is essential to stay calm and focused to
                            address the situation effectively.
                        </li>
                        <li>
                            <strong>Document Details:</strong> Write down all details related to the scam, including the
                            date, time, method of contact, and any information about the scammer.
                        </li>
                        <li>
                            <strong>Secure Your Accounts:</strong> Change passwords for your online accounts, especially
                            banking and email, to prevent further unauthorized access.
                        </li>
                        <li>
                            <strong>Report to Authorities:</strong> File a complaint with the relevant authorities. In
                            India, you can use the National Cyber Crime Reporting Portal.{" "}
                            <a
                                href="https://cybercrime.gov.in"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color: "#0069da" }}
                            >
                                Report Cyber Crime
                            </a>
                            .
                        </li>
                        <li>
                            <strong>Inform Your Bank:</strong> If the scam involved financial transactions, contact your
                            bank immediately to report the incident and take necessary actions.
                        </li>
                        <li>
                            <strong>Be Vigilant:</strong> Keep an eye on your accounts and report any suspicious
                            activity promptly.
                        </li>
                    </ol>
                </ScamSteps>
                <ResourcesSection>
                    <h2>Helpful Information</h2>
                    <p>
                        It is crucial to seek support during such challenging times. Reach out to the following
                        resources for assistance:
                    </p>
                    <ul>
                        <li>
                            <strong>National Cyber Crime Reporting Portal:</strong>{" "}
                            <a href="https://cybercrime.gov.in" target="_blank" rel="noopener noreferrer">
                                https://cybercrime.gov.in
                            </a>
                        </li>
                        <li>
                            <strong>Helpline Number:</strong> 1930 (National Cyber Crime Reporting Portal)
                        </li>
                        <li>
                            <strong>Local Police:</strong> Visit your nearest police station to file a formal complaint.
                        </li>
                        <li>
                            <strong>Online Support Communities:</strong> Connect with others who have experienced
                            similar situations for advice and emotional support.
                        </li>
                    </ul>
                </ResourcesSection>
            </VictimHelpWrapper>
        </Wrapper>
    );
};

export default VictimHelp;
