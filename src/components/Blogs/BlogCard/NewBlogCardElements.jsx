import styled from "styled-components";
import { BsCheck } from "react-icons/all";

export const ContainerCard = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 700px;
    text-align: start;
    margin: 10px;
    border-radius: 5px;
    background: #111111;
`;

export const BlogImageSection = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: end;
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
    max-width: 300px;
    max-height: 160px;
    justify-self: center;
    word-wrap: break-word;
`;
export const MainSection = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    @media screen and (max-width: 600px) {
    }
`;

export const SubSection = styled.div`
    padding: 25px 25px 15px 25px;
    max-width: 60%;

    @media screen and (max-width: 600px) {
        padding: 10px 10px 15px 15px;
    }
`;

export const DetailsSection = styled.div`
    display: flex;
    flex-direction: column;
    text-align: start;
    width: 100%;
    max-width: 40%;
`;

export const HeaderDetailsSection = styled.div`
    padding: 25px 0 0 25px;
    text-align: start;
`;

export const FooterDetailsSection = styled.div`
    display: flex;
    align-items: end;
    justify-content: space-between;
    padding: 5px 5px 5px 0;
`;

export const Title = styled.div`
    word-wrap: break-word;
    @media screen and (max-width: 600px) {
        font-size: 13px;
    }
`;

export const Description = styled.div`
    word-wrap: break-word;
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
