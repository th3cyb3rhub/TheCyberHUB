import styled from "styled-components";

export const TeamInviteContainer = styled.div`
    background: #111111;
    padding: 5px;
`;

export const TeamRequests = styled.div`
    background: #222222;
    gap: 10px;
    padding: 5px;
`;

export const TeamRequest = styled.div`
    background: #0e0e0e;
    padding: 25px;
`;

export const ButtonResponse = styled.button`
    background: #0e0e0e;
    color: #ffffff;
    padding: 10px;
    border: none;
    border-radius: 5px;
    transition: all 0.2s ease-in-out;
    margin: 10px 0;

    &:hover {
        transition: all 0.2s ease-in-out;
        background: #212121;
        color: #fff;
    }
`;

export const TeamContainer = styled.div`
    //height: 80px;
    //margin-top: -80px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    //position: sticky;
    //z-index: 10;
    //top: 150px;
    min-width: 400px;
    width: auto;
    gap: 25px;
    @media screen and (max-width: 800px) {
        min-width: 100%;
        width: 100%;
        transition: 0.8s all ease;
    }
`;
