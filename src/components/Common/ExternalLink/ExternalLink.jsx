// Install the necessary packages
// npm install styled-components react-icons

import React, { useState } from "react";
import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";

// Define your dark theme with black and orange
const Theme = {
    background: "#000000",
    text: "#ffffff",
    highlight: "#ff6600",
};

// Styled components for the theme
const Container = styled.div`
    background-color: ${Theme.background};
    color: ${Theme.text};
    padding: 20px;
    min-height: 100vh;
    position: relative;
`;

const PopupOverlay = styled.div`
    position: fixed;
    inset: 0;
    background: rgb(0 0 0 / 50%);
    display: ${(props) => (props.show ? "flex" : "none")};
    justify-content: center;
    align-items: center;
`;

const PopupContent = styled.div`
    background: ${Theme.background};
    color: ${Theme.text};
    padding: 20px;
    border-radius: 8px;
    position: relative;
    width: 300px;
    text-align: center;
    box-shadow: 0 4px 8px rgb(0 0 0 / 30%);
`;

const CloseButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    background: ${Theme.highlight};
    border: none;
    color: ${Theme.text};
    border-radius: 50%;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;

const ExternalLink = styled.a`
    color: ${Theme.highlight};
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
`;

const ExternalLinkPopUp = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [linkUrl, setLinkUrl] = useState("");

    const handleLinkClick = (url) => {
        setLinkUrl(url);
        setShowPopup(true);
        // Prevent default action
        return false;
    };

    return (
        <Container>
            <h1>Dark Theme with Popup</h1>
            <p>
                Click on this{" "}
                <ExternalLink href="#" onClick={() => handleLinkClick("https://example.com")}>
                    external link
                </ExternalLink>{" "}
                to see the popup.
            </p>

            <PopupOverlay show={showPopup}>
                <PopupContent>
                    <CloseButton onClick={() => setShowPopup(false)}>
                        <AiOutlineClose size={16} />
                    </CloseButton>
                    <p>Do you want to continue to the external link?</p>
                    <a href={linkUrl} target="_blank" rel="noopener noreferrer">
                        <button
                            style={{
                                padding: "10px",
                                borderRadius: "5px",
                                border: "none",
                                background: Theme.highlight,
                                color: Theme.text,
                            }}
                        >
                            Yes, Continue
                        </button>
                    </a>
                    <button
                        onClick={() => setShowPopup(false)}
                        style={{
                            marginTop: "10px",
                            padding: "10px",
                            borderRadius: "5px",
                            border: "none",
                            background: Theme.highlight,
                            color: Theme.text,
                        }}
                    >
                        Cancel
                    </button>
                </PopupContent>
            </PopupOverlay>
        </Container>
    );
};

export default ExternalLinkPopUp;
