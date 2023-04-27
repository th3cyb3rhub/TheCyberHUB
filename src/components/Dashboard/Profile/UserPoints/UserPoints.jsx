import React from "react";
import {
    RankContainer,
    RoomsCompletedContainer,
    UserBlogsCountContainer,
    UserExpContainer,
    UserPointsContainer,
    UserStreakContainer,
} from "./UserPointsElements";
import { CgCrown } from "react-icons/all";
import { getStreak } from "../../../Header/Exp";
import { ExpIcon } from "../../../Header/ExpElemenets";

const UserPoints = ({ userDetail, allUserDetail, blogs }) => {
    const isCompleted = userDetail?.solved?.map((ctf) => (ctf?.isCompleted ? 1 : 0));
    const roomCompleted = isCompleted?.reduce((a, b) => a + b, 0);
    const blogCount = blogs?.filter((blog) => blog?.username === userDetail?.username)?.length;

    return (
        <UserPointsContainer>
            <RankContainer>
                <CgCrown style={{ color: "#17f31e", fontSize: "20px" }} />
                <h4> {getUserRank(userDetail, allUserDetail)} </h4>
                <h5>Rank</h5>
            </RankContainer>

            <UserExpContainer>
                {userDetail && userDetail?.length === 0 ? null : (
                    <div>
                        <h4>{userDetail?.exp}</h4>
                        <h5>Points</h5>
                    </div>
                )}
            </UserExpContainer>
            <RoomsCompletedContainer>
                {userDetail?.solved && (
                    <div>
                        <h4>{roomCompleted} </h4>
                        <h5>Rooms</h5>
                    </div>
                )}
            </RoomsCompletedContainer>
            <UserBlogsCountContainer>
                {userDetail?.solved && (
                    <div>
                        <h4>{blogCount} </h4>
                        <h5>Blogs</h5>
                    </div>
                )}
            </UserBlogsCountContainer>
            <UserStreakContainer>
                <div>
                    <h4>
                        {getStreak(userDetail)} <ExpIcon />
                    </h4>
                    <h5>Streak</h5>
                </div>
            </UserStreakContainer>
        </UserPointsContainer>
    );
};

function getUserRank(userDetail, allDetails) {
    const sortedDetails = Array?.from(allDetails)?.sort((a, b) => (b?.exp || 0) - (a?.exp || 0));
    const userIndex = sortedDetails?.findIndex((detail) => detail?.user === userDetail?.user);
    const userRank = userIndex !== -1 ? userIndex + 1 : null;
    return userRank;
}

export default UserPoints;
