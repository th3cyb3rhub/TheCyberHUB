import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

import { TeamContainer } from "src/components/CaptureTheFlag/Team/TeamInviteElements";
import {
    getAllCTFs,
    registerCTF,
    // , updateLikesAndViews
} from "src/features/ctf/ctfSlice";

import { useDispatch, useSelector } from "react-redux";
import CTFLeaderboard from "src/components/CaptureTheFlag/CTFLeaderboard/CTFLeaderboard";
import { AiOutlineCloudDownload } from "react-icons/ai";
import { encodeURL } from "src/components/Blogs/util";
import createCtfCertificate from "src/components/Other/Certificate/createCtfCertificate";
import { getUserDetail } from "src/features/userDetail/userDetailSlice";
import GetCertificate from "./GetCertificate";
import apiStatus from "src/features/apiStatus";
import { CircleSpinner } from "react-spinners-kit";
import UnderMaintenance from "src/components/Other/UnderMaintenance/UnderMaintenance";
import CtfRegister from "./CtfRegister";

const SingleCTF = () => {
    const { isApiLoading, isApiWorking } = apiStatus();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { ctf, isLoading: isCtfLoading } = useSelector((state) => state.ctf);
    const { user } = useSelector((state) => state.auth);
    const { userDetail, isUserDetailLoading } = useSelector((state) => state.userDetail);
    const [isCompleted, setIsCompleted] = useState(false);
    const [isCertExisted, setIsCertExisted] = useState(false);

    const [isRegistered, setIsRegistered] = useState(false);

    const { ctfId } = useParams();
    const challenge =
        ctf &&
        ctf?.length > 0 &&
        ctf?.find((challenge) => `${encodeURL(challenge?.challengeName)}`.toLowerCase() === ctfId?.toLowerCase());

    // const ctfDate = challenge?.startTime || new Date(Date.now()).toLocaleString();
    // const dateNow = new Date(Date.now()).toLocaleString();

    const registeredUsers = challenge?.registeredUsers || [];

    useEffect(() => {
        // if (!user) {
        //     navigate("/login");
        // }
        if (user) {
            dispatch(getUserDetail(user?.username));
        }

        dispatch(getAllCTFs());

        if (user?.username && challenge?.registeredUsers?.some((regUser) => regUser?.username === user?.username)) {
            setIsRegistered(true);
        }
    }, [dispatch, user, navigate, challenge?._id]);

    const registeredUsernames = registeredUsers.map((user) => {
        return user?.username;
    });

    const handleRegister = () => {
        dispatch(registerCTF({ ctfId: challenge?._id }));
    };

    if (!isCertExisted && isCompleted) {
        createCtfCertificate({
            ctf: challenge?.challengeName,
            ctfId: challenge?._id,
            ctfDate: challenge?.startTime,
            userId: user?._id,
            username: user?.username,
            fullName: user?.name,
            email: user?.email,
        }).then((r) => {
            setIsCertExisted(true);
        });
    }

    if (isCtfLoading || isApiLoading) {
        return (
            <Wrapper>
                <CircleSpinner size={25} color={"#ff6b08"} isLoading={isCtfLoading || isApiLoading} />
            </Wrapper>
        );
    }

    if (!isApiWorking) return <UnderMaintenance />;

    return (
        <Wrapper>
            <SingleCTFContainer>
                <MainCTFSection>
                    {registeredUsernames.includes(user?.username) || isRegistered ? (
                        <SingleCTFSection>
                            <CTFSection>
                                <ChallengeContainer>
                                    <ChallengeName>{challenge?.challengeName}</ChallengeName>
                                    <ChallengeDescription>{challenge?.subtitle}</ChallengeDescription>
                                    <ChallengeDescription>{challenge?.challengeDescription}</ChallengeDescription>
                                    {challenge?.machineLink ? (
                                        <CTFMachineLink href={challenge?.machineLink} target="_blank">
                                            Machine Link: start the machine from here and submit the flags below
                                        </CTFMachineLink>
                                    ) : null}
                                    {challenge?.downloadableResources &&
                                        challenge?.downloadableResources.map(
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
                                    ctfId={challenge?._id}
                                    flags={challenge?.flags}
                                    user={user}
                                    setIsCompleted={setIsCompleted}
                                    setIsCertExisted={setIsCertExisted}
                                    userDetailIsLoading={isUserDetailLoading}
                                    userDetail={userDetail}
                                />
                            </CTFSection>

                            <TeamContainer>
                                <GetCertificate
                                    challenge={userDetail?.challenge}
                                    user={user}
                                    ctfCertificates={userDetail.ctfCertificates}
                                    ctfId={challenge?._id}
                                    isCertExisted={isCertExisted}
                                />

                                <CTFLeaderboard
                                    registeredUsers={registeredUsers}
                                    ctfId={challenge?._id}
                                    flags={challenge?.flags}
                                />
                            </TeamContainer>
                        </SingleCTFSection>
                    ) : (
                        <CtfRegister challenge={challenge} handleRegister={handleRegister} />
                    )}
                </MainCTFSection>
            </SingleCTFContainer>
        </Wrapper>
    );
};

export default SingleCTF;
