import React from "react";
import {
    CTFCardBody,
    CTFCardContainer,
    CTFCardFooter,
    CTFCardHeader,
    CTFCardSubtitle,
    CTFTag,
    CTFTags,
    CTFType,
} from "./CTFElements";
import { FcCheckmark } from "react-icons/fc";

const CtfCard = ({ challenge, user, userDetail, index }) => {
    return (
        <CTFCardContainer>
            <CTFCardHeader>
                {challenge?.challengeName}
                {user &&
                    userDetail?.solved?.map((ctf, index) =>
                        challenge?._id === ctf?.ctfId && ctf?.isCompleted === true ? (
                            <FcCheckmark key={index} color="green" size={25} />
                        ) : null,
                    )}
            </CTFCardHeader>

            <CTFCardBody>
                <CTFCardSubtitle>{challenge?.subtitle}</CTFCardSubtitle>
            </CTFCardBody>

            <CTFCardFooter>
                <CTFTags>
                    {challenge?.tags
                        .slice(0, 3)
                        .map((tag, index) => tag.length > 0 && <CTFTag key={index}>{tag}</CTFTag>)}

                    {challenge?.tags.length > 3 && <CTFTag key={index}> + {challenge.tags.length - 3}</CTFTag>}
                </CTFTags>
                <CTFType>{challenge?.difficulty}</CTFType>
            </CTFCardFooter>
        </CTFCardContainer>
    );
};

export default CtfCard;
