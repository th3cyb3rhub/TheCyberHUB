import React, { useState } from "react";
import { Wrapper } from "src/components/Dashboard/Profile/ProfileElements.jsx";
import {
    CommandCode,
    CommandHeader,
    CommandItem,
    CommandList,
    Container,
    CopyButton,
    Description,
    Section,
    SectionHeader,
    Sidebar,
    SidebarItem,
    MainContent,
} from "src/components/Resources/Cheatsheets/CheatsheetsElements.jsx";
import { commandData } from "src/components/Resources/Cheatsheets/cheatsheetsData.jsx";

const Cheatsheets = () => {
    const [selectedSection, setSelectedSection] = useState(Object.keys(commandData)[0]);
    const [copiedStates, setCopiedStates] = useState({});

    const copyToClipboard = (text, index) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopiedStates((prev) => ({ ...prev, [index]: true }));
            setTimeout(() => {
                setCopiedStates((prev) => ({ ...prev, [index]: false }));
            }, 2000);
        });
    };

    return (
        <Wrapper>
            <Container>
                <Sidebar>
                    {Object.keys(commandData).map((sectionTitle, index) => (
                        <SidebarItem
                            key={index}
                            onClick={() => setSelectedSection(sectionTitle)}
                            active={sectionTitle === selectedSection}
                        >
                            {sectionTitle}
                        </SidebarItem>
                    ))}
                </Sidebar>
                <MainContent>
                    {commandData[selectedSection].map((item, index) => (
                        <Section key={index}>
                            <SectionHeader>{item.title}</SectionHeader>
                            <CommandList>
                                <CommandItem>
                                    <CommandHeader>
                                        <CommandCode>{item.command}</CommandCode>
                                        <CopyButton onClick={() => copyToClipboard(item.command, index)}>
                                            {copiedStates[index] ? "Copied" : "Copy Command"}
                                        </CopyButton>
                                    </CommandHeader>
                                    <Description>{item.description}</Description>
                                </CommandItem>
                            </CommandList>
                        </Section>
                    ))}
                </MainContent>
            </Container>
        </Wrapper>
    );
};

export default Cheatsheets;
