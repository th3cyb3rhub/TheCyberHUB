import styled from "styled-components";

export const ParticipantsContainer = styled.div`
    .details-profile {
        display: flex;
        margin-top: 2rem;
        flex-wrap: wrap;
        height: 40px;
        overflow: hidden;

        img {
            width: 40px;
            height: 40px;
            object-fit: cover;
            border-radius: 100%;

            &:not(&:first-child) {
                margin-left: -0.8rem;
            }
        }
    }
`;
