import React, { useState } from "react";
import { CloseButton, PopupContainer } from "../../pages/AuthPopup/AuthPopupElements";

const PopUpWindow = ({ onClose, children }) => {
    const [seen, setSeen] = useState(true);

    const togglePop = () => {
        setSeen(!seen);
        onClose();
    };

    return (
        <PopupContainer>
            <div className="popup-inner">
                {children}
                <CloseButton onClick={togglePop} />
            </div>
        </PopupContainer>
    );
};

export default PopUpWindow;
