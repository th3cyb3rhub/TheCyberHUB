import styled, { css } from "styled-components";

export const InputEditorContainer = styled.div`
    width: 100%;
`;
const InputEditorField = css`
    padding: 7px 12px;
    color: white;
    width: 100%;
    border-radius: 3px;
    border: 1px solid #111;
    box-shadow: 0 0 0 2px #090909;
    outline: none;
    text-transform: capitalize;
    background-color: #090909;
    font:
        16px Poppins,
        sans-serif;
    line-height: 1;
`;
export const InputEditorTheInput = styled.input`
    ${InputEditorField}
`;

export const InputEditorTextarea = styled.textarea`
    ${InputEditorField}
    resize: none;
    height: ${(props) => props.textAreaHeight};
`;

export const InputEditorLabel = styled.h2`
    text-transform: capitalize;
    text-align: center;
    color: #4f4f4f;
`;
