import styled from "styled-components";

export const DisplayTimelineContainer = styled.div`
    margin-bottom: 50px;
`;

export const DisplayTimelineItemContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    border: 3px inset #2e2e2e;
    border-radius: 8px;
    padding: 1rem;
    margin-bottom: 15px;
    height: 200px;
    overflow: hidden;
    overflow-y: scroll;
`;
export const DisplayTimelineItemProgramContainer = styled.div`
    margin-right: 20px;
    flex: 1;
`;

export const DisplayTimelineItemOtherInfoContainer = styled.div`
    width: 100%;
    flex: 6;
    display: flex;
    align-items: start;
    justify-content: space-between;
    margin-bottom: 10px;
`;
export const DisplayTimelineItemContextContainer = styled.div`
    width: 100%;
    flex: 3;
`;

export const DisplayTimelineItemTitle = styled.h2`
    font-size: 20px;
    text-shadow: 2px 2px #646464;
    overflow-wrap: break-word;
    text-transform: capitalize;
    max-height: 90px;
`;
export const DisplayTimelineItemTopic = styled.h3`
    font-size: 14px;
    margin-top: -10px;
    color: #646464;
    text-transform: capitalize;
    max-height: 20px;
    overflow: hidden;
`;
export const DisplayTimelineItemDescription = styled.p`
    line-height: 1.43;
`;
