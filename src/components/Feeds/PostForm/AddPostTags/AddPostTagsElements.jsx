import styled from "styled-components";
import { BiMinus, BiPlus } from "react-icons/bi";

export const TagsInputContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-start;
    gap: 5px;
    //padding: 10px 0;
    border: ${(props) => (props.size === "lg" ? "#222222 1px solid" : "transparent")};
    background: ${(props) => (props.size === "lg" ? "#0c0c0c" : "transparent")};
`;

export const TagsInput = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    flex-direction: row;
    color: #f5f5f5;
    text-underline-offset: 5px;
    font-family: "Poppins", sans-serif;
    gap: 5px;
    //border: #222222 1px solid;

    // props
    font-size: ${(props) => (props.size === "lg" ? "11rem" : "0.8rem")};
`;

export const TagInput = styled.input`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    border-radius: 5px;
    //background: transparent;
    background: #2d2d2d;
    color: #f5f5f5;
    text-underline-offset: 5px;
    //border: #222222 1px solid;
    border: transparent;
    transition: all 0.1s ease-in-out;

    font-family: "Poppins", sans-serif;

    font-size: ${(props) => (props.size === "lg" ? "13px" : "11px")};
    padding: ${(props) => (props.size === "lg" ? "3px 5px" : "2px 5px")};

    ::placeholder {
        //transition: all 0.1s ease-in-out;
        color: #f5f5f5;
    }

    &:focus {
        transition: all 0.2s ease-in-out;
        outline: none;
    }
`;

export const IconAdd = styled(BiPlus)`
    font-size: 18px;
    padding: 1px;
    border-radius: 5px;
    cursor: pointer;
    color: #f5f5f5;
    background: #1a1c1d;
    transition: all 0.2s ease-in-out;

    &:hover {
        background: #26292a;
        color: #f5f5f5;
        transition: all 0.2s ease-in-out;
        padding: 0;
    }
`;
export const IconRemove = styled(BiMinus)`
    font-size: 18px;
    padding: 1px;
    border-radius: 5px;
    cursor: pointer;
    color: #f5f5f5;
    background: #1a1c1d;
    transition: all 0.2s ease-in-out;

    &:hover {
        background: #26292a;
        color: #f5f5f5;
        transition: all 0.2s ease-in-out;
        padding: 0;
    }
`;

export const Submit = styled.button`
    padding: 10px;
    margin: 10px 0;
    background: #111213;
    border: transparent;
    color: #f5f5f5;
    border-radius: 5px;
    width: 100%;
    cursor: pointer;
    font-size: 13px;
    font-family: "Roboto", sans-serif;
    transition: all 0.2s ease-in-out;

    &:hover {
        background: #282a2c;
        color: #f5f5f5;
        transition: all 0.2s ease-in-out;
    }
`;
