import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { payloadsData } from "src/components/Resources/Payloads/payloadsData.jsx";
import { Wrapper } from "src/components/Dashboard/Profile/ProfileElements.jsx";
import SyntaxHighlight from "src/components/WebSecurity/Common/SyntaxHighlight.jsx";
import {
    CopyAllButton,
    CopyButton,
    MainContent,
    PayloadGroup,
    PayloadList,
    PayloadsContainer,
    PayloadTitle,
    Sidebar,
    SidebarItem,
    StyledToastContainer,
} from "src/components/Resources/Payloads/PayloadsElements.jsx";

const Payloads = () => {
    const [selectedCategory, setSelectedCategory] = useState(payloadsData[0].vulnerabilityType);
    const [showAllPayloads, setShowAllPayloads] = useState(false);

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            toast.dark("Copied to clipboard!", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        });
    };

    const copyAllPayloads = () => {
        let payloadsToCopy;
        if (showAllPayloads) {
            payloadsToCopy = payloadsData.flatMap((group) => group.payloads);
        } else {
            const selectedGroup = payloadsData.find((group) => group.vulnerabilityType === selectedCategory);
            payloadsToCopy = selectedGroup ? selectedGroup.payloads : [];
        }
        const allPayloads = payloadsToCopy.join("\n");
        copyToClipboard(allPayloads);
    };

    console.log(selectedCategory);

    return (
        <Wrapper>
            <PayloadsContainer>
                <Sidebar>
                    <h1 style={{ color: "#e0e0e0" }}>Payloads</h1>
                    <ul
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "5px",
                            padding: 0,
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
                        {showAllPayloads ? "Show Categories" : "Show All Payloads"}
                    </button>
                </Sidebar>
                <MainContent>
                    <CopyAllButton onClick={copyAllPayloads}>
                        Copy {showAllPayloads ? "All" : selectedCategory || "all"} Payloads
                    </CopyAllButton>

                    {payloadsData.map(
                        (payloadGroup, index) =>
                            (showAllPayloads || selectedCategory === payloadGroup.vulnerabilityType) && (
                                <PayloadGroup key={`payloadGroup${index}`}>
                                    <PayloadTitle>{payloadGroup.vulnerabilityType} Payloads:</PayloadTitle>
                                    <PayloadList>
                                        {payloadGroup.payloads.map((payload, payloadIndex) => (
                                            <div
                                                key={payloadIndex}
                                                style={{
                                                    position: "relative",
                                                    alignItems: "center",
                                                    gap: "10px",
                                                }}
                                            >
                                                <SyntaxHighlight language={payloadGroup.language} code={payload} />
                                                <CopyButton
                                                    onClick={() => copyToClipboard(payload)}
                                                    style={{ position: "absolute", top: "5px", right: "5px" }}
                                                >
                                                    Copy
                                                </CopyButton>
                                            </div>
                                        ))}
                                    </PayloadList>
                                </PayloadGroup>
                            ),
                    )}
                </MainContent>
            </PayloadsContainer>
            <StyledToastContainer />
        </Wrapper>
    );
};

export default Payloads;
