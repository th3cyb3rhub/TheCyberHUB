import styled from "styled-components";

export const UpComingEventsContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: left;
    text-align: left;
    height: auto;
    border: 1px solid #f5f5f50d;
    border-radius: 10px;
    background-color: #0c0c0c;
    padding: 15px 20px;
    margin: 0 0 25px;

    @media screen and (width <= 768px) {
        margin: 0 0 20px;
        width: 100%;
    }
`;

export const UpComingEventsImage = styled.img`
    height: 100%;
    width: auto;
    margin-bottom: 10px;
    font-size: 12px;
    color: #999;
    word-break: break-all;
`;

export const UpComingEventsSubHeading = styled.h4`
    margin: 5px 0 10px;
    color: #777;
`;
