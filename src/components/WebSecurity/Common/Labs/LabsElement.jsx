import styled from "styled-components";

export const LabContainer = styled.div`
    width: 100%;

    /* height: 700px; */
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 15px;
`;
export const LabCategory = styled.div`
    background-color: rgb(19 19 19);
    width: 287px;
    padding: 20px;
    margin-right: 20px;
`;
export const RoomContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 15px;

    .header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        gap: 20px;
        padding: 0;
        margin: 0;
    }

    .room-cards-container {
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
        gap: 20px;
        padding: 0;
        margin: 0;
    }
`;
export const LevelContainer = styled.div`
    background: #090909;
    width: 390px;
    height: 42px;
    display: flex;
    flex-direction: row;
    border-radius: 7px;
    overflow: clip;
`;
