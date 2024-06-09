import styled from "styled-components";
import { AiFillClockCircle } from "react-icons/ai";
import { BiSolidChevronDown, BiSolidChevronUp } from "react-icons/bi";
import { MdLocationOn } from "react-icons/md";

export const ParentContainer = styled.div`
    margin: ${(props) => (props.$pageHeader ? "6.25rem auto;" : "0 auto;")};
    width: 100%;
    color: #f5f5f5;
    padding: ${(props) => (props.$pageHeader ? "0 1.563rem" : "0")};
`;

export const Container = styled.div`
    width: 80%;
    margin: 3rem auto;
`;

export const Header = styled.h1`
    font-size: 1.5rem;
    margin-bottom: 1rem;
    font-weight: 800;
`;

export const SubHeader = styled.p`
    font-size: 1rem;
    margin-bottom: 2.5rem;
    color: gray;
`;

export const FilterContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    background: #131313;
    border-radius: 7px;
    height: 6vh;
    align-self: center;
    margin-bottom: 2.5rem;
`;
export const Tabs = styled.div`
    display: flex;
    gap: 1rem;
    margin-bottom: 2.5rem;
    background-color: #383838;
    width: fit-content;
    border-radius: 8px;
    padding: 0.5rem;

    button {
        padding: 0.75rem 2.5rem;
        border: none;
        background-color: transparent;
        cursor: pointer;
        border-radius: 8px;
        font-size: 1rem;
        font-weight: 500;
        text-transform: capitalize;

        &:hover {
            background-color: #2a2a2a;
        }

        &.active {
            background-color: #2a2a2a;
        }
    }
`;

export const NoDataComponent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: fit-content;

    img {
        margin-top: 2rem;
        width: 300px;
        height: 300px;
    }
`;
export const EventNote = styled.p`
    font-size: 1rem;
    margin-bottom: 2.5rem;
    color: gray;
`;

const createStyledIcon = (IconComponent) => {
    return styled(IconComponent)`
        width: 20px;
        height: 20px;
    `;
};

export const BiChevronDownIcon = createStyledIcon(BiSolidChevronDown);
export const BiSolidChevronUpIcon = createStyledIcon(BiSolidChevronUp);
export const AiFillClockCircleIcon = createStyledIcon(AiFillClockCircle);
export const MdLocationOnIcon = createStyledIcon(MdLocationOn);

export const CommunityEventHeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;
