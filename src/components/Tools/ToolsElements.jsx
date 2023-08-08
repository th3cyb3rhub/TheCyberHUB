import styled from "styled-components";
import { Link as LinkRouter } from "react-router-dom";

export const ContainerTools = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 50px;
    margin: 100px 0 150px;
`;
export const Tools = styled.div``;

export const CardTools = styled.div`
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 50px;
    text-align: center;
    transition: transform 0.3s;
    //font-family: "Fira Code", monospace;

    cursor: pointer;
    //font-style: italic;

    position: relative;
    background: transparent;
    box-shadow: 0 0 150px 0 rgba(241, 115, 12, 0.25);
    backdrop-filter: blur(25px);
    -webkit-backdrop-filter: blur(25px);
    border: 1px solid rgba(255, 255, 255, 0.18);

    &:hover {
        transition: all 0.3s ease-in-out;
        transform: translateY(-5px);
        background: #1f0b02;
    }
`;
export const CardToolHeading = styled.p`
    display: flex;
    flex-direction: row;
    align-items: center;
    text-align: center;
    font-size: 23px;
    color: #f5f5f5;
    gap: 10px;
`;

export const RouterLink = styled(LinkRouter)`
    color: #f5f5f5;
`;
