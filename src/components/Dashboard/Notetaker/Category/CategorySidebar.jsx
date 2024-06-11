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
import { createNotesCategory, deleteNotesCategory } from "src/features/notes/notesCategory/notesCategorySlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { BiTrash } from "react-icons/bi";

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
    const { selectedCategories } = useSelector((state) => state.notesCategories);

    const deleteAllCategories = () => {
        const userConfirmed = window.confirm("Are you sure you want to delete all selected categories?");
        if (userConfirmed) {
            selectedCategories.map((e) => dispatch(deleteNotesCategory(e)));
        }
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
                    {selectedCategories.length > 0 ? (
                        <div
                            onClick={deleteAllCategories}
                            style={{ display: "flex", alignItems: "center", marginLeft: "10px" }}
                        >
                            <BiTrash size="25px" fill="red" />
                            <span style={{ marginRight: "5px", color: "orange" }}>Delete All</span>
                        </div>
                    ) : null}

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
