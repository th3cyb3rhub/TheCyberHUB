import styled from "styled-components";

export const DateDisplayContainer = styled.div`
    .date {
        font-weight: 600;
        font-size: 1.125rem;
        flex-basis: 10%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        border-right: ${(props) => (props.rightBorder ? "1px solid #f0f0f0" : "")};
        padding: ${(props) => (props.rightBorder ? "0rem 1.5rem 0rem 0.75rem" : "")};

        p {
            text-align: center;
        }

        &.today-date {
            color: #e45221;
        }

        .date-digit-container {
            display: flex;
            min-width: 110px;
            justify-content: space-between;
        }

        .date-digit-day {
            min-width: 45px;
            text-align: center;
        }

        .date-digit {
            font-size: 2rem;
            font-weight: 800;
        }

        .date-year {
            font-size: 1rem;
            font-weight: 500;
        }
    }
`;
