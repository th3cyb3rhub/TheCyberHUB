import React, { useEffect, useState } from "react";
import { SlOptionsVertical } from "react-icons/sl";
import { TbEditCircle } from "react-icons/tb";
import { AiTwotoneDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";

import {
    CategoryItemElement,
    CategoryItemElementContainer,
    CategoryItemShortTitle,
    CategoryMenuButton,
    CategoryMenuButtonLabel,
    CategoryMenuButtons,
    CategoryOptionsMenuContainer,
} from "./CategoryElements";
import { deleteNotesCategory, updateNotesCategory } from "src/features/notes/notesCategory/notesCategorySlice";
import "src/components/Dashboard/Notetaker/NoteApp.css";
import ModifyCategory from "./ModifyCategory";
import { toast } from "react-toastify";

const CategoryItem = ({
    category,
    onPick,
    isPicked,
    id,
    requiredCategory,
    defaultCategory,
    onEditCategory,
    stillEditing,
}) => {
    const dispatch = useDispatch();
    const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
    const [editCategory, setEditCategory] = useState(false);

    const handleOpenCategoryMenu = (categoryMenuOption) => {
        setIsCategoryMenuOpen(categoryMenuOption);
    };
    useEffect(() => {
        return setIsCategoryMenuOpen(false);
    }, [stillEditing]);
    const handleEditCategory = (option) => {
        setEditCategory(option);
        onEditCategory(id);
    };
    const handleCloseEdit = () => {
        handleEditCategory(false);
        handleOpenCategoryMenu(false);
        onEditCategory("");
    };
    const handleDeleteCategory = () => {
        dispatch(deleteNotesCategory(id)).then(() => {
            onPick({});
        });
    };

    const handleSave = (categoryName) => {
        if (categoryName === defaultCategory.name) {
            toast.error(`You can't use ${defaultCategory.name} as category name`);
            return;
        }
        dispatch(updateNotesCategory({ id, categoryData: { name: categoryName } }));
        onPick({});
        handleCloseEdit();
    };

    if (requiredCategory) {
        return (
            <CategoryItemElementContainer>
                <CategoryItemElement onClick={() => onPick(category)} $isPicked={isPicked}>
                    <CategoryItemShortTitle>{category.name.slice(0, 23)}</CategoryItemShortTitle>
                </CategoryItemElement>
            </CategoryItemElementContainer>
        );
    }

    return (
        <>
            {editCategory && stillEditing ? (
                <ModifyCategory
                    onSave={handleSave}
                    onCancel={handleCloseEdit}
                    editCategoryName={category.name}
                    pickedCategoryId={id}
                />
            ) : (
                <CategoryItemElementContainer>
                    <CategoryItemElement onClick={() => onPick(category)} $isPicked={isPicked}>
                        <CategoryItemShortTitle>{category.name.slice(0, 23)}</CategoryItemShortTitle>
                    </CategoryItemElement>
                    <CategoryOptionsMenuContainer>
                        <SlOptionsVertical
                            size="16"
                            className="icon icon-options"
                            onClick={() => handleOpenCategoryMenu(!isCategoryMenuOpen)}
                        />
                        {isCategoryMenuOpen && (
                            <CategoryMenuButtons onMouseLeave={() => handleOpenCategoryMenu(false)}>
                                <CategoryMenuButton onClick={() => handleEditCategory(true)}>
                                    <TbEditCircle className="icon icon-edit icon-not-hover-effect" size="18px" />
                                    <CategoryMenuButtonLabel>Edit</CategoryMenuButtonLabel>
                                </CategoryMenuButton>
                                <CategoryMenuButton onClick={handleDeleteCategory}>
                                    <AiTwotoneDelete className="icon icon-delete icon-not-hover-effect" size="18px" />
                                    <CategoryMenuButtonLabel>Delete</CategoryMenuButtonLabel>
                                </CategoryMenuButton>
                            </CategoryMenuButtons>
                        )}
                    </CategoryOptionsMenuContainer>
                </CategoryItemElementContainer>
            )}
        </>
    );
};
export default CategoryItem;
