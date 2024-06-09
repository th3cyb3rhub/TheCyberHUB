import styled from "styled-components";
import React from "react";
import { toast } from "react-toastify";

export const Container = styled.div`
    height: 50px;
    background: #131313;
    margin-bottom: 10px;
    border-radius: 5px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 5px;
    overflow: clip;
    color: white;
`;

const CopyButton = styled.button`
    padding: 5px 10px;
    background-color: #ff6b08;
    color: white;
    border: none;
    border-radius: 3px;
    cursor: pointer;
`;

export const CodeContainer = ({ text, title }) => {
    function copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            toast.success("Copied to clipboard!");
        });
    }

    return (
        <>
            <h1>{title}</h1>
            <Container>
                <p>{text}</p>
                <CopyButton onClick={() => copyToClipboard(text)}>Copy</CopyButton>
            </Container>
        </>
    );
};
