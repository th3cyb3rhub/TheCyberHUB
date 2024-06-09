import React from "react";
import { CTFCardsContainer, CTFLink } from "src/components/CaptureTheFlag/CTFElements";
import { encodeURL } from "src/components/Blogs/util";
import CtfCard from "src/components/CaptureTheFlag/CtfCard";
import LoadingSpinner from "src/components/Other/MixComponents/Spinner/LoadingSpinner";
import NotFound from "src/NotFound";

const CtfChallenges = ({ ctf, user, userDetail, isCtfLoading, searchTerm, ctfBookmarksData, selectedTags }) => {
    if (isCtfLoading) return <LoadingSpinner />;
    if (!ctf.length) return <NotFound title="CTFs Not Found" description="There are no ctfs" />;

    const filteredData = ctf.filter((challenge) => {
        // Check if ctf is bookmarked
        const isBookmarked = ctfBookmarksData
            ? ctfBookmarksData.some((bookmark) => bookmark.itemId === challenge._id)
            : false;

        // Check if ctf content or tags match the search term
        const contentIncludesSearchTerm =
            !searchTerm || challenge?.challengeName?.toLowerCase().includes(searchTerm?.toLowerCase()) || false;
        const allFilterTagsIncluded =
            !selectedTags || selectedTags.length === 0
                ? true
                : selectedTags?.every((selectedTag) =>
                      challenge?.tags?.some((challengeTag) => challengeTag.toLowerCase() === selectedTag.toLowerCase()),
                  );

        // Combine the conditions to determine if the ctf should be included in the filtered ctfs
        return allFilterTagsIncluded && (!searchTerm || isBookmarked || contentIncludesSearchTerm);
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
