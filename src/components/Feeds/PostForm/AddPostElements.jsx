import styled from "styled-components";
import { FcAddImage } from "react-icons/fc";

export const AddFeedCommentContainer = styled.div`
    border-bottom: 1px solid #1a1a1a;
    background: #000000;
    padding: 25px 25px 10px;
    border-radius: 5px;
    width: 100%;
    display: flex;
    flex-direction: row;
`;

export const PostFormTextarea = styled.textarea`
    font-family: "Poppins", sans-serif;
    border: none;
    padding: 25px;
    margin: 10px 0;
    font-size: 17px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background: transparent;
    color: #fff;
    width: 100%;
    height: 250px;

    ::placeholder {
        color: #fff;
    }

    &:focus {
        outline: none;
    }
`;

export const FooterSection = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    width: 100%;
`;

export const AddImage = styled(FcAddImage)`
    margin-right: 10px;
    cursor: pointer;
    font-size: 200%;
`;

export const PostFormButton = styled.button`
    padding: 10px 20px;
    cursor: pointer;
    background: transparent;
    color: #f4f4f4;
    border: 1px solid #1a1c1d;
    border-radius: 25px;
    font-size: 14px;
    display: flex;
    justify-content: center;
    align-items: center;

    transition: all 0.2s ease-in-out;
    &:hover {
        transition: all 0.2s ease-in-out;
        background: #1a1c1d;
    }
`;
