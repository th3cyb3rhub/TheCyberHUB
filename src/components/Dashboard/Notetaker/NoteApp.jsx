import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { NotesContainer } from "./NoteElements";
import "./NoteApp.css";
import NoteDescription from "./NoteDescription";
import { getNotes, noteReset, pinNote } from "src/features/notes/notesSlice";
import { CategorySidebar } from "./Category";
import NoteSidebar from "./NoteSidebar";
import { toast } from "react-toastify";
import { notesCategoryReset, getNotesCategories } from "src/features/notes/notesCategory/notesCategorySlice";

const defaultCategory = {
    name: "All Notes",
    _id: "All-Notes!",
};

const NoteApp = () => {
    const dispatch = useDispatch();
    const { notes, isNoteLoading, isNoteError, noteMessage } = useSelector((state) => state.notes);
    const { notesCategories, isNotesCategoryLoading, isNotesCategoryError, notesCategoryMessage } = useSelector(
        (state) => state.notesCategories,
    );
    const [pickedCategory, setPickedCategory] = useState(defaultCategory);
    const [pickedNote, setPickedNote] = useState({});
    const [categoryOptionMode, setCategoryOptionMode] = useState(false);
    const [needToAdd, setNeedToAdd] = useState(false);

    useEffect(() => {
        if (isNotesCategoryError) {
            toast.error(notesCategoryMessage);
            // console.log(notesCategoryMessage);
        }
        dispatch(getNotesCategories());
        return () => dispatch(notesCategoryReset());
    }, [dispatch, isNotesCategoryError, notesCategoryMessage]);

    useEffect(() => {
        if (categoryOptionMode || isNotesCategoryLoading) return;
        if (isNoteError) {
            console.log(noteMessage);
        }
        dispatch(getNotes());
        return () => dispatch(noteReset());
    }, [dispatch, isNoteError, noteMessage, categoryOptionMode, isNotesCategoryLoading]);

    const handleCloseMDEditorMode = () => {
        setNeedToAdd(false);
        setPickedNote({});
    };

    const handlePinNote = (noteId) => {
        const pinnedNote = notes.find((note) => note._id === noteId);
        const noteData = {
            ...pinnedNote,
            pinned: !pinnedNote.pinned,
        };
        dispatch(pinNote({ id: noteId, noteData }));
    };

    if (isNoteLoading) {
        return "loading";
    }

    return (
        <NotesContainer>
            <CategorySidebar
                pickedCategory={pickedCategory}
                onPick={setPickedCategory}
                onUnpickNote={handleCloseMDEditorMode}
                setCopyCategoryOptionMode={setCategoryOptionMode}
                categories={notesCategories}
                isCategoryLoading={isNotesCategoryLoading}
                defaultCategory={defaultCategory}
            />
            <NoteSidebar
                categoryOptionMode={categoryOptionMode}
                pickedCategory={pickedCategory}
                pickedNote={pickedNote}
                onPickNote={setPickedNote}
                onNeedToAddNote={setNeedToAdd}
                onPinNote={handlePinNote}
                notes={notes}
                isNoteLoading={isNoteLoading}
                isCategoryLoading={isNotesCategoryLoading}
                defaultCategory={defaultCategory}
            />

            <NoteDescription
                onPin={handlePinNote}
                needToAdd={needToAdd}
                onCloseAddMode={handleCloseMDEditorMode}
                onChangePickedNote={setPickedNote}
                pickedCategory={pickedCategory}
                defaultCategory={defaultCategory}
            >
                {pickedNote}
            </NoteDescription>
        </NotesContainer>
    );
};

export default NoteApp;
