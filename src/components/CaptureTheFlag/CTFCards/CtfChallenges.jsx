import React from "react";
import { CTFCardsContainer, CTFLink } from "../CTFElements";
import { encodeURL } from "../../Blogs/util";
import CtfCard from "../CtfCard";

const CtfChallenges = ({ ctf, user, userDetail, searchTerm, ctfBookmarksData }) => {
    const filteredData = ctf.filter((challenge) => {
        // Check if ctf is bookmarked
        const isBookmarked = ctfBookmarksData
            ? ctfBookmarksData.some((bookmark) => bookmark.itemId === challenge._id)
            : false;

        // Check if ctf content or tags match the search term
        const contentIncludesSearchTerm =
            !searchTerm || challenge?.challengeName?.toLowerCase().includes(searchTerm?.toLowerCase()) || false;
        const tagsIncludeSearchTerm =
            !searchTerm || challenge?.tags?.join(" ").toLowerCase().includes(searchTerm?.toLowerCase()) || false;

        // Combine the conditions to determine if the ctf should be included in the filtered ctfs
        return !searchTerm || isBookmarked || contentIncludesSearchTerm || tagsIncludeSearchTerm;
    });
    return filteredData.length > 0 ? (
        <CTFCardsContainer>
            {filteredData
                ?.slice()
                .reverse()
                .map((challenge, index) => (
                    <CTFLink
                        to={{
                            pathname: `/ctf/${encodeURL(challenge.type)}/${encodeURL(challenge.difficulty)}/${encodeURL(
                                challenge.challengeName,
                            )}`,
                        }}
                        key={index}
                    >
                        <CtfCard challenge={challenge} user={user} userDetail={userDetail} index={index} />
                    </CTFLink>
                ))}
        </CTFCardsContainer>
    ) : null;
};

export default CtfChallenges;
