import React from "react";
import {
    NoteItemElement,
    NoteItemElementContainer,
    NoteItemPinningContainer,
    NoteItemShortTitle,
} from "./NoteElements";
import NotePinning from "./NotePinning";

const NoteItem = ({ _id, title, pinned, onPick, onPin, isPicked }) => {
    return (
        <NoteItemElementContainer>
            <NoteItemElement $isPinned={pinned} onClick={() => onPick(_id)} $isPicked={isPicked}>
                <NoteItemShortTitle>{title.slice(0, 23)}</NoteItemShortTitle>
            </NoteItemElement>
            <NoteItemPinningContainer isPinned={pinned}>
                <NotePinning isPinned={pinned} onPin={onPin} noteId={_id} />
            </NoteItemPinningContainer>
        </NoteItemElementContainer>
    );
};
export default NoteItem;
