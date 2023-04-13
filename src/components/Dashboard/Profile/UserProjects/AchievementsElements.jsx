import styled from "styled-components";
import { BsDot } from "react-icons/all";

export const AchievementsContainer = styled.div`
    padding: 25px 10px;
    margin-bottom: 25px;
    background: #080808;
`;

export const AchievementHeading = styled.h2``;

export const AchievementList = styled.ul`
    display: flex;
    //display: grid;
    //grid-template-columns: 1fr 1fr;
    //grid-template-rows: 1fr 1fr;
    //grid-template-areas: "AchievementItem AchievementItem" "AchievementItem AchievementItem";
    //grid-gap: 25px;
    padding: 0;
`;

export const AchievementItem = styled.li`
    display: flex;
    flex-direction: column;
`;

export const AchievementCategoryH = styled.h3``;
export const AchievementLink = styled.a`
    color: #fff;
    display: flex;
    align-items: center;
    gap: 10px;

    &:hover {
        color: #007bff;
    }
`;

export const IconDot = styled(BsDot)`
    color: #5eff00;
    margin: 0 0 0 10px;
    font-size: 1.5rem;
`;

export const EditCat = styled.input`
    background: #080808;
    border: none;
    border-bottom: 1px solid #fff;
    color: #fff;
    font-size: 18px;
    margin: 5px;
    padding: 5px;
    width: 100%;

    &:focus {
        outline: none;
    }
`;

export const EditTitle = styled.input`
    background: #131313;
    border: none;
    color: #fff;
    font-size: 18px;
    margin: 5px 0;
    padding: 7px 10px;
    width: 250px;

    &:focus {
        outline: none;
    }
`;

export const AddButtonSection = styled.button`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 5px;
    background: transparent;
    color: #fff;
    border: none;
    cursor: pointer;
    margin: 5px;
`;
