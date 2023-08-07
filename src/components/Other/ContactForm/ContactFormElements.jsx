import styled from "styled-components";
import { AiTwotoneMail } from "react-icons/ai";
import { BsQuestionSquareFill, BsFillPersonFill } from "react-icons/bs";
import { CgOrganisation } from "react-icons/cg";
import { RiQuestionAnswerFill } from "react-icons/ri";
import { SiFirefoxbrowser } from "react-icons/si";

export const ContentH = styled.h1`
    text-align: center;
    color: #c4c4c4;
    margin: 5px 0 0 0;
    width: 100%;
    max-width: 600px;
`;

export const ContentP = styled.p`
    text-align: center;
    color: #c4c4c4;
    margin: 5px 0 0 0;
    width: 100%;
    max-width: 600px;
`;

export const ContactFormContainer = styled.div`
    margin: 50px auto auto auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px;
    width: 100%;
    background: #000;
`;

export const Cover = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;

    @media (max-width: 500px) {
        flex-direction: column;
        transition: 0.1s ease-in-out;
    }
`;
export const CoverLeft = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: start;
    width: 100%;
    background: #1e1e1e;
    padding: 10px;
    border-radius: 2px;
    margin: 5px 0;
    margin-right: 5px;

    @media (max-width: 500px) {
        margin-right: 0;
    }
`;

export const CoverRight = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: start;
    width: 100%;
    background: #1e1e1e;
    padding: 10px;
    border-radius: 2px;
    margin: 5px 0;
    margin-left: 5px;

    @media (max-width: 500px) {
        margin-left: 0;
    }
`;

export const PersonIcon = styled(BsFillPersonFill)`
    margin: 0 10px;
`;

export const MessageIcon = styled(RiQuestionAnswerFill)`
    margin: 0 10px;
`;

export const ReasonIcon = styled(BsQuestionSquareFill)`
    margin: 0 10px;
`;
export const OrgIcon = styled(CgOrganisation)`
    margin: 0 10px;
`;
export const EmailIcon = styled(AiTwotoneMail)`
    margin: 0 10px;
`;

export const WebIcon = styled(SiFirefoxbrowser)`
    margin: 0 10px;
`;

export const ContactFormCard = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    border-radius: 10px;
    margin: 20px;
    width: 100%;
    max-width: 1200px;
`;

export const ContactFormSection = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 600px;
`;

export const ContactFormInput = styled.input`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    border-radius: 5px;
    background: transparent;
    border: transparent;
    color: #fff;
    width: 100%;
    text-underline-offset: 5px;

    ::placeholder {
        color: #fff;
    }

    &:focus {
        outline: none;
    }

    &:hover {
        background: transparent;
        border: transparent;
        color: #fff;
    }
`;

export const ContactFormSelect = styled.select`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    border-radius: 5px;
`;
export const ContactFormSelectOption = styled.option``;

export const ContactFormLabel = styled.label``;

export const ContactFormTextArea = styled.textarea`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    //border-radius: 5px;
    //padding: 10px;
    background: transparent;
    border: transparent;
    color: #fff;
    width: 100%;
    height: 50px;

    ::placeholder {
        color: #fff;
    }

    &:focus {
        outline: none;
    }

    &:hover {
        background: transparent;
        border: transparent;
        color: #fff;
    }
`;

export const ContactFormSubmit = styled.button`
    padding: 10px;
    background: #1e1e1e;
    border: transparent;
    color: whitesmoke;
    border-radius: 5px;
    margin: 5px 0;
    width: 100%;
    cursor: pointer;
    font-size: 1rem;
    font-family: "Roboto", sans-serif;
`;
