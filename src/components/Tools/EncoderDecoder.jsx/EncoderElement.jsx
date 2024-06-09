import styled from "styled-components";

export const Container = styled.div`
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;
export const MenuContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;
export const MenuButtonContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    margin-top: 20px;
`;
export const MenuButton = styled.div`
    height: 40px;
    width: 85px;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
        cursor: pointer;
    }
`;
export const CodeContainer = styled.div`
    width: 100%;
    background-color: #1a1c1d;
    padding: 20px;
`;
export const Button = styled.button`
    background: #ff6b08;
    padding: 10px;
`;

export const Input = styled.input`
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: none;
    border-radius: 5px;
    background-color: #1a1c1d;
    color: white;

    &:focus {
        outline: none;
    }
`;
