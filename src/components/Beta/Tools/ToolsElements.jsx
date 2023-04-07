import styled from "styled-components";
import { Link as LinkRouter } from "react-router-dom";

export const ContainerTools = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 100px;
    margin: 100px 0 150px;
`;
export const Tools = styled.div``;

export const CardTools = styled.div`
    border-radius: 10px;
    font-size: 20px;
    color: #ffffff;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 25px;
    text-align: center;
    transition: transform 0.3s;
    font-family: "Fira Code", monospace;
    cursor: pointer;

    position: relative;
    background: transparent;
    box-shadow: 0 0 100px 0 rgba(63, 255, 0, 0.2);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    border: 1px solid rgba(255, 255, 255, 0.18);

    &:hover {
        transform: translateY(-5px);
    }
`;

export const RouterLink = styled(LinkRouter)`
    color: whitesmoke;
`;
