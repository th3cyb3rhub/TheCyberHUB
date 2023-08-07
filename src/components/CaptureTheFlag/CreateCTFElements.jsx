import styled from "styled-components";

export const CreateCTFContainer = styled.div`
    display: flex;
    max-width: 800px;
    width: 100%;
`;

export const CreateCTFForm = styled.form`
    width: 100%;
    padding: 15px;
`;

export const CreateCTFLabel = styled.label`
    padding: 0.5rem;
    border-radius: 4px;
    box-sizing: border-box;
    width: 100%;
`;

export const CreateCTFInput = styled.input`
    background: #151515;
    color: #d7d7d7;
    border: 1px solid #2f2f2f;
    margin: 0.5rem;
    padding: 0.5rem;
    border-radius: 4px;
    box-sizing: border-box;
    width: 100%;
`;
export const Tags = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

export const AddTag = styled.input`
    background: #151515;
    color: #d7d7d7;
    border: 1px solid #2f2f2f;
    margin: 0.5rem;
    padding: 0.5rem;
    border-radius: 4px;
    box-sizing: border-box;
    width: 150px;
`;

export const CreateCTFTextarea = styled.textarea`
    background: #151515;
    color: #d7d7d7;
    border: 1px solid #2f2f2f;
    font-size: 16px;
    margin: 0.5rem;
    padding: 0.5rem;
    border-radius: 4px;
    box-sizing: border-box;
    width: 100%;
`;

export const CreateCTFButton = styled.button`
    background: #151515;
    color: #d7d7d7;
    border: 1px solid #2f2f2f;
    margin: 0.5rem;
    padding: 0.5rem;
    border-radius: 4px;
    box-sizing: border-box;
    cursor: pointer;
`;

export const AddResourceSection = styled.div`
    background: #080a10;
    padding: 15px;
    border-radius: 5px;
`;

export const AddResourceInputs = styled.div`
    display: flex;
`;

export const FlagsContainer = styled.div`
    display: flex;
    flex-direction: column;
    background: #0a0a0a;
    padding: 15px;
    border-radius: 5px;
`;
export const FlagContainer = styled.div`
    display: flex;
    flex-direction: row;
    background: #0a0a0a;
    padding: 15px;
    border-radius: 5px;
`;

export const PointDropdown = styled.select`
    /* your select styles */
`;
