import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    align-items: center;
    height: 100vh;
    width: 100%;
    background: black;
    overflow: auto;
    padding: 25px;

    @media screen and (max-width: 500px) {
        padding: 10px;
    }
`;
