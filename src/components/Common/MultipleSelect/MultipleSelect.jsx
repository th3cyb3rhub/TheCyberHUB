import React from "react";
import { Option, Select, SelectContainer } from "./MultipleSelectElements";
import styled from "styled-components";

/*
optionsValuesWithLabels=[
    {
        value: string;
        label: string;
    }
]
*/
const MultipleSelect = ({ selectLabel, selectedValue, onValueSelect, optionsValuesWithLabels, defaultValue }) => {
    const optionsDisplay = optionsValuesWithLabels.map((option) => {
        return (
            <Option value={option.value} key={option.value}>
                {option.label}
            </Option>
        );
    });
    return (
        <SelectContainer>
            {selectLabel && <StyledLabel htmlFor="Select">{selectLabel}:</StyledLabel>}
            <Select
                name={selectLabel.toLowerCase()}
                value={defaultValue || selectedValue}
                onChange={(event) => onValueSelect(event.target.value)}
            >
                {optionsDisplay}
            </Select>
        </SelectContainer>
    );
};

const StyledLabel = styled.label`
    color: #d7d7d7;
`;
export default MultipleSelect;
