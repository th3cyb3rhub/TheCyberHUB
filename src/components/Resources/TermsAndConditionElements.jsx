import styled from "styled-components";
import { Link } from "react-router-dom";

export const TermsAndConditionContainer = styled.div`
    max-width: 1200px;
    background: #0a0a0a;
    padding: 25px;
`;

export const TermsHeading = styled.h3`
    font-family: Roboto, sans-serif;
    padding: 5px 25px 0;
    color: #666;
`;
export const TermsDescription = styled.p`
    padding: 5px 25px 25px;
    color: #b2b2b2;
`;

export const List = styled.li`
    margin: 0 15px;
`;
export const RouterLink = styled(Link)`
    text-decoration: none;
    color: #87ff25;
    margin: 0 5px;

    &:hover {
        transform: scale(1.1);
    }
`;
