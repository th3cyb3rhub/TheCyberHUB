import React, { useState } from "react";
import { PopupContainer, CloseButton } from "./AuthPopupElements";
import Register from "../Register";

const AuthPopup = ({ onClose }) => {
    const [seen, setSeen] = useState(true);

    const togglePop = () => {
        setSeen(!seen);
        onClose();
    };

    return (
        <PopupContainer>
            <div className="popup-inner">
                <Register authPopup={true} />
                <CloseButton onClick={togglePop} />
            </div>
        </PopupContainer>
    );
};

export default AuthPopup;
