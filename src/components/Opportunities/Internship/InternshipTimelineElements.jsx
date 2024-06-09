import styled from "styled-components";

export const TimelineContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 10px 0;
`;

export const HorizontalLine = styled.hr`
    background: #fff;
    color: #fff;
    width: 100%;
    height: 100px;
`;

export const TimelineWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    width: 100%;
    margin-top: 20px;
`;

export const TimelineTop = styled.div`
    position: absolute;
    top: 0;
    display: flex;
    justify-content: space-between;
    width: 100%;
    font-weight: bold;
`;

export const TimelineBottom = styled.div`
    position: absolute;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    width: 100%;
    font-weight: bold;
`;

export const TimelineLine = styled.div`
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: #dcdcdc;
`;

export const TimelineCircle = styled.div`
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    border: 2px solid black;
    border-radius: 50%;
    width: 20px;
    height: 20px;

    &:nth-of-type(1) {
        left: 0;
    }

    &:nth-of-type(2) {
        left: 33.33%;
    }

    &:nth-of-type(3) {
        left: 66.66%;
    }

    &:nth-of-type(4) {
        left: 100%;
    }
`;

export const TimelineLabel = styled.div`
    position: relative;
    top: -10px;
`;
