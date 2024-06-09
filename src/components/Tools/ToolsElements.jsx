import styled from "styled-components";
import { Link as LinkRouter } from "react-router-dom";

export const ContainerTools = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 50px;
    width: 100%;
    max-width: 1500px;
`;
export const CardTools = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 50px;
    width: 100%;
    max-width: 1500px;
`;

export const CardTool = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;
    width: 300px;
    padding: 20px;
    border-radius: 10px;
    background: transparent;
    box-shadow: 0 0 150px 0 rgb(241 115 12 / 25%);
    backdrop-filter: blur(25px);
    border: 1px solid rgb(255 255 255 / 18%);

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

export const ToolIcon = styled.p`
    font-size: 25px;
    margin: 0 15px;
`;

export const RouterLink = styled(LinkRouter)`
    color: #f5f5f5;
`;
