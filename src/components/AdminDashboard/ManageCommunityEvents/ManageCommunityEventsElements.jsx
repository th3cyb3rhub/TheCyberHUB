import styled from "styled-components";
import { AiFillClockCircle, AiOutlineCloseCircle, AiOutlineFieldTime } from "react-icons/ai";
import { BiUserPlus } from "react-icons/bi";
import { TbEditCircle, TbRestore } from "react-icons/tb";

export const CommunityEventsContainer = styled.div`
    width: 100%;
`;
const createStyledIcon = (IconComponent) => {
    return styled(IconComponent)`
        width: 20px;
        height: 20px;
    `;
};

export const AiFillClockCircleIcon = createStyledIcon(AiFillClockCircle);
export const TbEditCircleIcon = createStyledIcon(TbEditCircle);
export const TbRestoreIcon = createStyledIcon(TbRestore);
export const BiUserPlusIcon = createStyledIcon(BiUserPlus);
export const AiOutlineCloseCircleIcon = createStyledIcon(AiOutlineCloseCircle);
export const AiOutlineFieldTimeIcon = createStyledIcon(AiOutlineFieldTime);
