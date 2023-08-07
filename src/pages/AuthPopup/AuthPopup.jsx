import React, { useState } from "react";
import { AuthPopupContainer, CloseButton } from "./AuthPopupElements";
import Register from "../Register";

const AuthPopup = ({ onClose }) => {
    const [seen, setSeen] = useState(true);

    const togglePop = () => {
        setSeen(!seen);
        onClose(); // Call the onClose prop to close the popup
    };

    return (
        <AuthPopupContainer>
            <div className="popup-inner">
                <Register authPopup={true} />
                <CloseButton onClick={togglePop} />
            </div>
        </AuthPopupContainer>
    );
};

export default AuthPopup;
