import styled from "styled-components";

export const ReconageContainer = styled.div`
    display: flex;
    gap: 20px;
    padding: 20px;
`;

export const EditorContainer = styled.div`
    flex: 1;
`;

export const ExplanationContainer = styled.div`
    flex: 1;
    overflow-y: auto;
`;

export const SubmitButton = styled.button`
    margin-top: 10px;
    padding: 10px 20px;
    background-color: #4caf50;
    color: white;
    border: none;
    cursor: pointer;

    &:hover {
        background-color: #45a049;
    }
`;

export const ResultMessage = styled.p`
    color: ${(props) => (props.success ? "green" : "red")};
    font-weight: bold;
`;
