import React, { useState } from "react";
import styled from "styled-components";
import { payloadsData } from "src/components/Resources/Payloads/payloadsData.jsx";
import { Wrapper } from "src/components/Dashboard/Profile/ProfileElements.jsx";
import SyntaxHighlight from "src/components/WebSecurity/Common/SyntaxHighlight.jsx";

const Sidebar = styled.div`
    display: flex;
    align-content: center;
    flex-direction: column;
    flex: 0 0 20%;
    background: #171616;
    padding: 25px;
    height: fit-content;
    border-radius: 10px;
    gap: 10px;
`;

const PayloadsContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 20px;
    width: 100%;
    max-width: 1500px;
    gap: 25px;
`;

const SidebarItem = styled.li`
    padding: 5px 10px;
    background-color: ${({ isSelected }) => (isSelected ? "#3a3939" : "#252424")};
    border-radius: 5px;
    cursor: pointer;
`;

const PayloadGroup = styled.div`
    margin-bottom: 20px;
`;

const PayloadTitle = styled.h2`
    margin-bottom: 10px;
`;

const PayloadList = styled.ul`
    list-style-type: none;
    padding: 0;
`;

const Payloads = () => {
    const [selectedCategory, setSelectedCategory] = useState(payloadsData[0].vulnerabilityType);
    const [showAllPayloads, setShowAllPayloads] = useState(false);

    return (
        <Wrapper>
            <PayloadsContainer>
                <Sidebar>
                    <h2>Categories:</h2>
                    <ul
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                        }}
                    >
                        {payloadsData.map((payloadGroup, index) => (
                            <SidebarItem
                                key={`category${index}`}
                                isSelected={selectedCategory === payloadGroup.vulnerabilityType}
                                onClick={() => setSelectedCategory(payloadGroup.vulnerabilityType)}
                            >
                                {payloadGroup.vulnerabilityType}
                            </SidebarItem>
                        ))}
                    </ul>
                    <button onClick={() => setShowAllPayloads(!showAllPayloads)}>
                        {showAllPayloads ? "Show Selected Category" : "Show All Payloads"}
                    </button>
                </Sidebar>
                <div>
                    {payloadsData.map(
                        (payloadGroup, index) =>
                            (showAllPayloads || selectedCategory === payloadGroup.vulnerabilityType) && (
                                <PayloadGroup key={`payloadGroup${index}`}>
                                    <PayloadTitle>{payloadGroup.vulnerabilityType} Payloads:</PayloadTitle>
                                    <PayloadList>
                                        {payloadGroup.payloads.map((payload, payloadIndex) => (
                                            <div key={payloadIndex}>
                                                <SyntaxHighlight language={payloadGroup.language} code={payload} />
                                                {/* <PayloadItem key={`payload${index}${payloadIndex}`}> */}
                                                {/*    {payload} */}
                                                {/* </PayloadItem> */}
                                            </div>
                                        ))}
                                    </PayloadList>
                                </PayloadGroup>
                            ),
                    )}
                </div>
            </PayloadsContainer>
        </Wrapper>
    );
};

export default Payloads;
