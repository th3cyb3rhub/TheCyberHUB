import styled from "styled-components";
import { AiTwotoneMail } from "react-icons/ai";
import { BsQuestionSquareFill, BsTelephoneFill, BsFillPersonFill } from "react-icons/bs";
import { CgNotes, CgOrganisation, CgWorkAlt } from "react-icons/cg";
import { RiQuestionAnswerFill } from "react-icons/ri";
import { SiFirefoxbrowser, SiFsecure } from "react-icons/si";

export const H1 = styled.h1`
    font-size: 30px;
    font-family: "Fira Code Medium", monospace;

    padding: 15px 25px;
    //background: #70ff00;
    //color: black;
    color: #ffffff;

    &:hover {
        background: #17f31e;
        color: black;
        transition: all 0.2s ease-in-out;
    }
`;
export const ContentH = styled.h1`
    text-align: center;
    color: #c4c4c4;
    margin: 5px 0 0 0;
    width: 100%;
    max-width: 600px;
`;

export const ContentP = styled.p`
    background: #090909;
    font-family: "Fira Code Medium", monospace;
    text-align: center;
    color: #d7d7d7;
    margin: 5px 0 0 0;
    width: 100%;
    max-width: 1100px;
    padding: 15px;
    font-size: 30px;
    align-items: center;

    @media (max-width: 500px) {
        font-size: 20px;
    }
`;

export const ContactFormContainer = styled.div`
    color: #fff;
    margin: 150px 0 50px;
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
    gap: 5px;

    @media (max-width: 500px) {
        flex-direction: column;
        transition: 0.1s ease-in-out;
    }
`;
export const CoverLeft = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    background: #101010;
    padding: 15px;
    border-radius: 2px;
    margin: 5px 0;

    @media (max-width: 500px) {
        margin-right: 0;
    }
`;

export const CoverRight = styled.div`
    font-family: "Poppins", sans-serif;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: start;
    width: 100%;
    background: #101010;
    padding: 15px;
    border-radius: 2px;
    margin: 5px 0;
    margin-left: 5px;

    @media (max-width: 500px) {
        margin-left: 0;
    }
`;

export const PersonIcon = styled(BsFillPersonFill)`
    color: #666666;
    margin: 0 10px;
`;

export const MessageIcon = styled(RiQuestionAnswerFill)`
    color: #666666;
    margin: 0 10px;
`;

export const ReasonIcon = styled(BsQuestionSquareFill)`
    color: #666666;
    margin: 0 10px;
`;
export const PentestIcon = styled(SiFsecure)`
    color: #666666;
    margin: 0 10px;
`;
export const InternshipIcon = styled(CgWorkAlt)`
    color: #666666;
    margin: 0 10px;
`;
export const ResumeIcon = styled(CgNotes)`
    color: #666666;
    margin: 0 10px;
`;
export const PhoneIcon = styled(BsTelephoneFill)`
    color: #666666;
    margin: 0 10px;
`;

export const OrgIcon = styled(CgOrganisation)`
    color: #666666;
    margin: 0 10px;
`;
export const EmailIcon = styled(AiTwotoneMail)`
    color: #666666;
    margin: 0 10px;
`;

export const WebIcon = styled(SiFirefoxbrowser)`
    color: #666666;
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
    max-width: 1400px;
`;

export const ContactFormSection = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 1100px;
    background: #090909;
    padding: 25px;

    @media (max-width: 500px) {
        padding: 5px;
    }
`;

export const ContactFormInput = styled.input`
    font-family: "Poppins", sans-serif;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    border-radius: 5px;
    background: transparent;
    border: transparent;
    color: #c2c2c2;
    width: 100%;
    text-underline-offset: 5px;
    font-size: 20px;

    @media (max-width: 900px) {
        font-size: 17px;
    }
    @media (max-width: 500px) {
        font-size: 15px;
    }

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
    font-family: "Poppins", sans-serif;
    font-size: 20px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background: #101010;
    border: none;
    color: #c4c4c4;
    width: 100%;

    @media (max-width: 900px) {
        font-size: 17px;
    }
    @media (max-width: 500px) {
        font-size: 15px;
    }
`;
export const ContactFormSelectOption = styled.option`
    font-size: 20px;
    color: #c4c4c4;
    padding: 25px;
    margin: 25px;

    @media (max-width: 900px) {
        font-size: 17px;
    }
    @media (max-width: 500px) {
        font-size: 15px;
    }
`;

export const ContactFormLabel = styled.label`
    font-size: 20px;
    @media (max-width: 900px) {
        font-size: 17px;
    }
    @media (max-width: 500px) {
        font-size: 15px;
    }
`;

export const ContactFormTextArea = styled.textarea`
    font-family: "Poppins", sans-serif;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    //border-radius: 5px;
    background: transparent;
    border: transparent;
    color: #fff;
    width: 100%;
    height: 250px;
    font-size: 20px;

    @media (max-width: 900px) {
        font-size: 17px;
    }
    @media (max-width: 500px) {
        font-size: 15px;
    }

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
    padding: 15px 10px;
    font-size: 1.5rem;
    background: #101010;
    border: transparent;
    color: whitesmoke;
    border-radius: 5px;
    margin: 5px 0;
    width: 100%;
    cursor: pointer;
    font-family: "Roboto", sans-serif;

    transition: all 0.2s ease-in-out;

    &:hover {
        transition: all 0.2s ease-in-out;
        background: #6ffd01;
        color: #000000;
    }
`;

export const GlowingButton = styled.button`
    text-decoration: none;
    border-radius: 5px;
    border-width: 1px;
    border-style: solid;
    width: 100%;
    border-color: #343434;
    white-space: nowrap;
    font-size: ${({ fontBig }) => (fontBig ? "20px" : "16px")};
    outline: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s ease-in-out;
    color: #000000;
    background: #6ffd01;
    box-shadow: 0 0 30px rgba(32, 194, 14, 0);
    animation: glowing 2s ease-in-out infinite;
    margin: 5px 0;
    padding: 10px;
    max-width: 800px;

    @keyframes glowing {
        0% {
            box-shadow: 0 0 30px rgba(32, 194, 14, 0);
        }
        50% {
            box-shadow: 0 0 60px 15px rgba(32, 194, 14, 0.5);
        }
        100% {
            box-shadow: 0 0 30px rgba(32, 194, 14, 0);
        }
    }
    @media screen and (max-width: 600px) {
        padding: 10px 10px;
    }
`;

export const ErrorMessage = styled.div`
    padding: 25px;
    font-size: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #88ff00;
`;
