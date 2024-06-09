import styled from "styled-components";

export const BottomSection = styled.div`
    display: flex;
    flex-direction: row;
    gap: 40px;
    height: 40vw;
`;

export const CTABtn = styled.div`
    flex: 3;
    display: flex;
    gap: 15px;
    font-size: 14px;
`;

export const Title = styled.h1`
    color: #fff;
    text-align: center;
`;

export const Caption = styled.div`
    display: flex;
    gap: 15px;
`;

export const LastThirtyDaysBtn = styled.div`
    flex: 5;
    display: flex;
    justify-content: flex-end;
    color: grey;
    font-size: 11px;
    font-weight: 600;
`;

export const BottomLeftInnerCard = styled.div`
    flex: 3;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-align: center;
    color: #fff;
    padding: 0.8rem;
    border: 0.5px solid grey;
    border-radius: 5px;
    cursor: pointer;
    transition: transform 0.2s; /* Animation */
    &:hover {
        transform: scale(1.05);
    }
`;

export const BottomLeftSection = styled.div`
    flex: 6;
    flex-direction: column;
    display: flex;
    justify-content: flex-start;
    text-align: center;
    background-color: #151414;
    gap: 5px;
    padding: 20px;
    border: 1px solid #151414;
    border-radius: 5px;
`;

export const BottomLeftSectionCaption = styled.div`
    display: flex;
    flex-direction: row;
    gap: 15px;
    background-color: #151414;
    color: #fff;
    border-radius: 5px;
`;

export const BottomSectionCaptionTitle = styled.div`
    flex: 6;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    background-color: #151414;
    color: #fff;
`;

export const LastUpdated = styled.p`
    flex: 6;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    background-color: #151414;
    color: grey;
    font-size: 12px;
`;

export const TimeCaptionBtnHours = styled.div`
    flex: 3;
    text-align: center;
    background-color: #ff6b07;
    color: black;
    font-weight: 400;
    margin: 15px;
    padding: 8px 14px;
    border: 0.5px solid black;
    border-radius: 10px;
    cursor: pointer;

    &:hover {
        transform: scale(1.05);
    }
`;

export const TimeCaptionBtnDays = styled.div`
    flex: 3;
    text-align: center;
    background-color: #00f;
    color: white;
    font-weight: 400;
    margin: 15px;
    padding: 8px 14px;
    border: 0.5px solid grey;
    border-radius: 10px;
    cursor: pointer;

    &:hover {
        transform: scale(1.05);
    }
`;

export const BottomRightSection = styled.div`
    flex: 3;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    text-align: center;
    gap: 25px;
    background-color: #151414;
    color: #fff;
    border: 1px solid #151414;
    border-radius: 5px;
    padding: 20px;
`;

export const BottomRightSectionInnerCard = styled.div`
    flex: 3;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    text-align: center;
    height: 100%;
    overflow: scroll;
    overflow-x: hidden;
    scrollbar-width: none;
    color: #fff;
`;

export const PopularPostCard = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 15px;
    margin: 0 0 10px;
    font-size: 12px;
    border-radius: 5px;
    cursor: pointer;
`;

export const PostDetails = styled.div`
    flex: 1;
    display: flex;
    align-items: start;
    font-size: 12px;
`;

export const PostTitleDate = styled.div`
    flex: 3;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    text-align: center;
    color: #fff;
`;

export const PostTitle = styled.h5`
    display: block;
    justify-content: flex-start;
    align-items: start;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 9vw;
    color: #fff;
    font-weight: bold;
    cursor: pointer;

    &:hover {
        color: grey;
    }
`;

export const PostDate = styled.p`
    display: flex;
    justify-content: flex-start;
    align-items: start;
    color: grey;
`;

export const PostIcons = styled.div`
    flex: 1;
    display: flex;
    justify-content: flex-start;
    align-items: start;
    color: grey;
    font-size: 11px;
    font-weight: 600;
`;

export const LikesIcon = styled.div`
    flex: 1;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    &:hover {
        color: #fff;
    }
`;

export const CommentsIcon = styled.div`
    flex: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    &:hover {
        color: #fff;
    }
`;
