import styled from "styled-components";
import { MdOutlineLocalFireDepartment } from "react-icons/all";

export const ExpContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    background: transparent;
    @media screen and (max-width: 900px) {
        margin-right: 30px;
    }
    @media screen and (max-width: 768px) {
    }
    @media screen and (max-width: 350px) {
        display: none;
    }
`;

export const ExpIcon = styled(MdOutlineLocalFireDepartment)`
    color: #09ff1b;
    margin: 0 5px;
    font-size: 1.2rem;
`;
export const ExpText = styled.p`
    color: #09ff1b;
`;
