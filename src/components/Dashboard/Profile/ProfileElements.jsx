import styled from "styled-components";

export const ProfileContainer = styled.div``;

export const Heading = styled.h3``;

export const Wrapper = styled.div`
    margin: 100px auto;
    width: 100%;
    color: whitesmoke;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 25px;

    @media screen and (max-width: 760px) {
    }
`;

export const UserImage = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 100%;
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
