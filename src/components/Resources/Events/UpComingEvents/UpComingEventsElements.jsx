import styled from "styled-components";

export const UpComingEventsContainer = styled.div`
    width: 348px;
    display: flex;
    flex-direction: column;
    justify-content: left;
    text-align: left;
    height: auto;
    border: 1px solid #ffffff0d;
    border-radius: 10px;
    background-color: #0d1117;
    margin: 0 20px 20px 0;
    padding: 15px 20px;

    @media screen and (max-width: 768px) {
        margin: 0 0 20px 0;
        width: 100%;
    }
`;

export const UpComingEventsImage = styled.img`
    height: 100%;
    width: auto;
    margin-bottom: 10px;
`;

export const UpComingEventsTitle = styled.div``;

export const UpComingEventsHeading = styled.h2``;
export const UpComingEventsSubHeading = styled.h4`
    margin: 5px 0 10px 0;
    color: #777777;
`;
