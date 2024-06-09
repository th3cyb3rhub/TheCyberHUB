import styled from "styled-components";
import { MdOutlineEventNote } from "react-icons/md";
import { BiHomeCircle } from "react-icons/bi";

const createStyledIcon = (IconComponent) => {
    return styled(IconComponent)`
        font-size: 20px;
    `;
};

export const MdOutlineEventNoteIcon = createStyledIcon(MdOutlineEventNote);
export const BiHomeCircleIcon = createStyledIcon(BiHomeCircle);
