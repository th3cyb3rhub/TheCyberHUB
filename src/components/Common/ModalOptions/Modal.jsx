import React from "react";
import ReactDom from "react-dom";
import { TbEditCircle } from "react-icons/tb";
import { AiTwotoneDelete } from "react-icons/ai";
import { MdClose } from "react-icons/md";

import {
    OptionsList,
    OptionsContainer,
    OptionsItem,
    OptionLabel,
    OptionsClose,
    OptionsOverlay,
    OptionsModalContainer,
} from "./OptionsElements";
import "./Options.css";

const Modal = ({ isOpen, onDelete, onEdit, onClose, modalContainerId }) => {
    if (!isOpen) return;
    return ReactDom.createPortal(
        <OptionsContainer>
            <OptionsOverlay onClick={(e) => onClose(e, false)} />
            <OptionsModalContainer>
                <OptionsClose onClick={(e) => onClose(e, false)}>
                    <MdClose className="icon icon-close" size="18px" title="Close" />
                </OptionsClose>
                <OptionsList>
                    <OptionsItem onClick={onEdit}>
                        <OptionLabel>Edit</OptionLabel>
                        <button>
                            <TbEditCircle className="icon icon-edit" size="18px" title="Edit" />
                        </button>
                    </OptionsItem>
                    <OptionsItem onClick={onDelete}>
                        <OptionLabel>Delete</OptionLabel>
                        <button>
                            <AiTwotoneDelete className="icon icon-delete" size="18px" title="Delete" />
                        </button>
                    </OptionsItem>
                </OptionsList>
            </OptionsModalContainer>
        </OptionsContainer>,
        document.getElementById(modalContainerId),
    );
};
export default Modal;
