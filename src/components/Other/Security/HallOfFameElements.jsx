import styled from "styled-components";

export const HallOfFameContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    color: #fff;
    max-width: 1500px;
    gap: 25px;
`;

export const HallOfFameList = styled.ul`
    list-style-type: none;
    margin: 0;
    background: #090909;
    width: 100%;
    padding: 0 25px 25px;
    border-radius: 10px;
    gap: 25px;

    @media screen and (width <= 768px) {
        padding: 0 10px 25px;
    }
`;

export const HallOfFameYearSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
`;
export const HallOfFameMonthSection = styled.div`
    padding: 25px;
    background: #101010;
    border-radius: 10px;
    gap: 25px;

    @media screen and (width <= 768px) {
        padding: 10px 5px 10px 15px;
    }
`;

export const HallOfFameYear = styled.h1`
    margin: 25px 0 0;
    font-style: italic;
    text-align: center;
`;

export const HallOfFameName = styled.li`
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 14px;

    @media screen and (width <= 768px) {
        padding: 0 5px;
    }

    @media screen and (width <= 400px) {
        font-size: 12px;
    }
`;
