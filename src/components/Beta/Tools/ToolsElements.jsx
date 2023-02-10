import styled from "styled-components";
import { Link as LinkRouter } from "react-router-dom";

export const ContainerTools = styled.div`
    display: flex;
`;
export const Tools = styled.div``;

export const CardTools = styled.div`
    border: #666666 2px solid;
    padding: 50px;
    border-radius: 5px;
    font-size: 20px;
    transition: transform 0.3s;
    margin: 50px;

    &:hover {
        transform: scale(1.1);
    }
`;

export const RouterLink = styled(LinkRouter)`
    color: whitesmoke;
`;
