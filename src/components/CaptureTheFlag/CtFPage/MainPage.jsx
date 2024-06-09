import { Wrapper } from "src/components/Dashboard/Profile/ProfileElements";
import { CtfLikeButton, Ctftitle, DifficultyLevelLabel, MenuButton, QuestionConatiner } from "./MainPageElement";
import { MdComputer } from "react-icons/md";
import React, { useState, useEffect } from "react";
import CTFLeaderboard from "src/components/CaptureTheFlag/CTFLeaderboard/CTFLeaderboard";
import QuestionAnswer from "./QuestionAnswer";
// import Submission from "./Submission";
import { GoArrowUpRight } from "react-icons/go";
import createCtfCertificate from "src/components/Other/Certificate/createCtfCertificate";
import { CiHeart } from "react-icons/ci";
import apiStatus from "src/features/apiStatus";
import CtfRegister from "src/components/CaptureTheFlag/SingleCTF/CtfRegister";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import UnderMaintenance from "src/components/Other/UnderMaintenance/UnderMaintenance";
// import GetCertificate from "../SingleCTF/GetCertificate";
import { getUserDetail } from "src/features/userDetail/userDetailSlice";
import {
    getAllCTFs,
    registerCTF,
    // , updateLikesAndViews
} from "src/features/ctf/ctfSlice";
import { CircleSpinner } from "react-spinners-kit";
import { encodeURL } from "src/components/Blogs/util";

export default function MainPage() {
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
        if (!user) {
            navigate("/login");
        }
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
            {registeredUsernames.includes(user?.username) || isRegistered ? (
                <div
                    style={{
                        width: "100vw",
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "74%",
                            paddingBottom: "20px",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                width: "100%",
                                gap: "10px",
                            }}
                        >
                            <MdComputer style={{ width: "80px", height: "80px", marginRight: "10px" }} />
                            <div>
                                <Ctftitle>{challenge?.challengeName}</Ctftitle>
                                <p>{challenge?.subtitle}</p>
                            </div>
                        </div>
                        <div style={{ display: "flex", alignItems: "flex-start" }}>
                            <DifficultyLevelLabel>Beginner</DifficultyLevelLabel>
                            <CtfLikeButton>
                                <CiHeart style={{ width: "25px", height: "25px" }} />
                            </CtfLikeButton>
                        </div>
                    </div>
                    <div style={{ width: "77%", marginBottom: "10px", display: "flex", padding: "10px" }}>
                        <MenuButton
                            style={{
                                backgroundColor: "#212121FF",
                                padding: "0 20px",
                            }}
                            href={challenge?.machineLink}
                        >
                            CTF
                        </MenuButton>
                        <MenuButton style={{ display: "flex", backgroundColor: "rgb(19, 19, 19)" }}>
                            Walkthrough <GoArrowUpRight style={{ marginLeft: "3px", marginTop: "3px" }} />
                        </MenuButton>
                        <MenuButton style={{ display: "flex", backgroundColor: "rgb(19, 19, 19)" }}>
                            Get Certificate <GoArrowUpRight style={{ marginLeft: "3px", marginTop: "3px" }} />
                        </MenuButton>
                    </div>

                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                        }}
                    >
                        <QuestionConatiner>
                            <QuestionAnswer
                                Description={challenge?.challengeDescription}
                                flags={challenge?.flags}
                                link={challenge?.machineLink}
                                challenge={challenge}
                                user={user}
                                setIsCompleted={setIsCompleted}
                                setIsCertExisted={setIsCertExisted}
                                userDetailIsLoading={isUserDetailLoading}
                                userDetail={userDetail}
                            />
                        </QuestionConatiner>
                        <div style={{ marginLeft: "20px", minWidth: "300px" }}>
                            {/* <div
                        className="bg-[#1a1c1d] text-white p-5 rounded-lg max-w-md mx-auto "
                        style={{ marginBottom: "20px" }}
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h2 className="text-lg font-semibold">Get Your Certificate</h2>
                                <p className="text-sm mt-1">You have not completed this CTF yet!</p>
                            </div>
                            <img
                                src="https://file.rendit.io/n/tadczxrp6riMNAspa9St.png"
                                alt="Lock Icon"
                                className="h-6 w-6"
                            />
                        </div>
                        <button className="bg-[#000000] text-white px-4 py-2 rounded shadow hover:bg-opacity-80 transition duration-150">
                            Download
                        </button>
                    </div> */}
                            <CTFLeaderboard
                                registeredUsers={registeredUsers}
                                ctfId={challenge?._id}
                                flags={challenge?.flags}
                            />
                        </div>
                    </div>
                </div>
            ) : (
                <CtfRegister challenge={challenge} handleRegister={handleRegister} />
            )}
        </Wrapper>
    );
}
