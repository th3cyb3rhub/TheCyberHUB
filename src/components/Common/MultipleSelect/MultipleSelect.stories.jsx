import React from "react";
import MultipleSelect from "./MultipleSelect";
import { Option, SelectContainer } from "./MultipleSelectElements";

export default {
    title: "Components/MultipleSelect/MultipleSelect",
    component: MultipleSelect,
};

const Template = ({ optionsValuesWithLabels, ...args }) => (
    <MultipleSelect {...args} optionsValuesWithLabels={optionsValuesWithLabels}>
        <SelectContainer>
            <select>
                {optionsValuesWithLabels.map((option) => (
                    <Option style key={option.value} value={option.value}>
                        {option.label}
                    </Option>
                ))}
            </select>
        </SelectContainer>
    </MultipleSelect>
);

export const Default = Template.bind({});
Default.args = {
    selectLabel: "Label",
    selectedValue: "",
    defaultValue: "",
    optionsValuesWithLabels: [
        { value: "1", label: "Option 1" },
        { value: "2", label: "Option 2" },
        { value: "3", label: "Option 3" },
    ],
};
