import React from "react";

const CheckBoxClickable = ({ value, onChangeValue, disabled, ...props }) => {
    if (disabled) return <input {...props} disabled={true} />;

    const handleCheckBoxChange = (e) => {
        const textOfCheckBox = e.target.parentNode.textContent;
        const valueListOfLines = value.split("\n");
        const findCheckedBoxLineIndex = valueListOfLines.findIndex(
            (item) => item?.replace(/- \[ \]|- \[[^]]+/, "") === textOfCheckBox.split("\n")[0],
        );
        valueListOfLines[findCheckedBoxLineIndex] = valueListOfLines[findCheckedBoxLineIndex].replace(
            /- \[ \]|- \[[^]]+/,
            (match) => (match === "- [ ]" ? "- [X]" : "- [ ]"),
        );
        onChangeValue(valueListOfLines.join("\n"));
    };

    return (
        <input
            {...props}
            disabled={false}
            onChange={(e) => {
                if (props.type === "checkbox") {
                    const isChecked = e.target.hasAttribute("checked");
                    handleCheckBoxChange(e);
                    if (isChecked) {
                        e.target.removeAttribute("checked");
                    } else {
                        e.target.setAttribute("checked", "checked");
                    }
                }
            }}
        />
    );
};
export default CheckBoxClickable;
