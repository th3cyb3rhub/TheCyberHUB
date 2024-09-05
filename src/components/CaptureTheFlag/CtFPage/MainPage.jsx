import { Wrapper } from "src/components/Dashboard/Profile/ProfileElements";
import { CtfLikeButton, Ctftitle, DifficultyLevelLabel, MenuButton, QuestionConatiner } from "./MainPageElement";
import { MdComputer } from "react-icons/md";
import React, { useEffect } from "react";
import QuestionAnswer from "./QuestionAnswer";
import { GoArrowUpRight } from "react-icons/go";
import { CiHeart } from "react-icons/ci";
import apiStatus from "src/features/apiStatus";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import UnderMaintenance from "src/components/Other/UnderMaintenance/UnderMaintenance";
import { CircleSpinner } from "react-spinners-kit";
import { getCTF } from "src/features/ctf/ctfSlice.js";

export default function MainPage() {
    const { isApiLoading, isApiWorking } = apiStatus();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { ctf, isLoading: isCtfLoading } = useSelector((state) => state.ctfs);
    const { user } = useSelector((state) => state.auth);

    const { ctfId } = useParams();

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }

        dispatch(getCTF(ctfId));
    }, [dispatch, user, navigate]);

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
                            <Ctftitle>{ctf?.challengeName}</Ctftitle>
                            <p>{ctf?.subtitle}</p>
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
                        href={ctf?.machineLink}
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
                            Description={ctf?.challengeDescription}
                            flags={ctf?.flags}
                            link={ctf?.machineLink}
                            challenge={ctf}
                            user={user}
                            // setIsCompleted={setIsCompleted}
                            // setIsCertExisted={setIsCertExisted}
                            // userDetailIsLoading={isUserDetailLoading}
                            // userDetail={userDetail}
                        />
                    </QuestionConatiner>
                </div>
            </div>
        </Wrapper>
    );
}
