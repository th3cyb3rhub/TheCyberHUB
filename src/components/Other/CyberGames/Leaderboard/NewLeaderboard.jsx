import React, { useEffect } from "react";
import { Wrapper } from "src/components/Dashboard/Profile/ProfileElements";
import apiStatus from "src/features/apiStatus";
import { useDispatch, useSelector } from "react-redux";
import { getAllUserDetails, getUserDetail, userDetailReset } from "src/features/userDetail/userDetailSlice";
import { cdnContentImagesUrl } from "src/features/apiUrl";
import { CircleSpinner } from "react-spinners-kit";
import UnderMaintenance from "src/components/Other/UnderMaintenance/UnderMaintenance";

const NewLeaderboard = () => {
    const { isApiLoading, isApiWorking } = apiStatus();
    const { user } = useSelector((state) => state.auth);
    const { userDetails, isLoading, isError, message } = useSelector((state) => state.userDetail);
    const dispatch = useDispatch();

    useEffect(() => {
        if (isError) {
            console.log(message);
        }
        if (user) {
            dispatch(getUserDetail(user?.username));
        }

        dispatch(getAllUserDetails());

        return () => {
            dispatch(userDetailReset());
        };
    }, [dispatch]);

    const allUsers = userDetails && [...userDetails].sort((a, b) => (b?.exp || 0) - (a?.exp || 0));
    // .sort((a, b) => a?.username?.localeCompare(b?.username))

    // make top2 at index 0 and top 1 at index 1 and let the 3rd at 2
    const ist = allUsers.slice(0, 1);
    const sec = allUsers.slice(1, 2);
    const third = allUsers.slice(2, 3);

    const top3 = [...third, ...ist, ...sec];
    const rest = allUsers.slice(3);

    const avatar = (user) => cdnContentImagesUrl("/user/" + (user?.avatar || "avatarDummy.png"));

    if (isLoading || isApiLoading) {
        return (
            <Wrapper>
                <CircleSpinner size={20} color={"#ff6b08"} isLoading={isLoading || isApiLoading} />
            </Wrapper>
        );
    }

    if (!isApiWorking) return <UnderMaintenance />;

    return (
        <Wrapper>
            <div
                className="Iphone1313Pro1"
                style={{ width: 390, height: 2000, position: "relative", background: "#151729" }}
            >
                {/* <div className="EntypoDotsTwoHorizontal" style={{width: 32, height: 32, left: 341, top: 15, position: 'absolute'}}> */}
                {/*    <div className="Vector" style={{width: 19.84, height: 7.04, left: 6.08, top: 12.48, position: 'absolute', background: '#699BF7'}}></div> */}
                {/*    <div className="EntypoDotsTwoHorizontal" style={{width: 32, height: 32, paddingLeft: 6.08, paddingRight: 6.08, left: 0, top: 12, position: 'absolute', justifyContent: 'center', alignItems: 'center', display: 'inline-flex'}}> */}
                {/*        <div className="Vector" style={{width: 19.84, height: 7.04, background: '#699BF7'}}></div> */}
                {/*    </div> */}
                {/* </div> */}
                {/* <div className="EvaArrowIosBackFill" style={{width: 35, height: 35, paddingTop: 7.29, paddingBottom: 7.29, paddingLeft: 11.66, paddingRight: 13.14, left: 14, top: 20, position: 'absolute', justifyContent: 'center', alignItems: 'center', display: 'inline-flex'}}> */}
                {/*    <div className="Vector" style={{width: 10.21, height: 20.42, background: '#699BF7'}}></div> */}
                {/* </div> */}
                <div
                    className="Leaderboard"
                    style={{
                        left: 133,
                        top: 28,
                        position: "absolute",
                        color: "white",
                        fontSize: 20,
                        fontFamily: "Inter",
                        fontWeight: "600",
                        wordWrap: "break-word",
                    }}
                >
                    Leaderboard
                </div>
                <div
                    className="Rectangle1"
                    style={{
                        width: 342,
                        height: 50,
                        left: 24,
                        top: 95,
                        position: "absolute",
                        background: "#1E2237",
                        borderRadius: 12,
                    }}
                />
                <div
                    className="Rectangle4"
                    style={{
                        width: 342,
                        height: 113,
                        left: 27,
                        top: 293,
                        position: "absolute",
                        background: "#1E2237",
                        borderRadius: 12,
                    }}
                />
                <div
                    className="Rectangle5"
                    style={{
                        width: 122,
                        height: 159,
                        left: 137,
                        top: 247,
                        position: "absolute",
                        background: "#252A40",
                        borderTopLeftRadius: 30,
                        borderTopRightRadius: 30,
                    }}
                />

                <div
                    className="Region"
                    style={{
                        left: 48,
                        top: 111,
                        position: "absolute",
                        color: "white",
                        fontSize: 15,
                        fontFamily: "Inter",
                        fontWeight: "500",
                        wordWrap: "break-word",
                    }}
                >
                    Global
                </div>
                <div
                    className="National"
                    style={{
                        left: 165,
                        top: 111,
                        position: "absolute",
                        color: "white",
                        fontSize: 15,
                        fontFamily: "Inter",
                        fontWeight: "500",
                        wordWrap: "break-word",
                    }}
                >
                    National
                </div>
                <div
                    className="Global"
                    style={{
                        left: 287,
                        top: 111,
                        position: "absolute",
                        color: "white",
                        fontSize: 15,
                        fontFamily: "Inter",
                        fontWeight: "500",
                        wordWrap: "break-word",
                    }}
                >
                    Regional
                </div>

                <div
                    className="EmmaAria"
                    style={{
                        left: 296,
                        top: 333,
                        position: "absolute",
                        color: "white",
                        fontSize: 12,
                        fontFamily: "Inter",
                        fontWeight: "500",
                        wordWrap: "break-word",
                    }}
                >
                    {top3[0]?.name}{" "}
                </div>
                <div
                    className="Eiden"
                    style={{
                        left: 162,
                        top: 304,
                        position: "absolute",
                        color: "white",
                        fontSize: 12,
                        fontFamily: "Inter",
                        fontWeight: "500",
                        wordWrap: "break-word",
                    }}
                >
                    {top3[1]?.name}{" "}
                </div>
                <div
                    className="Jackson"
                    style={{
                        left: 58,
                        top: 336,
                        position: "absolute",
                        color: "white",
                        fontSize: 12,
                        fontFamily: "Inter",
                        fontWeight: "500",
                        wordWrap: "break-word",
                    }}
                >
                    {top3[2]?.name}
                </div>

                <div
                    className="Username"
                    style={{
                        left: 293,
                        top: 379,
                        position: "absolute",
                        color: "#B7B3B3",
                        fontSize: 8,
                        fontFamily: "Inter",
                        fontWeight: "300",
                        wordWrap: "break-word",
                    }}
                >
                    @{top3[0]?.username}
                </div>
                <div
                    className="Username"
                    style={{
                        left: 175,
                        top: 362,
                        position: "absolute",
                        color: "#B7B3B3",
                        fontSize: 8,
                        fontFamily: "Inter",
                        fontWeight: "300",
                        wordWrap: "break-word",
                    }}
                >
                    @{top3[1]?.username}
                </div>
                <div
                    className="Username"
                    style={{
                        left: 58,
                        top: 379,
                        position: "absolute",
                        color: "#B7B3B3",
                        fontSize: 8,
                        fontFamily: "Inter",
                        fontWeight: "300",
                        wordWrap: "break-word",
                    }}
                >
                    @{top3[2]?.username}
                </div>

                <div
                    style={{
                        left: 296,
                        top: 356,
                        position: "absolute",
                        color: "#00D95F",
                        fontSize: 15,
                        fontFamily: "Inter",
                        fontWeight: "700",
                        wordWrap: "break-word",
                    }}
                >
                    {top3[0]?.exp || 0}
                </div>

                <div
                    style={{
                        left: 185,
                        top: 332,
                        position: "absolute",
                        color: "#FFAA00",
                        fontSize: 15,
                        fontFamily: "Inter",
                        fontWeight: "700",
                        wordWrap: "break-word",
                    }}
                >
                    {top3[1]?.exp || 0}
                </div>

                <div
                    style={{
                        left: 64,
                        top: 357,
                        position: "absolute",
                        color: "#009BD6",
                        fontSize: 15,
                        fontFamily: "Inter",
                        fontWeight: "700",
                        wordWrap: "break-word",
                    }}
                >
                    {top3[2]?.exp || 0}
                </div>

                <div
                    className="Rectangle2"
                    style={{
                        width: 45,
                        height: 3,
                        left: 48,
                        top: 142,
                        position: "absolute",
                        background: "#699BF7",
                        borderRadius: 10,
                    }}
                />
                <div
                    className="Rectangle3"
                    style={{
                        width: 390,
                        height: 410,
                        left: 0,
                        top: 434,
                        position: "absolute",
                        background: "#1E2237",
                        borderTopLeftRadius: 40,
                        borderTopRightRadius: 40,
                    }}
                />

                <img
                    className="Ellipse3"
                    style={{
                        width: 68,
                        height: 68,
                        left: 280,
                        top: 249,
                        position: "absolute",
                        borderRadius: 9999,
                        border: "3px #00D95F solid",
                    }}
                    src={avatar(top3[0])}
                    alt={top3[0]?.name}
                />
                <img
                    className="Ellipse1"
                    style={{
                        width: 82,
                        height: 82,
                        left: 157,
                        top: 196,
                        position: "absolute",
                        borderRadius: 9999,
                        border: "3px #FFAA00 solid",
                    }}
                    src={avatar(top3[1])}
                    alt={top3[1]?.name}
                />
                <img
                    className="Ellipse2"
                    style={{
                        width: 68,
                        height: 68,
                        left: 48,
                        top: 251,
                        position: "absolute",
                        borderRadius: 9999,
                        border: "3px #009BD6 solid",
                    }}
                    src={avatar(top3[2])}
                    alt={top3[2]?.name}
                />

                <div className="Group1" style={{ width: 34, height: 26.82, left: 180, top: 165, position: "absolute" }}>
                    <div
                        className="Vector"
                        style={{
                            width: 28,
                            height: 19.82,
                            left: 3,
                            top: 7,
                            position: "absolute",
                            background: "#FFAA00",
                        }}
                    ></div>
                    <div
                        className="Ellipse4"
                        style={{
                            width: 8,
                            height: 8,
                            left: 13,
                            top: 0,
                            position: "absolute",
                            background: "#FFAA00",
                            borderRadius: 9999,
                        }}
                    />
                    <div
                        className="Ellipse7"
                        style={{
                            width: 6,
                            height: 6,
                            left: 14,
                            top: 15,
                            position: "absolute",
                            background: "#BE9502",
                            borderRadius: 9999,
                        }}
                    />
                    <div
                        className="Ellipse5"
                        style={{
                            width: 5,
                            height: 5,
                            left: 29,
                            top: 8,
                            position: "absolute",
                            background: "#FFAA00",
                            borderRadius: 9999,
                        }}
                    />
                    <div
                        className="Ellipse6"
                        style={{
                            width: 5,
                            height: 5,
                            left: 0,
                            top: 8,
                            position: "absolute",
                            background: "#FFAA00",
                            borderRadius: 9999,
                        }}
                    />
                    <div
                        className="Ellipse8"
                        style={{
                            width: 3,
                            height: 3,
                            left: 8,
                            top: 18,
                            position: "absolute",
                            background: "#BE9502",
                            borderRadius: 9999,
                        }}
                    />
                    <div
                        className="Ellipse9"
                        style={{
                            width: 3,
                            height: 3,
                            left: 23,
                            top: 18,
                            position: "absolute",
                            background: "#BE9502",
                            borderRadius: 9999,
                        }}
                    />
                </div>

                <div
                    className="Rectangle6"
                    style={{
                        width: 17,
                        height: 17,
                        left: 82.02,
                        top: 305,
                        position: "absolute",
                        transform: "rotate(45deg)",
                        transformOrigin: "0 0",
                        background: "#009BD6",
                        borderRadius: 5,
                    }}
                />
                <div
                    className="Rectangle7"
                    style={{
                        width: 17,
                        height: 17,
                        left: 198.02,
                        top: 264,
                        position: "absolute",
                        transform: "rotate(45deg)",
                        transformOrigin: "0 0",
                        background: "#FFAA00",
                        borderRadius: 5,
                    }}
                />
                <div
                    className="Rectangle8"
                    style={{
                        width: 17,
                        height: 17,
                        left: 315.02,
                        top: 304,
                        position: "absolute",
                        transform: "rotate(45deg)",
                        transformOrigin: "0 0",
                        background: "#00D95F",
                        borderRadius: 5,
                    }}
                />

                <div
                    style={{
                        left: 80,
                        top: 312,
                        position: "absolute",
                        color: "white",
                        fontSize: 8,
                        fontFamily: "Inter",
                        fontWeight: "600",
                        wordWrap: "break-word",
                    }}
                >
                    2
                </div>
                <div
                    style={{
                        left: 196,
                        top: 271,
                        position: "absolute",
                        color: "white",
                        fontSize: 8,
                        fontFamily: "Inter",
                        fontWeight: "600",
                        wordWrap: "break-word",
                    }}
                >
                    1
                </div>
                <div
                    style={{
                        left: 312,
                        top: 311,
                        position: "absolute",
                        color: "white",
                        fontSize: 8,
                        fontFamily: "Inter",
                        fontWeight: "600",
                        wordWrap: "break-word",
                    }}
                >
                    3
                </div>

                {rest.map((user, index) => (
                    <img
                        key={index}
                        className="Ellipse"
                        style={{
                            width: 50,
                            height: 50,
                            left: 23,
                            top: 462 + 82 * index,
                            position: "absolute",
                            borderRadius: 9999,
                        }}
                        src={avatar(user)}
                    />
                ))}

                {rest.map((user, index) => (
                    <div
                        key={index}
                        className="Sebastian"
                        style={{
                            left: 94,
                            top: 469 + 80 * index,
                            position: "absolute",
                            color: "white",
                            fontSize: 12,
                            fontFamily: "Inter",
                            fontWeight: "500",
                            wordWrap: "break-word",
                        }}
                    >
                        {user?.name}
                    </div>
                ))}

                {rest.map((user, index) => (
                    <div
                        key={index}
                        style={{
                            left: 338,
                            top: 472 + 80 * index,
                            position: "absolute",
                            color: "white",
                            fontSize: 12,
                            fontFamily: "Inter",
                            fontWeight: "700",
                            wordWrap: "break-word",
                        }}
                    >
                        {user?.exp || 0}
                    </div>
                ))}

                {rest.map((user, index) => (
                    <div
                        key={index}
                        className="Username"
                        style={{
                            left: 96,
                            top: 490 + 82 * index,
                            position: "absolute",
                            color: "#B7B3B3",
                            fontSize: 8,
                            fontFamily: "Inter",
                            fontWeight: "300",
                            wordWrap: "break-word",
                        }}
                    >
                        @{user?.username}
                    </div>
                ))}

                {rest.map((user, index) => (
                    <div
                        key={index}
                        className="Line2"
                        style={{
                            width: 334,
                            height: 0,
                            left: 26,
                            top: 530 + 80 * index,
                            position: "absolute",
                            border: "1px rgba(94.56, 89.20, 89.20, 0.54) solid",
                        }}
                    ></div>
                ))}
            </div>
        </Wrapper>
    );
};

export default NewLeaderboard;
