import React, { useEffect, useState } from "react";
import { MdCreateNewFolder } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";

import {
    CategoriesSidebarContainer,
    CategoriesSidebarHeader,
    CategoriesSidebarHeaderTitle,
    CategoryCreateContainer,
} from "./CategoryElements";
import CategoryList from "./CategoryList";
import LoadingSpinner from "src/components/Other/MixComponents/Spinner/LoadingSpinner";
import ModifyCategory from "./ModifyCategory";
import { createNotesCategory } from "src/features/notes/notesCategory/notesCategorySlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const CategorySidebar = ({
    pickedCategory,
    onPick,
    onUnpickNote,
    setCopyCategoryOptionMode,
    categories,
    isCategoryLoading,
    defaultCategory,
}) => {
    const dispatch = useDispatch();
    const [modalOpenMode, setModalOpenMode] = useState(false);
    const [categoryOptionMode, setCategoryOptionMode] = useState(false);
    const [editCategory, setEditCategory] = useState("");

    useEffect(() => {
        if (!categories.length && categoryOptionMode) handleCloseOptionsMode();
    }, [categories]);

    useEffect(() => {
        setCopyCategoryOptionMode(categoryOptionMode);
    }, [categoryOptionMode]);
    const handleCreateCategory = () => {
        setModalOpenMode(true);
        onUnpickNote();
    };

    const handleCloseModal = () => {
        setModalOpenMode(false);
    };

    const handleSave = (categoryName) => {
        if (categoryName === defaultCategory.name) {
            toast.error(`You can't use ${defaultCategory.name} as category name`);
            return;
        }
        dispatch(createNotesCategory({ name: categoryName }));
        handleCloseModal();
    };

    const handleCloseOptionsMode = () => {
        setCategoryOptionMode(false);
        handleCloseModal();
        onPick({});
    };

    return (
        <CategoriesSidebarContainer>
            <CategoriesSidebarHeader>
                <RxHamburgerMenu className="icon" size="20px" title="Menu" />
                <CategoriesSidebarHeaderTitle>Notes</CategoriesSidebarHeaderTitle>
                <MdCreateNewFolder
                    className="icon icon-add"
                    size="20px"
                    title="New Category"
                    onClick={
                        editCategory
                            ? () => {
                                  handleCreateCategory();
                                  setEditCategory("");
                              }
                            : handleCreateCategory
                    }
                />
            </CategoriesSidebarHeader>
            {isCategoryLoading ? (
                <LoadingSpinner />
            ) : (
                <>
                    <CategoryList
                        required
                        onPick={onPick}
                        pickedCategory={pickedCategory}
                        defaultCategory={defaultCategory}
                    >
                        {[defaultCategory]}
                    </CategoryList>
                    <CategoryList
                        addMode={modalOpenMode}
                        onPick={onPick}
                        pickedCategory={pickedCategory}
                        defaultCategory={defaultCategory}
                        onEditCategory={setEditCategory}
                        editCategoryId={editCategory}
                    >
                        {categories}
                    </CategoryList>
                    {modalOpenMode && (
                        <CategoryCreateContainer>
                            <ModifyCategory onSave={handleSave} onCancel={handleCloseModal} editCategoryName="" />
                        </CategoryCreateContainer>
                    )}
                </>
            )}
        </CategoriesSidebarContainer>
    );
};
export default CategorySidebar;
