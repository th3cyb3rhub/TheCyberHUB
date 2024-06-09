import styled from "styled-components";

export const StyledCheckbox = styled.input.attrs({ type: "checkbox" })`
    appearance: none;
    width: 20px;
    height: 20px;
    background-color: #fff;
    border: 2px solid #007bff;
    border-radius: 50%;
    display: inline-block;
    position: relative;
    cursor: pointer;

    &:checked {
        background-color: #007bff;
        border: 2px solid #fff;

        &::after {
            content: "";
            position: absolute;
            top: 2px;
            left: 6px;
            width: 4px;
            height: 10px;
            border: solid white;
            border-width: 0 2px 2px 0;
            transform: rotate(45deg);
        }
    }
`;
