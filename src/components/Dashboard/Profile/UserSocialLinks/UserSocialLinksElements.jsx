import styled from "styled-components";

export const UserSocialLinksContainer = styled.div`
    padding: 10px;
    border-radius: 5px;
    background: #0e0e0e;
`;

export const SocialIcon = styled.div``;
export const SocialUsername = styled.a`
    font-size: 15px;
    color: #e0e0e0;
    text-decoration: none;
    margin-left: 7px;

    &:hover {
        text-decoration: underline;
    }
`;
export const SocialLink = styled.div`
    color: #e0e0e0;
    margin: 3px 0;
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: left;
    border-radius: 5px;
    transition: all 0.3s ease-in-out;
    cursor: pointer;
    gap: 5px;
`;

export const EditSocialUsername = styled.input`
    font-size: 18px;
    color: #e0e0e0;
    text-decoration: none;
    margin-left: 7px;
    margin-bottom: 7px;
    background: transparent;
    padding: 5px;
    border: 1px solid #3a3a3a;
`;
