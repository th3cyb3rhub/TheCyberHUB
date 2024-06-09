import React, { useState } from "react";
import { LikesAndViewsContainer, LikesContainer, ViewsContainer } from "./SingleCTFElements";
import { AiFillEye, AiFillLike } from "react-icons/ai";
import { updateLikesAndViews } from "src/features/ctf/ctfSlice";
import { useDispatch } from "react-redux";
const LikesAndViews = ({ challenge, user }) => {
    const dispatch = useDispatch();

    const [isLikedTemp, setIsLikedTemp] = useState(false);
    const [isLikedTempNumber, setIsLikedNumber] = useState(false);

    // const isViewed = challenge?.views?.some((view) => view?.user?.toString() === user?._id.toString());
    // if (!isViewed && user) {
    //     dispatch(updateLikesAndViews({ ctfId: challenge?._id, view: true }));
    // }

    const isLiked = challenge?.likes?.some((like) => like?.user?.toString() === user?._id.toString()) || isLikedTemp;

    const uniqueIds = [...new Set(challenge?.views?.map((view) => view?.user))];

    const handleLike = () => {
        if (!isLiked && user) {
            dispatch(updateLikesAndViews({ ctfId: challenge?._id, like: true }));
            setIsLikedTemp(true);
            setIsLikedNumber(challenge?.likes.length + 1);
        }
    };

    return (
        <LikesAndViewsContainer>
            <LikesContainer>
                {isLiked ? (
                    <AiFillLike style={{ color: "cadetblue" }} />
                ) : (
                    <AiFillLike onClick={handleLike} style={{ cursor: "pointer" }} />
                )}
                {challenge?.likes.length < isLikedTempNumber ? isLikedTempNumber : challenge?.likes.length}
            </LikesContainer>
            <ViewsContainer>
                <AiFillEye /> {uniqueIds.length}
            </ViewsContainer>
        </LikesAndViewsContainer>
    );
};

export default LikesAndViews;
