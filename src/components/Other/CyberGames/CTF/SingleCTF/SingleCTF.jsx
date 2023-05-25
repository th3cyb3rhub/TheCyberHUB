import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Wrapper } from "../../../../Dashboard/Profile/ProfileElements";
import Submission from "./Submission";
import {
    ButtonCTFRegister,
    ChallengeContainer,
    ChallengeDescription,
    ChallengeName,
    CTFMachineLink,
    CTFRegistration,
    CTFSection,
    LikesAndViewsContainer,
    LikesContainer,
    MainCTFSection,
    SingleCTFContainer,
    SingleCTFSection,
    ViewsContainer,
} from "./SingleCTFElements";

import { TeamContainer } from "../Team/TeamInviteElements";
import { getAllCTFs, registerCTF, updateLikesAndViews } from "../../../../../features/ctf/ctfSlice";

import { useDispatch, useSelector } from "react-redux";
// import TimeToStart from "../TimeToStart";
import CTFLeaderboard from "../CTFLeaderboard/CTFLeaderboard";
import { AiFillEye, AiFillLike, AiOutlineCloudDownload } from "react-icons/all";
import { encodeURL } from "../../../../Blogs/util";
import createCtfCertificate from "../../../Certificate/createCtfCertificate";
import { getUserDetail } from "../../../../../features/userDetail/userDetailSlice";
import GetCertificate from "./GetCertificate";
import apiStatus from "../../../../../features/apiStatus";
import { CircleSpinner } from "react-spinners-kit";
import UnderMaintenance from "../../../UnderMaintenance/UnderMaintenance";

const SingleCTF = () => {
    const { isApiLoading, isApiWorking } = apiStatus();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { ctf, isLoading: isCtfLoading } = useSelector((state) => state.ctf);
    const { user } = useSelector((state) => state.auth);
    const {
        userDetail,
        isLoading: userDetailIsLoading,
        // isError, message
    } = useSelector((state) => state.userDetail);
    const [isCompleted, setIsCompleted] = useState(false);
    const [isCertExisted, setIsCertExisted] = useState(false);
    const [isLikedTemp, setIsLikedTemp] = useState(false);
    const [isLikedTempNumber, setIsLikedNumber] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);

    const { ctfId } = useParams();
    const challenge = ctf?.find(
        (challenge) => `${encodeURL(challenge?.challengeName)}`.toLowerCase() === ctfId?.toLowerCase(),
    );

    // const ctfDate = challenge?.startTime || new Date(Date.now()).toLocaleString();
    // const dateNow = new Date(Date.now()).toLocaleString();

    const registeredUsers = challenge?.registeredUsers || [];

    const isLiked = challenge?.likes?.some((like) => like?.user?.toString() === user?._id.toString()) || isLikedTemp;
    const isViewed = challenge?.views?.some((view) => view?.user?.toString() === user?._id.toString());

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
        if (user) {
            dispatch(getUserDetail(user?.username));
        }

        dispatch(getAllCTFs());
        if (!isViewed && user) {
            dispatch(updateLikesAndViews({ ctfId: challenge?._id, view: true }));
        }
    }, [dispatch, navigate, user, isViewed, challenge?._id]);

    const uniqueIds = [...new Set(challenge?.views?.map((view) => view?.user))];
    const registeredUsernames = registeredUsers.map((user) => {
        return user?.username;
    });

    const handleRegister = () => {
        dispatch(registerCTF({ ctfId: challenge?._id }));
        setIsRegistered(true);
    };

    const handleLike = () => {
        if (!isLiked && user) {
            dispatch(updateLikesAndViews({ ctfId: challenge?._id, like: true }));
            setIsLikedTemp(true);
            setIsLikedNumber(challenge?.likes.length + 1);
        }
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
                <CircleSpinner size={25} color={"#1fc10d"} isLoading={isCtfLoading || isApiLoading} />
            </Wrapper>
        );
    }

    if (!isApiWorking) return <UnderMaintenance />;

    return (
        <Wrapper>
            <SingleCTFContainer>
                {/* {ctfDate > dateNow ? ( */}
                {/*    <div> */}
                {/*        <ChallengeName>{challenge?.challengeName}</ChallengeName> */}
                {/*        <TimeToStart ctfDate={challenge?.startTime} /> */}
                {/*        Register and Build your team to participate in this challenge */}
                {/*        {!isRegistered || !registeredUsernames.includes(user?.username) ? ( */}
                {/*            <CTFRegistration> */}
                {/*                <ButtonCTFRegister onClick={handleRegister}>Register Now</ButtonCTFRegister> */}
                {/*            </CTFRegistration> */}
                {/*        ) : null} */}
                {/*    </div> */}
                {/* ) : ( */}
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
                                                        {resource?.resourceName} <AiOutlineCloudDownload />
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
                                    userDetailIsLoading={userDetailIsLoading}
                                    userDetail={userDetail}
                                />
                            </CTFSection>
                            <TeamContainer>
                                <LikesAndViewsContainer>
                                    <LikesContainer>
                                        {isLiked ? (
                                            <AiFillLike style={{ color: "cadetblue" }} />
                                        ) : (
                                            <AiFillLike onClick={handleLike} style={{ cursor: "pointer" }} />
                                        )}
                                        {challenge?.likes.length < isLikedTempNumber
                                            ? isLikedTempNumber
                                            : challenge?.likes.length}
                                    </LikesContainer>
                                    <ViewsContainer>
                                        <AiFillEye /> {uniqueIds.length}
                                    </ViewsContainer>
                                </LikesAndViewsContainer>

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
                                {/* <Team team={teams[0]} isTeamEdit={isTeamEdit}/> */}
                                {/* <CTF/> */}
                                {/* <TeamChat team={teams[0]} isTeamEdit={isTeamEdit}/> */}
                            </TeamContainer>
                        </SingleCTFSection>
                    ) : (
                        <CTFRegistration>
                            <ChallengeName>{challenge?.challengeName}</ChallengeName>
                            Register and Build your team to participate in this challenge
                            <ButtonCTFRegister onClick={handleRegister}>Register Now</ButtonCTFRegister>
                        </CTFRegistration>
                    )}
                </MainCTFSection>
                {/* )} */}
            </SingleCTFContainer>
        </Wrapper>
    );
};

export default SingleCTF;
