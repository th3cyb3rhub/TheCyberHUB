import React from "react";
import {
    // RankContainer,
    // RankNumber,
    // RankNumberContainer,
    // RankTrophy,
    StreakNumber,
    StreakNumberContainer,
    UserPointsContainer,
    UserStreakContainer,
} from "./UserPointsElements";
import { getStreak } from "src/components/Header/Exp";
import { ExpIcon } from "src/components/Header/ExpElemenets";

const UserPoints = ({ userDetail }) => {
    const isCompleted = userDetail?.solved?.map((ctf) => (ctf?.isCompleted ? 1 : 0));
    const roomCompleted = isCompleted?.reduce((a, b) => a + b, 0);

    // const userRank = getUserRank(userDetail);
    return (
        <UserPointsContainer>
            {/* <RankContainer> */}
            {/*    <RankNumberContainer $userRank={userRank}> */}
            {/*        {userRank === 1 ? <RankTrophy /> : null} */}
            {/*        <RankNumber $userRank={userRank}>{userRank}</RankNumber> */}
            {/*    </RankNumberContainer> */}
            {/*    <h5>Rank</h5> */}
            {/* </RankContainer> */}

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
            {/* <div> */}
            {/*    {userDetail?.solved && ( */}
            {/*        <div> */}
            {/*            <h4>{blogCount} </h4> */}
            {/*            <h5>Blogs</h5> */}
            {/*        </div> */}
            {/*    )} */}
            {/* </div> */}
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

// function getUserRank(userDetail, allUserDetails) {
//     const sortedDetails = Array?.from(allUserDetails || [])?.sort((a, b) => (b?.exp || 0) - (a?.exp || 0));
//     const userIndex = sortedDetails?.findIndex((detail) => detail?.user === userDetail?.user);
//     return userIndex !== -1 ? userIndex + 1 : null;
// }

export default UserPoints;
