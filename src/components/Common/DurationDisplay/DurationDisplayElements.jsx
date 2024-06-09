import styled from "styled-components";
import { AiFillClockCircle, AiFillExclamationCircle } from "react-icons/ai";

export const DurationDisplayContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 0.75rem;

    &:last-child {
        margin-bottom: 0;
    }

    p {
        margin: 0 0.75rem;
    }

    .text-over-flow {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 158px;
    }
`;
export const DurationRequest = styled.div`
    color: #e24612;
`;

const createStyledIcon = (IconComponent) => {
    return styled(IconComponent)`
        width: 20px;
        height: 20px;
    `;
};

export const AiFillClockCircleIcon = createStyledIcon(AiFillClockCircle);
export const AiFillExclamationCircleIcon = createStyledIcon(AiFillExclamationCircle);
