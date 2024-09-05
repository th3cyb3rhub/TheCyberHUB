import React from "react";
import { Route, Routes } from "react-router-dom";
import { NotFound } from "src/components/index";
import SubHeader from "./SubHeader";
import { Wrapper } from "src/components/Dashboard/Profile/ProfileElements";
import Topics from "./WebSecurityTopics/Topics";
import Topic from "./WebSecurityTopics/Topic";
import CodeReview from "./CodeReviews/CodeReview";
import CodeReviewLab from "./CodeReviews/CodeReviewLab";
import WebSecurityLabs from "./WebSecurityLabs/WebSecurityLabs";
import WebSecurityRoom from "./WebSecurityLabs/WebSecurityRoom";
import CrackMe from "./CrackMe/CrackMe";
import CrackMeRoom from "./CrackMe/CrackMeRoom";
import SecureCode from "src/components/WebSecurity/SecureCode/SecureCode.jsx";

const WebSecurityRoutes = () => {
    const subHeaderData = [
        { id: 1, title: "Topics", link: "topics" },
        { id: 2, title: "Labs", link: "labs" },
        // { id: 4, title: "Secure Code", link: "secure-code" },
        { id: 3, title: "Code Review", link: "code-review" },
        { id: 5, title: "Crack Me", link: "crack-me" },
    ];

    return (
        <Wrapper style={{ marginTop: "100px" }}>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "10px",
                    width: "100%",
                    maxWidth: "1200px",
                }}
            >
                <SubHeader heading={"Web Security"} subHeaderData={subHeaderData} />
                <div style={{ width: "100%" }}>
                    <Routes>
                        <Route index element={<Topics />} />

                        <Route path={"topics"} element={<Topics />} />
                        <Route path={"topic/:id"} element={<Topic />} />

                        <Route path={"labs"} element={<WebSecurityLabs />} />
                        <Route path={"labs/:id"} element={<WebSecurityRoom />} />

                        <Route path={"code-review"} element={<CodeReview />} />
                        <Route path={"code-review/:id"} element={<CodeReviewLab />} />

                        <Route path={"secure-code"} element={<SecureCode />} />

                        <Route path={"crack-me"} element={<CrackMe />} />
                        <Route path={"crack-me/:id"} element={<CrackMeRoom />} />

                        <Route path={"*"} element={<NotFound />} />
                        <Route element={<NotFound />} />
                    </Routes>
                </div>
            </div>
        </Wrapper>
    );
};

export default WebSecurityRoutes;
