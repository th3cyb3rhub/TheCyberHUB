import styled from "styled-components";

export const Input = styled.input`
    padding: 5px 10px;
    font-size: 16px;
    width: 100%;
    min-width: 150px;
    max-width: 500px;
    height: 100%;
    flex: 1;
    color: #f5f5f5;
    background: #131313;
    border: 1px solid #212121;
    outline: none; /* Remove outline on click or active */

    &:focus {
        outline: none; /* Remove outline on focus as well */
    }

    &:active {
        background: #5b5b5b;
        transition: all 0.2s ease-in-out;
        border: none;
    }

    @media (width <= 768px) {
        /* Add styles for smaller screens if needed */
    }
`;

export const ReverseShellContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #1a1a1a;
    width: 100%;
    max-width: 1500px;
    border-radius: 5px;
`;

export const ReverseShellHeader = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 25px;
    width: 100%;
    padding: 25px;
    border-radius: 5px;

    /* @media (max-width: 768px) {
       flex-direction: column;
    } */
`;

export const RevShellHeaderSubContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 25px;
    background: rgb(65 65 65 / 48%);
    height: 100%;
    min-height: 150px;
    max-height: 200px;
    width: 100%;
    border-radius: 5px;
`;
export const RevShellHeaderTop = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    font-size: 20px;

    @media (width <= 768px) {
        flex-direction: column;
    }
`;

export const RevShellHeaderMiddle = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 25px;
    width: 100%;

    @media (width <= 768px) {
        flex-direction: column;
    }

    label {
        height: 100%;
        color: #f5f5f5;
        font-size: 1.2rem;
        font-weight: 600;
        background-color: #1e1e1e;
        padding: 5px 10px;
        font-family: "Fira Code", monospace;
    }
`;

export const IpAndPortSubContainer2 = styled.div`
    height: 40px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    label {
        height: 100%;
        color: #f5f5f5;
        font-size: 1.2rem;
        font-weight: 525;
        background-color: #2a2a2a;
        padding: 5px 10px;
    }
`;

export const PortNumberIncAndDec = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5px;
    width: 100%;
    background: #2a2a2a;
    padding: 5px 10px;
    cursor: pointer;
`;

export const Button = styled.button`
    padding: 0.5rem 1rem;
    font-size: 1.3rem;
    font-weight: 525;
    background-color: orange;
    color: #131313;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    border-radius: 5px;
    text-align: center;
    border: 1px solid #212121;
    align-items: center;
    display: flex;
    justify-content: center;

    &:hover {
        background-color: #07b6f6;
        color: #131313;
        scale: 1.01;
        transition: all 0.2s ease-in-out;
    }

    @media (width <= 768px) {
        width: 100%;

        &:hover {
            background-color: #07b6f6;
            color: #363636;
            scale: 1.01;
            transition: all 0.2s ease-in-out;
        }
    }
`;

export const Title = styled.h1`
    background: transparent;
    display: flex;
    justify-content: center;
    margin: 0 0 25px;
    align-items: center;
    gap: 5px;

    @media (width <= 768px) {
        font-size: 1.5rem;
    }
`;

export const Dropdown = styled.select`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    min-width: 15px;
    width: 100%;
    flex: 1;
    color: #f5f5f5;
    background: #131313;
    padding: 10px;
    border: 1px solid #212121;
    border-radius: 5px;
    appearance: auto;
    cursor: pointer;

    &:hover {
        background: #272727;
    }

    &:focus {
        outline: none; /* Remove outline on focus */
        box-shadow: 0 0 0 2px #07b6f6; /* Add a subtle focus border */
    }

    @media (width <= 768px) {
        width: 100%;
    }
`;

export const RevShellBody = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const RevShellBodyContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

export const RevShellBodyTop = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 15px;
    width: 100%;
`;

export const OsSearchContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    max-width: 500px;
    width: 100%;
    height: 40px;
    background: transparent;
    margin: 0 25px;

    label {
        padding: 5px 10px;
        height: 100%;
        color: #f5f5f5;
        font-size: 1.2rem;
        font-weight: 525;
        background-color: #2a2a2a;
    }
`;

export const DownloadSection = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 15px;
    width: 100%;
    height: 100%;
    padding: 12px 10px;
    background: #131313;
    cursor: pointer;
`;

export const RevShellBodyBottom = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    gap: 25px;
    padding: 25px;
`;

export const ShellDisplayContainer = styled.div`
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    background-color: #090909;
    width: 100%;
    min-width: 200px;
    max-width: 250px;
    border-radius: 10px;
`;

export const ShellList = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    gap: 5px;
    padding: 5px;
    overflow-y: auto;
    max-height: 650px;
    min-height: 200px;
`;

export const KeyContainer = styled.div`
    display: flex;
    width: 100%;
    cursor: pointer;
    border-radius: 5px;
    background-color: #1a1a1a;
    padding: 5px 10px;

    &:hover {
        background-color: #07b6f6;
        color: #131313;
        scale: 1.01;
        transition: all 0.2s ease-in-out;
    }

    &:active {
        background-color: #5b5b5b;
        scale: 1.01;
        transition: all 0.2s ease-in-out;
    }
`;

export const CommandDisplayContainer = styled.div`
    background-color: #090909;
    max-width: 800px;
    width: 100%;
    border-radius: 10px;
    padding: 5px;
`;

export const CommandContentContainer = styled.div`
    background-color: #1a1a1a;
    border-radius: 10px;
    padding: 10px;
`;

export const CommandTitle = styled.h3`
    padding: 10px;
    font-family: "Fira Code", monospace;
    color: #f5f5f5;
`;
