import styled from "styled-components";
import { FaEdit, FaPlus, MdOutlineCancel } from "react-icons/all";

export const SkillSetContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;

    background: #090909;
    padding: 10px;
    border-radius: 5px;
`;

export const SkillSetCategory = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
`;
export const SkillSetCategoryH = styled.h5``;

export const SkillSetList = styled.ul`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 5px;
`;

export const SkillSetListItem = styled.li`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 5px 0;
    gap: 10px;
    width: 100%;
    flex-wrap: wrap;

    @media (max-width: 768px) {
        gap: 5px;
        justify-content: center;
    }
`;

export const SkillName = styled.p`
    font-size: 18px;
    background: #212121;
    color: #e7e7e7;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
    padding: 0 7px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;

    @media (max-width: 768px) {
        font-size: 14px;
        padding: 0 5px;
    }
`;

export const AddSkillInput = styled.input`
    background: #212121;
    color: #e7e7e7;
    width: 150px;
    height: 30px;
    padding: 10px;
    border: none;
    border-radius: 2px;
    resize: none;
    font-size: 18px;
    font-family: "Arial", sans-serif;
`;
export const UserDetailsContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export const SkillLevel = styled.p``;

export const EditButtonSection = styled.div`
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
`;

export const EditButton = styled(FaEdit)`
    cursor: pointer;

    &:hover {
        color: #0d7cc1;
    }
`;

export const RemoveButton = styled(MdOutlineCancel)`
    cursor: pointer;
`;
export const IconAdd = styled(FaPlus)`
    cursor: pointer;
`;
