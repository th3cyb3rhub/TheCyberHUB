import React, { useEffect, useState } from "react";
import { MdNoteAdd } from "react-icons/md";

import SearchInputBox from "src/components/Common/SearchInputBox";
import { NotesSidebarContainer, NotesSidebarHeader, NotesSidebarHeaderTitle, SearchContainer } from "./NoteElements";
import LoadingSpinner from "src/components/Other/MixComponents/Spinner/LoadingSpinner";
import NoteList from "./NoteList";
import "./NoteApp.css";

const NoteSidebar = ({
    categoryOptionMode,
    pickedCategory,
    pickedNote,
    onPickNote,
    onNeedToAddNote,
    onPinNote,
    notes,
    isNoteLoading,
    isCategoryLoading,
    defaultCategory,
}) => {
    const [filteredNotes, setFilteredNotes] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const newFilteredNotes = notes?.filter((note) => {
            const searchedNote =
                note?.title?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
                note?.content?.toLowerCase().includes(searchTerm?.toLowerCase());
            if (!searchedNote) return false;
            if (Object.keys(pickedCategory).length === 0) return false;
            if (pickedCategory.name === defaultCategory.name) {
                return true;
            }
            return note.category.toLowerCase() === pickedCategory.name.toLowerCase();
        });
        setFilteredNotes(newFilteredNotes);
        onPickNote({});
    }, [searchTerm, notes, pickedCategory]);

    const handleSearchTermChange = (e) => {
        setSearchTerm(e.target.value);
    };
    const handleOpenAddNewNoteMode = () => {
        onNeedToAddNote(true);
        onPickNote({});
    };

    const handlePickNote = (noteId) => {
        const pickedNote = notes.find((note) => note._id === noteId);
        onNeedToAddNote(false);
        onPickNote(
            pickedNote === -1
                ? {}
                : pickedNote.title.includes("UntitledNote")
                ? { ...pickedNote, title: "" }
                : pickedNote,
        );
    };

    return (
        <NotesSidebarContainer className={categoryOptionMode ? "slide-out" : "slide-in"}>
            <NotesSidebarHeader>
                <NotesSidebarHeaderTitle>
                    {(pickedCategory && pickedCategory.name) || "Please, Pick Category"}
                </NotesSidebarHeaderTitle>
            </NotesSidebarHeader>
            <SearchContainer>
                <SearchInputBox
                    placeholder="Search Note"
                    value={searchTerm}
                    onChange={handleSearchTermChange}
                    setValue={setSearchTerm}
                />
                <MdNoteAdd
                    className="icon icon-add"
                    style={{ marginLeft: "5px", marginRight: "5px" }}
                    size="24px"
                    title="New Note"
                    onClick={handleOpenAddNewNoteMode}
                />
            </SearchContainer>

            {isNoteLoading ? (
                <LoadingSpinner />
            ) : (
                !isCategoryLoading && (
                    <NoteList onPin={onPinNote} onPick={handlePickNote} pickedNoteId={pickedNote._id}>
                        {filteredNotes}
                    </NoteList>
                )
            )}
        </NotesSidebarContainer>
    );
};
export default NoteSidebar;
