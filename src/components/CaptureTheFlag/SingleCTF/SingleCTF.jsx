import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Wrapper } from "src/components/Dashboard/Profile/ProfileElements";
import Submission from "src/components/CaptureTheFlag/CtFPage/Submission";
import {
    ChallengeContainer,
    ChallengeDescription,
    ChallengeName,
    CTFMachineLink,
    CTFSection,
    MainCTFSection,
    SingleCTFContainer,
    SingleCTFSection,
} from "./SingleCTFElements";
import { getCTF } from "src/features/ctf/ctfSlice";

import { useDispatch, useSelector } from "react-redux";
import { AiOutlineCloudDownload } from "react-icons/ai";
import apiStatus from "src/features/apiStatus";
import { CircleSpinner } from "react-spinners-kit";
import UnderMaintenance from "src/components/Other/UnderMaintenance/UnderMaintenance";

const SingleCTF = () => {
    const { isApiLoading, isApiWorking } = apiStatus();
    const dispatch = useDispatch();
    const { ctf, isLoading: isCtfLoading } = useSelector((state) => state.ctf);
    const { user } = useSelector((state) => state.auth);

    const { title } = useParams();

    useEffect(() => {
        dispatch(getCTF(title));
    }, [dispatch]);

    if (isApiLoading || isCtfLoading) {
        return (
            <Wrapper>
                <CircleSpinner size={25} color={"#ff6b08"} isLoading={isApiLoading || isCtfLoading} />
            </Wrapper>
        );
    }

    if (!isApiWorking) return <UnderMaintenance />;

    return (
        <Wrapper>
            <SingleCTFContainer>
                <MainCTFSection>
                    <SingleCTFSection>
                        <CTFSection>
                            <ChallengeContainer>
                                <ChallengeName>{ctf?.challengeName}</ChallengeName>
                                <ChallengeDescription>{ctf?.subtitle}</ChallengeDescription>
                                <ChallengeDescription>{ctf?.challengeDescription}</ChallengeDescription>
                                {ctf?.machineLink ? (
                                    <CTFMachineLink href={ctf?.machineLink} target="_blank">
                                        Machine Link: start the machine from here and submit the flags below
                                    </CTFMachineLink>
                                ) : null}
                                {ctf?.downloadableResources &&
                                    ctf?.downloadableResources.map(
                                        (resource, index) =>
                                            resource?.resourceName && (
                                                <CTFMachineLink
                                                    href={resource?.resourceLink}
                                                    target="_blank"
                                                    key={index}
                                                >
                                                    {resource?.resourceName}
                                                    <AiOutlineCloudDownload />
                                                </CTFMachineLink>
                                            ),
                                    )}
                            </ChallengeContainer>
                            <Submission
                                ctfId={ctf?._id}
                                flags={ctf?.flags}
                                user={user}
                                // setIsCompleted={setIsCompleted}
                                // setIsCertExisted={setIsCertExisted}
                                // userDetailIsLoading={isUserDetailLoading}
                                // userDetail={userDetail}
                            />
                        </CTFSection>
                    </SingleCTFSection>
                </MainCTFSection>
            </SingleCTFContainer>
        </Wrapper>
    );
};

export default SingleCTF;
