import styled from "styled-components";

export const EventDetails = styled.div`
    position: relative;
    margin: 9.25rem auto;
    width: 80%;
    color: #f5f5f5;
    padding: 0 1.563rem;
`;
export const EventDetailsHeaderContainer = styled.div`
    margin-bottom: 50px;
`;
export const EventDetailsHeader = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 20px;
`;
export const EventDetailsDateContainer = styled.div`
    padding: 5px;
    border-radius: 20px;
    background-image: linear-gradient(to right, #313131, #000);
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
`;
export const EventDetailsHeaderText = styled.div`
    display: flex;
    flex-direction: column;
    width: 70%;
`;
export const EventDetailsTitle = styled.h1`
    font-size: 36px;
    text-shadow: 2px 2px #646464;
    overflow-wrap: break-word;
    text-transform: capitalize;
`;
export const EventDetailsDescription = styled.p`
    font-size: 24px;
    text-shadow: 2px 2px #646464;
    overflow-wrap: break-word;
`;

export const EventLink = styled.a`
    font-size: 18px;
    margin-bottom: 20px;
    display: inline;
    color: white;

    &:hover {
        color: #2c2cf0;
    }

    svg {
        float: left;
    }

    line-height: 20px;
`;
