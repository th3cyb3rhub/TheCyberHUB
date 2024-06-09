import React from "react";
import { AiOutlinePushpin, AiTwotonePushpin } from "react-icons/ai";

const NotePinning = ({ isPinned, onPin, noteId }) => {
    const pinDisplay = isPinned ? (
        <AiTwotonePushpin className="icon icon-pin" size="18px" title="Unpin" onClick={() => onPin(noteId)} />
    ) : (
        <AiOutlinePushpin className="icon icon-pin" size="18px" title="Pin" onClick={() => onPin(noteId)} />
    );
    return <>{pinDisplay}</>;
};
export default NotePinning;
