import { BiEdit, BiSearch, BiTrashAlt } from "react-icons/bi";
import styled from "styled-components";

export const Section = styled.section`
    width: 100%;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 20px;
    padding-bottom: 20px;
`;

export const TeamName = styled.div`
    display: flex;
    align-items: center;
    color: whitesmoke;
`;

export const TeamNameContainer = styled.div`
    display: flex;
    align-items: center;
`;

export const TeamNameHeading = styled.h2`
    font-size: 24px;
    margin-right: 10px;
`;

export const TeamNameInput = styled.input`
    color: black;
`;

export const EditIcon = styled(BiEdit)`
    cursor: pointer;
    color: #fffff0;
    margin-bottom: 10px;

    &:hover {
        color: #0056b3;
    }
`;

export const OwnerContainer = styled.div`
    background-color: #f5f7fa;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 20px;
`;

export const OwnerLabel = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
`;

export const OwnerNames = styled.div`
    display: flex;
    flex-flow: row wrap;
    align-items: center;
`;

export const OwnerNameContainer = styled.div`
    border-color: #0d0c22;
    border-width: 3px;
    padding: 10px;
    border-radius: 5px;
    width: 10%;
    color: black;
    margin-right: 30px;
    text-align: center;
`;

export const SearchAndAdd = styled.div`
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const Group = styled.div`
    display: flex;
    line-height: 28px;
    align-items: center;
    position: relative;
    max-width: 190px;
`;

export const Input = styled.input`
    width: 100%;
    height: 40px;
    line-height: 28px;
    padding: 0 1rem;
    padding-left: 2.5rem;
    border: 2px solid transparent;
    border-radius: 8px;
    outline: none;
    background-color: #f3f3f4;
    color: #0d0c22;
    transition: 0.3s ease;

    &::placeholder {
        color: black;
    }

    &:focus,
    &:hover {
        outline: none;
        border-color: rgb(234 76 137 / 40%);
        background-color: #fff;
        box-shadow: 0 0 0 4px rgb(234 76 137 / 10%);
    }
`;

export const Icon = styled(BiSearch)`
    position: absolute;
    left: 1rem;
    fill: #9e9ea7;
    width: 1rem;
    height: 1rem;
`;

export const AddMemberButton = styled.button`
    height: 50px;
    width: 200px;
    position: relative;
    background-color: transparent;
    cursor: pointer;
    border: 2px solid #252525;
    overflow: hidden;
    border-radius: 30px;
    color: white;
    transition: all 0.5s ease-in-out;

    &:hover&::after {
        visibility: visible;
        transform: scale(100) translateX(2px);
    }

    &::after {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        transition: all 0.5s ease-in-out;
        background-color: #333;
        border-radius: 30px;
        visibility: hidden;
        height: 10px;
        width: 10px;
        z-index: -1;
    }
`;

export const BtnTxt = styled.span`
    z-index: 1;
    font-weight: 800;
    letter-spacing: 4px;
`;

export const MembersTable = styled.table`
    width: 100%;
    border-collapse: collapse;
`;

export const TableHeader = styled.tr`
    th {
        background-color: #f0f0f0;
        color: black;
        border-bottom: 1px solid #ccc;
        padding: 10px;
        text-align: left;
    }
`;

export const TableRow = styled.tr`
    td {
        border-bottom: 1px solid #ccc;
        padding: 10px;
        text-align: left;
        color: white;

        &:first-child {
            border-left: none;
        }

        &:last-child {
            border-right: none;
        }
    }
`;

export const DeleteIcon = styled(BiTrashAlt)`
    color: white;
    cursor: pointer;

    &:hover {
        color: red;
    }
`;

export const TeamOwner = styled.div`
    font-size: 20px;
    font-weight: bold;
`;

export const AddOwnerButton = styled.button`
    font-size: 20px;
    font-weight: bold;
    margin-left: 10px;
    color: darkslategrey;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;

    input {
        margin-bottom: 10px;
        padding: 8px;
        border-radius: 5px;
        color: black;
        border: 1px solid #ccc;
    }

    button {
        padding: 8px;
        border: none;
        background-color: #333;
        color: white;
        border-radius: 5px;
        cursor: pointer;
    }
`;
