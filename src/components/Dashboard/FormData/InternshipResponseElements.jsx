import styled from "styled-components";

export const InternshipResponseContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 1500px;
`;
export const SelectMonthSection = styled.div`
    background: #090909;
    width: 100%;
    border-radius: 5px;
    color: #d7d7d7;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    grid-gap: 5px;
    padding: 5px;
    box-sizing: border-box;
`;

export const MonthButton = styled.button`
    background: #080a10;
    color: #b9b9b9;
    border: 1px solid #111111;
    padding: 5px;
    margin: 10px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 18px;

    transition: all 0.3s ease;

    &:hover {
        background: orange;
        color: #101010;
        border: 1px solid #111111;
        scale: 1.1;
    }
`;

export const SelectInternshipSection = styled.div`
    background: #090909;
    width: 100%;
    border-radius: 5px;
    color: #d7d7d7;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-gap: 5px;
    padding: 5px;
`;

export const InternshipButton = styled.button`
    background: #080a10;
    color: #b9b9b9;
    border: 1px solid #111111;
    padding: 10px;
    margin: 5px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 18px;

    transition: all 0.3s ease;

    &:hover {
        background: orange;
        color: #101010;
        border: 1px solid #111111;
        scale: 1.1;
    }
`;
