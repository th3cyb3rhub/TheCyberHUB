import React from "react";
import {
    RankTrophy,
    RankContainer,
    RankNumber,
    RankNumberContainer,
    UserPointsContainer,
    UserStreakContainer,
    StreakNumberContainer,
    StreakNumber,
} from "./UserPointsElements";
import { getStreak } from "src/components/Header/Exp";
import { ExpIcon } from "src/components/Header/ExpElemenets";

const UserPoints = ({ userDetail, allUserDetail, blogs }) => {
    const isCompleted = userDetail?.solved?.map((ctf) => (ctf?.isCompleted ? 1 : 0));
    const roomCompleted = isCompleted?.reduce((a, b) => a + b, 0);
    const blogCount = blogs?.filter((blog) => blog?.user === userDetail?.user)?.length;

    const userRank = getUserRank(userDetail || [], allUserDetail || []);
    return (
        <UserPointsContainer>
            <RankContainer>
                <RankNumberContainer $userRank={userRank}>
                    {userRank === 1 ? <RankTrophy /> : null}
                    <RankNumber $userRank={userRank}>{userRank}</RankNumber>
                </RankNumberContainer>
                <h5>Rank</h5>
            </RankContainer>

            <div>
                {userDetail && userDetail?.length === 0 ? null : (
                    <div>
                        <h4>{userDetail?.exp || 0}</h4>
                        <h5>Points</h5>
                    </div>
                )}
            </div>
            <div>
                {userDetail?.solved && (
                    <div>
                        <h4>{roomCompleted} </h4>
                        <h5>Rooms</h5>
                    </div>
                )}
            </div>
            <div>
                {userDetail?.solved && (
                    <div>
                        <h4>{blogCount} </h4>
                        <h5>Blogs</h5>
                    </div>
                )}
            </div>
            <UserStreakContainer>
                <StreakNumberContainer>
                    <ExpIcon />
                    <StreakNumber>{getStreak(userDetail)}</StreakNumber>
                </StreakNumberContainer>
                <h5>Streak</h5>
            </UserStreakContainer>
        </UserPointsContainer>
    );
};

function getUserRank(userDetail, allDetails) {
    const sortedDetails = Array?.from(allDetails || [])?.sort((a, b) => (b?.exp || 0) - (a?.exp || 0));
    const userIndex = sortedDetails?.findIndex((detail) => detail?.user === userDetail?.user);
    const userRank = userIndex !== -1 ? userIndex + 1 : null;
    return userRank;
}

export default UserPoints;
