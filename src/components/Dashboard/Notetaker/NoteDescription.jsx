import React, { useCallback, useEffect, useState } from "react";
import {
    DescriptionDisplayTitle,
    DescriptionTitle,
    NotesDescription,
    NotesDescriptionContainer,
    NotesDescriptionHeader,
    NotesDescriptionIconsContainer,
} from "./NoteElements";
import { MdOutlineCancel } from "react-icons/md";
import NotePinning from "./NotePinning";
import MarkdownEditor from "src/components/Common/MarkdownEditor";
import InputEditor from "src/components/Common/InputEditor";
import { useDispatch } from "react-redux";
import { createNote, updateNote, deleteNote } from "src/features/notes/notesSlice";
import { FaSave } from "react-icons/fa";
import { TbEditCircle } from "react-icons/tb";
import { AiTwotoneDelete } from "react-icons/ai";
import { RiMore2Fill } from "react-icons/ri";

const NoteDescription = ({
    children,
    pickedCategory,
    onPin,
    needToAdd,
    onCloseAddMode,
    onChangePickedNote,
    defaultCategory,
}) => {
    const dispatch = useDispatch();
    const [showNote, setShowNote] = useState(children || {});
    const [needToEdit, setNeedToEdit] = useState(false);
    const [categoryName, setCategoryName] = useState("");

    useEffect(() => {
        setShowNote(children);
        setNeedToEdit(false);
    }, [children]);

    useEffect(() => {
        setCategoryName(() => {
            if (pickedCategory.name === defaultCategory.name) return "notes";
            return pickedCategory.name;
        });
    }, [pickedCategory]);

    const handleDeleteNote = () => {
        dispatch(deleteNote(children._id));
        setShowNote({});
    };
    const handleClose = () => {
        if (needToEdit) {
            setShowNote(children);
            setNeedToEdit(false);
            return;
        }
        onCloseAddMode(false);
        setShowNote({});
    };

    const handleCopyNoteData = useCallback((label, content) => {
        setShowNote((prevCopyNote) => {
            if (label === "description") label = "content";
            return {
                ...prevCopyNote,
                [label]: content,
            };
        });
    });

    const handleSaveNote = (newNote) => {
        if (!newNote.title && !newNote.content) {
            dispatch(deleteNote(newNote._id));
            onChangePickedNote({});
            handleClose();
            return;
        }
        if (needToEdit) {
            dispatch(
                updateNote({
                    id: children._id,
                    category: categoryName,
                    noteData: newNote,
                }),
            );
        } else if (needToAdd) {
            dispatch(
                createNote({
                    category: categoryName,
                    ...newNote,
                }),
            );
        }
        onChangePickedNote(newNote);
        handleClose();
    };
    return (
        <NotesDescriptionContainer>
            <NotesDescriptionHeader>
                {!needToAdd && !needToEdit && (showNote.title || showNote.content) && (
                    <NotesDescriptionIconsContainer icons={3}>
                        <TbEditCircle className="icon icon-edit" size="18px" title="Edit" onClick={setNeedToEdit} />
                        <NotePinning isPinned={showNote.pinned} onPin={onPin} noteId={showNote._id} />
                        <AiTwotoneDelete
                            className="icon icon-delete"
                            size="18px"
                            title="Delete"
                            onClick={handleDeleteNote}
                        />
                        <RiMore2Fill className="icon icon-options" size="18px" title="More" />
                    </NotesDescriptionIconsContainer>
                )}
                {(needToAdd || needToEdit) && (
                    <NotesDescriptionIconsContainer icons={2}>
                        <FaSave
                            className="icon icon-save"
                            size="18px"
                            title="Save"
                            onClick={() => handleSaveNote(showNote)}
                        />
                        <MdOutlineCancel
                            className="icon icon-cancel"
                            size="19px"
                            title="Cancel"
                            onClick={handleClose}
                        />
                        <RiMore2Fill className="icon" size="18px" title="More" />
                    </NotesDescriptionIconsContainer>
                )}
            </NotesDescriptionHeader>
            <NotesDescription>
                <DescriptionTitle title={showNote.title}>
                    {needToAdd || needToEdit ? (
                        <InputEditor
                            content={needToEdit && showNote.title ? showNote.title : ""}
                            onCopyChanges={handleCopyNoteData}
                            placeholder={"Note Heading"}
                            label="title"
                            inputType="text"
                        />
                    ) : (
                        <DescriptionDisplayTitle>
                            {showNote.title || (showNote._id ? `Untitled Note` : "")}
                        </DescriptionDisplayTitle>
                    )}
                </DescriptionTitle>
                <div>
                    {needToAdd || needToEdit ? (
                        <MarkdownEditor
                            content={needToEdit && showNote.content ? showNote.content : ""}
                            label="description"
                            onCopyChanges={handleCopyNoteData}
                            pageName="notes"
                        />
                    ) : (
                        <MarkdownEditor content={showNote.content || ""} previewModeOnly pageName="notes" />
                    )}
                </div>
            </NotesDescription>
        </NotesDescriptionContainer>
    );
};
export default NoteDescription;
