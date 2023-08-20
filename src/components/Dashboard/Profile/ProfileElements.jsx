import styled from "styled-components";

export const ProfileContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    max-width: 1500px;
    width: 100%;
    gap: 10px;
`;

export const HR = styled.hr`
    width: 90%;
    border: 1px solid #171717;
    height: 1px;
    margin: 5px;
`;

export const Heading = styled.h3``;

export const AboutSection = styled.div`
    width: 100%;

    background: #090909;
    padding: 10px;
    border-radius: 5px;
    .about-me {
    }
`;

export const SaveButton = styled.button`
    padding: 5px 25px;
    z-index: 2;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    font-size: 18px;
    background: #0c0c0c;
    color: #f5f5f5;
    border-radius: 20px;
    border: 2px solid #171717;
    transition: all 0.2s ease-in-out;

    &:hover {
        background-color: #212121;
        border: 2px solid #090909;
        scale: 1.1;
        transition: all 0.2s ease-in-out;
    }
`;

export const Wrapper = styled.div`
    margin: 100px auto;
    width: 100%;
    color: #f5f5f5;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 25px;

    @media screen and (max-width: 760px) {
    }
`;

export const BlogPostContainer = styled.div`
    margin: 2%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;

export const ProfileDetailsSection = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    gap: 10px;

    @media screen and (max-width: 760px) {
        flex-direction: column;
    }
`;

export const CommentContainer = styled.div`
    flex: 1;
    background-color: black;
    flex-direction: row;
    margin-bottom: -20%;
`;
export const CommentAmountContainer = styled.div`
    flex: 1;
    background-color: #f5f5f5;
    flex-direction: row;
    zindex: 2;
`;
export const BlogCard = styled.div`
    margin: 1%;
    border-color: #62f56c;
    border-width: 5px;
    border-style: solid;
    width: 40%;
    height: 350px;
    border-radius: 5%;
    overflow: hidden;
`;
export const UserImage = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 100%;
    margin-top: -5%;
    margin-inline: 5% 5%;
    object-fit: cover;
    font-size: 12px;
    color: #999;
    word-break: break-all;
`;
export const BlogCoverImage = styled.img`
    width: 100%;
    height: 90%;
    border-radius: 5%;
    flex: 1;
    margin-bottom: -20%;
    font-size: 12px;
    color: #999;
    word-break: break-all;
`;
export const UserBanner = styled.img`
    border: 5px solid #111111;
    width: 100%;
    object-fit: cover;
    height: 100%;
    max-height: 150px;
    margin-top: -30px;
    font-size: 12px;
    color: #999;
    word-break: break-all;
`;
export const UserInfo = styled.div``;

export const HeaderSection = styled.div`
    display: flex;
    flex-direction: row;
    width: 99%;
    justify-content: flex-end;
`;

export const HeaderContainer = styled.div`
    max-width: 1500px;
    width: 100%;
    display: table-column;
`;

export const SkillLevelContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 50px auto;
`;

export const SkillLevels = styled.div`
    display: flex;
`;

export const SkillLevel = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    background: #080a10;
    border: #4cc23e 1px solid;
    height: 100px;
    width: 200px;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        transition: all 0.2s ease-in-out;
        scale: 1.05;
        color: #4cc23e;
    }
`;
