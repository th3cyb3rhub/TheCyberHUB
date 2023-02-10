import styled from "styled-components";
import { FcAddImage } from "react-icons/all";
import { Link } from "react-router-dom";

export const createContent = styled.input``;
export const SectionCreateBlog = styled.div`
    display: flex;
    flex-direction: column;
`;
export const CreateBlogContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 1500px;
`;

export const ImageUploadAndPreviewSection = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
`;

export const AddCoverImageSection = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;
export const AddImage = styled(FcAddImage)`
    margin-right: 10px;
    cursor: pointer;
    font-size: 200%;
`;

export const ImageUploadLabel = styled.label`
    display: flex;
    justify-content: center;
    align-items: center;
    background: #1a1c1d;
    color: #f4f4f4;
    border: 1px solid #1a1c1d;
    border-radius: 3px;
    padding: 10px 20px;
    cursor: pointer;

    @media screen and (max-width: 500px) {
        padding: 5px 5px;
    }
`;
export const ImageUploadInput = styled.input``;

export const TextGrey = styled.p`
    color: #707070;
    padding: 5px;
    margin: 5px;
    font-size: 15px;
`;

export const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;
export const Heading2 = styled.h2``;
export const Heading3 = styled.h3``;
export const ImageSelected = styled.p`
    //margin-left: 25px;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

export const Label = styled.label`
    border: #222222 1px solid;
    padding: 5px;
`;

export const Input = styled.input`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    border-radius: 5px;
    background: transparent;
    color: #fff;
    width: 100%;
    height: 50px;
    font-size: 20px;
    text-underline-offset: 5px;
    margin: 10px 0;
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
    margin: 10px 0;
    font-size: 17px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background: transparent;
    color: #fff;
    width: 100%;
    height: 550px;

    ::placeholder {
        color: #fff;
    }

    &:focus {
        outline: none;
    }
`;

export const TagInput = styled.input`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    border-radius: 5px;
    background: transparent;
    color: #fff;
    width: 100%;
    height: 50px;
    font-size: 15px;
    text-underline-offset: 5px;
    margin: 10px 0;
    border: #222222 1px solid;
    padding: 25px;

    ::placeholder {
        color: #fff;
    }

    &:focus {
        outline: none;
    }
`;

export const Submit = styled.button`
    padding: 10px;
    margin: 10px 0;
    background: #1e1e1e;
    border: transparent;
    color: whitesmoke;
    border-radius: 5px;
    width: 100%;
    cursor: pointer;
    font-size: 13px;
    font-family: "Roboto", sans-serif;
`;

export const RouterButtonLink = styled(Link)`
    background: #1a1c1d;
    border-radius: 5px;
    color: #0bff0b;
    padding: 5px 15px;
    margin: 5px 15px;
    @media screen and (max-width: 600px) {
        font-size: 12px;
    }

    &:hover {
        transition: 0.1s ease-in-out;
        scale: 1.1;
    }
`;
