import styled from "styled-components";
import { BiHomeCircle, BiBookmarks, BiLogoAlgolia, BiCog, BiChat } from "react-icons/bi";
import { PiNotebookDuotone, PiReadCvLogo } from "react-icons/pi";
import { CgOpenCollective } from "react-icons/cg";
import { GoTasklist } from "react-icons/go";
import { MdAnalytics } from "react-icons/md";

const createStyledIcon = (IconComponent) => {
    return styled(IconComponent)`
        font-size: 30px;
    `;
};

export const BiHomeCircleIcon = createStyledIcon(BiHomeCircle);
export const MdAnalyticsIcon = createStyledIcon(MdAnalytics);
export const BiBookmarksIcon = createStyledIcon(BiBookmarks);
export const CgOpenCollectiveIcon = createStyledIcon(CgOpenCollective);
export const PiNotebookDuotoneIcon = createStyledIcon(PiNotebookDuotone);
export const BsClipboardCheckIcon = createStyledIcon(GoTasklist);
export const BiLogoBloggerIcon = createStyledIcon(PiReadCvLogo);
export const BiLogoAlgoliaIcon = createStyledIcon(BiLogoAlgolia);
export const CiSettingsIcon = createStyledIcon(BiCog);
export const BiChatIcon = createStyledIcon(BiChat);
