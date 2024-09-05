import React, { useEffect, useState } from "react";
import { MdCreateNewFolder } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import { BiTrash } from "react-icons/bi";
import { FaToggleOff, FaToggleOn } from "react-icons/fa6";

import {
    CategoriesSidebarContainer,
    CategoriesSidebarHeader,
    CategoriesSidebarHeaderTitle,
    CategoryCreateContainer,
    DeleteCategoryContainer,
    DeleteCategorySpan,
    FunctionalityContainer,
    MultiSelectContainer,
    ToggleButton,
} from "./CategoryElements";

import CategoryList from "./CategoryList";
import LoadingSpinner from "src/components/Other/MixComponents/Spinner/LoadingSpinner";
import ModifyCategory from "./ModifyCategory";
import { createNotesCategory, deleteNotesCategory } from "src/features/notes/notesCategory/notesCategorySlice";
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
    const [showDeleteAll, setShowDeleteAll] = useState(false);
    const [selectedCategoriesIds, setSelectedCategoriesIds] = useState([]);
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

    const deleteAllCategories = () => {
        const userConfirmed = window.confirm("Are you sure you want to delete all selected categories?");
        if (userConfirmed) {
            selectedCategoriesIds?.map((categoryId) => dispatch(deleteNotesCategory(categoryId)));
            setSelectedCategoriesIds([]);
        }
    };

    const handleToggleSelectCategory = (categoryId) => {
        setSelectedCategoriesIds((prevSelectedCategoriesIds) => {
            if (!prevSelectedCategoriesIds.includes(categoryId)) {
                return [...prevSelectedCategoriesIds, categoryId];
            } else {
                return [...prevSelectedCategoriesIds.filter((selectedCategoryId) => selectedCategoryId !== categoryId)];
            }
        });
    };
    const handleToggleMultiSelectMode = (multiSelectShow) => {
        setShowDeleteAll(multiSelectShow);
        setSelectedCategoriesIds([]);
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
                        onPick={!showDeleteAll && onPick}
                        pickedCategory={pickedCategory}
                        defaultCategory={defaultCategory}
                        showCheckboxes={showDeleteAll}
                    >
                        {[defaultCategory]}
                    </CategoryList>
                    <CategoryList
                        addMode={modalOpenMode}
                        onPick={!showDeleteAll && onPick}
                        pickedCategory={pickedCategory}
                        defaultCategory={defaultCategory}
                        onEditCategory={setEditCategory}
                        editCategoryId={editCategory}
                        showCheckboxes={showDeleteAll}
                        onToggleSelectCategory={handleToggleSelectCategory}
                        selectedCategoriesIds={selectedCategoriesIds}
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
            <FunctionalityContainer>
                <MultiSelectContainer
                    $showDeleteAll={showDeleteAll}
                    onClick={() => handleToggleMultiSelectMode(!showDeleteAll)}
                >
                    {showDeleteAll ? <FaToggleOn /> : <FaToggleOff />}
                    <ToggleButton $showDeleteAll={showDeleteAll}>Multi Select</ToggleButton>
                </MultiSelectContainer>
                {showDeleteAll && selectedCategoriesIds?.length > 0 && (
                    <DeleteCategoryContainer onClick={deleteAllCategories}>
                        <BiTrash size="25px" fill="red" />
                        <DeleteCategorySpan>Delete All</DeleteCategorySpan>
                    </DeleteCategoryContainer>
                )}
            </FunctionalityContainer>
        </CategoriesSidebarContainer>
    );
};

export default CategorySidebar;
