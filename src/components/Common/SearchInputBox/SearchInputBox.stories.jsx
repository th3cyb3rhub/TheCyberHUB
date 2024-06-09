import React, { useState, useRef } from "react";
import SearchInputBox from "./SearchInputBox";

export default {
    title: "Components/Search/SearchInputBox",
    component: SearchInputBox,
};

const Template = (args) => {
    const [searchValue, setSearchValue] = useState(args.value || "");
    const inputRef = useRef(null);

    const handleChange = (event) => {
        setSearchValue(event.target.value);
        args.onChange(event.target.value);
    };

    const clearValue = () => {
        setSearchValue("");
        args.setValue("");
        inputRef.current.focus();
    };

    return (
        <SearchInputBox
            {...args}
            value={searchValue}
            onChange={handleChange}
            setValue={setSearchValue}
            inputRef={inputRef}
            clearValue={clearValue}
        />
    );
};

export const Default = Template.bind({});
Default.args = {
    placeholder: "Search...",
    value: "",
};
