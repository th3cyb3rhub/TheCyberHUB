import styled from "styled-components";

export const EmailNotVerifiedContainer = styled.div`
    //background: transparent;
    //background: #08ff00;
    width: 100%;
    display: flex;
    justify-content: center;
    background: ${({ scrollNav }) => (scrollNav ? "#000" : "transparent")};
    align-items: center;
    text-align: center;
    top: 80px;
    position: sticky;
    z-index: 5;
`;

export const EmailNotVerifiedText = styled.div`
    //color: #1a1c1d;
    color: #08ff00;

    @media screen and (max-width: 500px) {
        padding: 5px;
        font-size: 14px;
    }
`;

export const ResendButton = styled.button`
    background: #0e0e0e;
    color: #08ff00;
    margin: 5px 10px;
    padding: 5px 10px;
    border: 1px #545454 solid;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
        scale: 1.1;
        transition: all 0.2s ease-in-out;
    }
`;
