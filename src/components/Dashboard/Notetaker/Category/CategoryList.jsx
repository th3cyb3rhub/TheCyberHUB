import React from "react";
import { CategoriesListContainer, CategoriesListNoFound } from "./CategoryElements";
import CategoryItem from "./CategoryItem";
import { Reorder, motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { notesCategoryReorder } from "src/features/notes/notesCategory/notesCategorySlice";

const CategoryList = ({
    required,
    children,
    onPick,
    pickedCategory,
    addMode,
    defaultCategory,
    onEditCategory,
    editCategoryId,
}) => {
    const dispatch = useDispatch();
    return (
        <CategoriesListContainer required={required} $addMode={addMode}>
            {!children.length && !addMode && (
                <CategoriesListNoFound>There Are No {<br />} Unique Categories</CategoriesListNoFound>
            )}
            <Reorder.Group
                values={children}
                onReorder={(newValues) => {
                    return dispatch(notesCategoryReorder(newValues));
                }}
            >
                {children.map((category) => (
                    <Reorder.Item key={category._id} value={category}>
                        <motion.ul whileHover={{ scale: 0.9 }}>
                            <CategoryItem
                                key={category.name}
                                id={category._id}
                                category={category}
                                onPick={onPick}
                                isPicked={category.name === pickedCategory.name}
                                requiredCategory={required}
                                defaultCategory={defaultCategory}
                                onEditCategory={onEditCategory}
                                stillEditing={editCategoryId === category._id}
                            />
                        </motion.ul>
                    </Reorder.Item>
                ))}
            </Reorder.Group>
        </CategoriesListContainer>
    );
};
export default CategoryList;
