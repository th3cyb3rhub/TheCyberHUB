import styled from "styled-components";

import { FiInfo } from "react-icons/fi";
import { SlCalender } from "react-icons/sl";
import { TbFileDownload } from "react-icons/tb";
import { CiHeart } from "react-icons/ci";
import { IoChatboxOutline } from "react-icons/io5";

const createStyledIcon = (IconComponent) => {
    return styled(IconComponent)`
        margin-right: 8px;
        font-size: 20px;
        color: grey;
    `;
};

export const FiInfoIcon = createStyledIcon(FiInfo);
export const SlCalenderIcon = createStyledIcon(SlCalender);
export const TbFileDownloadIcon = createStyledIcon(TbFileDownload);
export const CiHeartIcon = createStyledIcon(CiHeart);
export const IoChatboxOutlineIcon = createStyledIcon(IoChatboxOutline);
