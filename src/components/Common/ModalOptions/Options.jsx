import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

import { OptionsMainContainer } from "./OptionsElements";
import Modal from "./Modal";

const Options = ({ onDelete, onEdit, modalContainerId }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClickEvent = (e, option) => {
        e.stopPropagation();
        e.preventDefault();
        setIsOpen(option);
    };

    return (
        <OptionsMainContainer id={modalContainerId} $isOpen={isOpen} onClick={(e) => handleClickEvent(e, true)}>
            <BsThreeDotsVertical size={18} />
            <Modal
                isOpen={isOpen}
                onDelete={onDelete}
                onEdit={onEdit}
                onClose={handleClickEvent}
                modalContainerId={modalContainerId}
            />
        </OptionsMainContainer>
    );
};
export default Options;
