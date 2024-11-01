import styled from "styled-components";

export const Wrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 20px 0;
    margin-top: 100px;
`;

export const Container = styled.div`
    width: 100%;
    max-width: 1400px;
    background-color: #0e0e0e;
    padding: 15px;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgb(0 0 0 / 20%);
    overflow: hidden;
    display: flex;
`;

export const EditorContainer = styled.div`
    width: 100%;
    max-width: 500px;
    max-height: 700px;
    position: relative;
    background-color: #101010;
    padding: 16px;
    border-radius: 8px;
    box-shadow: inset 0 2px 4px rgb(0 0 0 / 20%);
`;

export const Editor = styled.textarea`
    width: 100%;
    color: #f8f8f2;
    font-size: 16px;
    padding: 12px;
    height: 100%;
    background-color: transparent;
    font-family: "Fira Code", monospace;
    outline: none;
    border: none;
    resize: none;
    line-height: 1.6;
    border-radius: 8px;
    overflow: auto;
`;

export const Settings = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    background-color: #121212;
    border-bottom: 1px solid #333;
`;

export const LanguageSelect = styled.select`
    background-color: #1c1c1c;
    color: #fff;
    border: none;
    padding: 8px 12px;
    border-radius: 6px;
    margin-right: 10px;
    font-size: 14px;
`;

export const BackgroundColorInput = styled.input`
    width: 40px;
    height: 40px;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    margin-right: 10px;

    &::-webkit-color-swatch-wrapper {
        padding: 0;
    }

    &::-webkit-color-swatch {
        border: none;
        border-radius: 50%;
    }
`;

export const ButtonGroup = styled.div`
    display: flex;
    align-items: center;
`;

export const ThemeToggle = styled.button`
    background-color: #333;
    color: #fff;
    border: none;
    padding: 8px;
    border-radius: 6px;
    margin-right: 10px;
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #444;
    }
`;

export const CopyButton = styled.button`
    background-color: #333;
    color: #fff;
    border: none;
    padding: 8px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #444;
    }
`;

export const CodeContainer = styled.div`
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 100%;
    overflow: auto;
    margin-top: 20px;
    background-color: #171717;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgb(0 0 0 / 20%);
`;
