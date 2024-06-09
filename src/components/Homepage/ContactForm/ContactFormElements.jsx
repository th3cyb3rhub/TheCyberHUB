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
    color: #f5f5f5;
    text-align: center;
    margin: auto;
    width: 100%;
    max-width: 600px;
`;

export const ContentH = styled.h1`
    text-align: center;
    color: #f5f5f5;
    margin: 5px 0 0;
    width: 100%;
    max-width: 600px;
`;

export const ContentP = styled.p`
    background: #090909;
    font-family: "Fira Code Medium", monospace;
    text-align: center;
    color: #f5f5f5;
    margin: 5px 0 0;
    width: 100%;
    max-width: 1100px;
    padding: 15px;
    font-size: 30px;
    align-items: center;

    @media (width <= 500px) {
        font-size: 20px;
    }
`;

export const ContactFormContainer = styled.div`
    margin: 150px auto 50px;
    max-width: 1000px;
    border: 2px solid transparent;
    padding: 32px 24px;
    font-size: 14px;
    font-family: inherit;
    color: white;
    display: flex;
    flex-direction: column;
    border-radius: 16px;

    /* CSS for input fields */

    input,
    textarea {
        width: calc(100% - 30px); /* Adjusted width to accommodate icon */
        padding: 12px 16px;
        border-radius: 8px;
        color: #fff;
        font-family: inherit;
        background-color: transparent;
        border: 1px solid #414141;
    }

    input&::placeholder,
    textarea::placeholder {
        opacity: 0.5;
    }

    input&:focus,
    textarea:focus {
        outline: none;
        border-color: #ff731c;
    }
`;

export const Cover = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    gap: 5px;

    @media (width <= 500px) {
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

    @media (width <= 500px) {
        margin-right: 0;
    }
`;

export const CoverRight = styled.div`
    font-family: Poppins, sans-serif;
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

    @media (width <= 500px) {
        margin-left: 0;
    }
`;

export const PersonIcon = styled(BsFillPersonFill)`
    color: #666;
    margin: 0 10px;
`;

export const MessageIcon = styled(RiQuestionAnswerFill)`
    color: #666;
    margin: 15px 10px 0; /* Add 20px margin from the top */
`;

export const ReasonIcon = styled(BsQuestionSquareFill)`
    color: #666;
    margin: 0 10px;
`;
export const PentestIcon = styled(SiFsecure)`
    color: #666;
    margin: 0 10px;
`;
export const InternshipIcon = styled(CgWorkAlt)`
    color: #666;
    margin: 0 10px;
`;
export const ResumeIcon = styled(CgNotes)`
    color: #666;
    margin: 0 10px;
`;
export const PhoneIcon = styled(BsTelephoneFill)`
    color: #666;
    margin: 0 10px;
`;

export const OrgIcon = styled(CgOrganisation)`
    color: #666;
    margin: 0 10px;
`;
export const EmailIcon = styled(AiTwotoneMail)`
    color: #666;
    margin: 20px 10px;
`;

export const WebIcon = styled(SiFirefoxbrowser)`
    color: #666;
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
    margin-right: 40px;

    @media (width <= 500px) {
        padding: 5px;
    }
`;

export const ContactFormInput = styled.input`
    font-family: Poppins, sans-serif;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center; /* Align icon vertically with input field */
    border-radius: 5px;
    background: transparent;
    border: transparent;
    color: #f5f5f5;
    width: 100%;
    text-underline-offset: 5px;
    font-size: 20px;

    &::placeholder {
        color: #f5f5f5;
    }

    &:focus {
        outline: none;
    }

    &:hover {
        color: #f5f5f5;
    }
`;

export const ContactFormSelect = styled.select`
    font-family: Poppins, sans-serif;
    font-size: 20px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background: #101010;
    border: none;
    color: #f5f5f5;
    width: 100%;

    @media (width <= 900px) {
        font-size: 17px;
    }

    @media (width <= 500px) {
        font-size: 15px;
    }
`;
export const ContactFormSelectOption = styled.option`
    font-size: 20px;
    color: #f5f5f5;
    padding: 25px;
    margin: 25px;

    @media (width <= 900px) {
        font-size: 17px;
    }

    @media (width <= 500px) {
        font-size: 15px;
    }
`;

export const ContactFormLabel = styled.label`
    font-size: 20px;

    @media (width <= 900px) {
        font-size: 17px;
    }

    @media (width <= 500px) {
        font-size: 15px;
    }
`;

export const ContactFormTextArea = styled.textarea`
    font-family: Poppins, sans-serif;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    /* border-radius: 5px; */
    background: transparent;
    border: transparent;
    color: #f5f5f5;
    width: 100%;
    height: 250px;
    font-size: 20px;

    @media (width <= 900px) {
        font-size: 17px;
    }

    @media (width <= 500px) {
        font-size: 15px;
    }

    &::placeholder {
        color: #f5f5f5;
    }

    &:focus {
        outline: none;
    }

    &:hover {
        color: #f5f5f5;
    }
`;

export const ContactFormSubmit = styled.button`
    padding: 15px 10px;
    font-size: 1.5rem;
    background: #101010;
    color: #f5f5f5;
    border: 1px solid #2a2a2a;
    border-radius: 5px;
    border-image-slice: 1;
    margin: 5px 0;
    width: 100%;
    cursor: pointer;
    font-family: Roboto, sans-serif;
    transition: all 0.2s ease-in-out;

    &:hover {
        transition: all 0.2s ease-in-out;
        background: #ff6b08;
        color: #000;
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
    color: #000;
    background: #ff6b08;
    box-shadow: 0 0 30px rgb(32 194 14 / 0%);
    animation: glowing 2s ease-in-out infinite;
    margin: 5px 0;
    padding: 10px;
    max-width: 800px;

    @keyframes glowing {
        0% {
            box-shadow: 0 0 30px rgb(32 194 14 / 0%);
        }

        50% {
            box-shadow: 0 0 60px 15px rgb(194 89 14 / 50%);
        }

        100% {
            box-shadow: 0 0 30px rgb(32 194 14 / 0%);
        }
    }

    @media screen and (width <= 600px) {
        padding: 10px;
    }
`;

export const ErrorMessage = styled.div`
    padding: 25px;
    font-size: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ff6b08;
`;
