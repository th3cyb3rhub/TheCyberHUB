import React, { useEffect, useState } from "react";
import { MdOutlineCancel } from "react-icons/md";
import { FaSave } from "react-icons/fa";

import { ModifyCategoryModalButtons, ModifyCategoryModalContainer, ModifyCategoryModalInput } from "./CategoryElements";

const ModifyCategory = ({ onSave, onCancel, editCategoryName = "" }) => {
    const [value, setValue] = useState("");

    useEffect(() => {
        setValue(editCategoryName);
    }, [editCategoryName]);

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    return (
        <ModifyCategoryModalContainer>
            <ModifyCategoryModalInput type="text" onChange={handleChange} value={value} placeholder={"Category Name"} />
            <ModifyCategoryModalButtons>
                <FaSave className="icon icon-save" size="18px" title="Save" onClick={() => onSave(value)} />
                <MdOutlineCancel className="icon icon-cancel" size="18px" title="Cancel" onClick={onCancel} />
            </ModifyCategoryModalButtons>
        </ModifyCategoryModalContainer>
    );
};
export default ModifyCategory;
