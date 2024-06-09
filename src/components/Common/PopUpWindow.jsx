import React, { useState } from "react";
import { CloseButton, PopupContainer } from "src/pages/AuthPopup/AuthPopupElements";

const PopUpWindow = ({ onClose, children, customStyles }) => {
    const [seen, setSeen] = useState(true);

    const togglePop = () => {
        setSeen(!seen);
        onClose();
    };

    return (
        <PopupContainer style={customStyles}>
            <div className="popup-inner">
                {children}
                <CloseButton onClick={togglePop} />
            </div>
        </PopupContainer>
    );
};

export default PopUpWindow;
