import styled from "styled-components";

export const DisplayDate = styled.p`
    width: 50%;
    margin-right: 10px;
`;
export const DisplayDateContainer = styled.div`
    width: 100%;
    margin-right: 10px;
`;

export const TimeInputEditorContainer = styled.div`
    width: ${({ dateFieldType }) => (dateFieldType === "show date" || dateFieldType === "pick date" ? "45%" : "100%")};
`;

export const TimeInputLabel = styled.p`
    margin: 0 10px;
`;

export const TimePickerContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 10px;
`;
