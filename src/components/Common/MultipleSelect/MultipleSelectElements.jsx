import styled from "styled-components";

export const Select = styled.select`
    border: 1px solid #000;
    padding: 8px;
    font-size: 16px;
    width: 100%;
    border-radius: 4px;
    background: #252525;
    color: #d7d7d7;

    &:focus {
        outline: none;
        box-shadow: 0 0 0 1px #1a1c1d;
    }

    @media screen and (width <= 380px) {
        width: 100%;
    }

    text-transform: capitalize;
`;

// Option Component
export const Option = styled.option`
    border: 1px solid #000;
    font-size: 16px;

    &:focus {
        outline: none;
        box-shadow: 0 0 0 1px #1a1c1d;
    }

    text-transform: capitalize;
`;
export const SelectContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    background: #131313;
    border-radius: 4px;
    padding: 0 0 0 10px;

    @media screen and (width <= 380px) {
        width: 100%;
    }
`;
