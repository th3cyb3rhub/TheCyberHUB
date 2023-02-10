import styled from "styled-components";
import { BsCheck } from "react-icons/all";
export const BlogImageSection = styled.div``;
export const BlogImage = styled.img``;
export const ContainerTrendingBlogCard = styled.div`
    display: flex;
    flex-direction: column;
    width: 300px;
    text-align: start;
    margin: 10px;
    border-bottom: #313131 1px solid;
    border-radius: 5px;
    background: #111111;
`;

export const MainSection = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;
export const SubSection = styled.div`
    padding: 25px 25px 15px 25px;
`;

export const DetailsSection = styled.div`
    padding: 25px 0 0 15px;
    display: flex;
    flex-direction: column;
    text-align: start;
    min-width: 125px;
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

export const Title = styled.h4``;

export const Description = styled.p``;
export const Username = styled.p``;
export const Date = styled.p`
    font-size: 10px;
    margin: 0 5px 0 0;
`;
export const Categories = styled.p`
    margin-left: 25px;
    display: flex;
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
