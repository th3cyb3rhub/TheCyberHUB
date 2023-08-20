import styled from "styled-components";
import { BsCheck } from "react-icons/bs";

export const ContainerCard = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    text-align: start;
    background: #111111;
    justify-content: space-between;
    border-radius: 5px;
    transition: 0.3s ease-in-out;
    border: 1px solid #1f1f1f;

    &:hover {
        scale: 1.03;
        transition: 0.3s ease-in-out;
    }
`;

export const BlogImageSection = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: end;
    border-radius: 15px 15px 0 0;
    width: 100%;
`;

export const ButtonEdit = styled.button`
    background: #1a1c1d;
    color: #adadad;
    border: none;
    font-size: 15px;
    cursor: pointer;
    height: 20px;
    padding: 5px 10px;

    &:hover {
        scale: 1.1;
        color: #22ff1a;
        transition: 0.3s ease-in-out;
    }
`;

export const ButtonDelete = styled.button`
    background: #1a1c1d;
    color: #adadad;
    border: none;
    font-size: 15px;
    cursor: pointer;
    height: 20px;

    &:hover {
        scale: 1.1;
        color: #ff2121;
        transition: 0.3s ease-in-out;
    }
`;

export const EditBlogSection = styled.div`
    display: flex;
    justify-content: end;
`;
export const BlogCardImage = styled.img`
    width: 100%;
    height: auto; /* Specify the desired fixed height for the image */
    object-fit: contain; /* Adjust the value based on your requirement */

    display: block;
    margin: 0 auto;
    border-radius: 15px 15px 0 0;
    font-size: 12px;
    color: #999;
    word-break: break-all;
`;
export const MainSection = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 15px;
`;

export const SubSection = styled.div`
    padding: 25px;
    @media screen and (max-width: 600px) {
        padding: 10px 10px 15px 15px;
    }
`;

export const DetailsSection = styled.div`
    display: flex;
    flex-direction: column;
    text-align: start;
    width: 100%;
    border-radius: 15px;
`;

export const HeaderDetailsSection = styled.div`
    padding: 25px 0 0 25px;
    text-align: start;
`;

export const FooterDetailsSection = styled.div`
    display: flex;
    align-items: end;
    justify-content: space-between;
    padding: 5px 5px 15px 0;
`;

export const Title = styled.div`
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 5px;

    word-wrap: break-word;
    @media screen and (max-width: 760px) {
        font-size: 16px;
    }
    @media screen and (max-width: 760px) {
        font-size: 12px;
    }
`;

export const Description = styled.div`
    word-wrap: break-word;
    @media screen and (max-width: 760px) {
        font-size: 14px;
    }
    @media screen and (max-width: 600px) {
        font-size: 11px;
    }
    @media screen and (max-width: 460px) {
        display: none;
    }
`;
export const Username = styled.p`
    padding: 0 5px 0 0;
    @media screen and (max-width: 600px) {
        font-size: 10px;
    }
`;
export const Date = styled.p`
    font-size: 10px;
    margin: 0 5px 0 0;
`;
export const Categories = styled.div`
    margin-left: 25px;
    display: flex;
    flex-wrap: wrap;
    word-wrap: break-word;
    @media screen and (max-width: 600px) {
        margin-left: 15px;
    }
`;
export const Category = styled.p`
    background: #142638;
    padding: 0 5px;
    margin: 5px 5px 5px 0;
    border-radius: 2px;
    cursor: pointer;
    font-size: 13px;
    transition: transform 0.3s;

    &:hover {
        transform: scale(1.02);
    }

    @media screen and (max-width: 600px) {
        font-size: 10px;
    }
`;

export const Views = styled.p`
    font-size: 13px;
    width: 75px;
`;
export const Answers = styled.p`
    font-size: 13px;
    text-align: start;
    display: flex;
    width: 95px;
    border-radius: 2px;
    border: #101010 1px solid;
    background-color: ${(props) => (props.answerAccepted ? "rgba(173,255,47,0.6)" : "")};
`;
export const CheckIcon = styled(BsCheck)`
    font-size: 20px;
`;
export const Votes = styled.p`
    font-size: 13px;
`;
