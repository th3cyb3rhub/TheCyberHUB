import styled from "styled-components";
import { BiPlus } from "react-icons/bi";

export const SectionCreateBlog = styled.div`
    display: flex;
    flex-direction: column;
`;
export const CreateBlogContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 1500px;
    gap: 10px;
`;

export const ImageUploadAndPreviewSection = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
`;

export const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;
export const Form = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 10px;
`;

export const Input = styled.input`
    background: #0c0c0c;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    border-radius: 5px;
    color: #fff;
    width: 100%;
    height: 50px;
    font-size: 20px;
    text-underline-offset: 5px;
    border: #222222 1px solid;
    padding: 25px;
    font-family: "Poppins", sans-serif;

    ::placeholder {
        color: #fff;
    }

    &:focus {
        outline: none;
    }

    &:hover {
        background: transparent;
        //border: transparent;
        color: #fff;
    }
`;

export const TextArea = styled.textarea`
    font-family: "Poppins", sans-serif;
    border: #222222 1px solid;
    padding: 25px;
    font-size: 17px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background: #0c0c0c;
    color: #fff;
    width: 100%;
    height: 130px;

    ::placeholder {
        color: #fff;
    }

    &:focus {
        outline: none;
    }
`;

export const TagsInput = styled.div`
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
    border-radius: 5px;
    background: transparent;
    color: #fff;
    width: 100%;
    padding: 10px;
    text-underline-offset: 5px;
    border: #222222 1px solid;
    font-family: "Poppins", sans-serif;
`;

export const TagInput = styled.input`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    border-radius: 5px;
    background: #0c0c0c;
    color: #fff;
    width: 200px;
    height: 45px;
    padding: 15px;
    font-size: 15px;
    text-underline-offset: 5px;
    border: #222222 1px solid;

    transition: all 0.2s ease-in-out;

    ::placeholder {
        transition: all 0.2s ease-in-out;
        color: #fff;
    }

    &:focus {
        transition: all 0.2s ease-in-out;
        outline: none;
    }
`;

export const IconAdd = styled(BiPlus)`
    font-size: 15px;
    padding: 10px;
    min-height: 50px;
    min-width: 50px;
    border-radius: 5px;
    cursor: pointer;
    color: #fff;
    background: #1a1c1d;
    transition: all 0.2s ease-in-out;

    &:hover {
        background: #1a1c1d;
        color: #fff;
        transition: all 0.2s ease-in-out;
        padding: 5px;
    }
`;

export const Submit = styled.button`
    padding: 10px;
    margin: 10px 0;
    background: #111213;
    border: transparent;
    color: whitesmoke;
    border-radius: 5px;
    width: 100%;
    cursor: pointer;
    font-size: 13px;
    font-family: "Roboto", sans-serif;
    transition: all 0.2s ease-in-out;

    &:hover {
        background: #282a2c;
        color: #fff;
        transition: all 0.2s ease-in-out;
    }
`;
