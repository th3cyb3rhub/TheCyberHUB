import React from "react";
import styled from "styled-components";
import { Wrapper } from "src/components/Dashboard/Profile/ProfileElements";
import { WebSecurityContainer } from "./WebSecurityElements";

// Styled components for the sections
const Section = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
    border-radius: 10px;
    background-color: #2c3e50; /* Dark background color */
    color: #ecf0f1; /* Light text color */
`;

const SectionTitle = styled.h2`
    font-size: 1.5rem;
    margin-bottom: 10px;
`;

const SectionContent = styled.div`
    margin-top: 10px;
`;

const WebSecurity = () => {
    return (
        <Wrapper>
            <WebSecurityContainer>
                <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
                    {/* Topics section */}
                    <Section>
                        <SectionTitle>Topics</SectionTitle>
                        <SectionContent>
                            <p>
                                Web security is a crucial aspect of web development. It involves implementing measures
                                to protect websites and web applications from various security threats such as hackers,
                                malware, and data breaches.
                            </p>
                            <p>
                                Topics in web security may include but are not limited to:
                                <ul>
                                    <li>Authentication and authorization</li>
                                    <li>Secure coding practices</li>
                                    <li>Encryption and HTTPS</li>
                                    <li>Common web vulnerabilities (e.g., XSS, CSRF, SQL injection)</li>
                                    <li>Security best practices</li>
                                </ul>
                            </p>
                        </SectionContent>
                    </Section>

                    {/* Labs section */}
                    <Section>
                        <SectionTitle>Labs</SectionTitle>
                        <SectionContent>
                            <p>
                                Hands-on labs are essential for gaining practical experience in web security. They allow
                                developers to apply theoretical knowledge to real-world scenarios and understand how to
                                identify and mitigate security risks effectively.
                            </p>
                            <p>
                                Labs may cover topics such as:
                                <ul>
                                    <li>Penetration testing</li>
                                    <li>Security assessment and auditing</li>
                                    <li>Incident response and handling</li>
                                    <li>Secure development practices</li>
                                    <li>Security tooling and technologies</li>
                                </ul>
                            </p>
                        </SectionContent>
                    </Section>
                </div>
            </WebSecurityContainer>
        </Wrapper>
    );
};

export default WebSecurity;
