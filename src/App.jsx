import React, { useState } from "react";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Homepage from "./components/Homepage/Homepage";
import ScrollToTop from "./components/Other/ScrollToTop";
import {
    About,
    Community,
    // CyberGames,
    Footer,
    InterviewQuestions,
    Jobs,
    // LearningPath,
    Login,
    Navbar,
    NotFound,
    // OSINTGame,
    Quiz,
    Sidebar,
    SpecialSponsors,
    Support,
} from "./components";
import { Container } from "./components/Other/MixComponents/Layout/LayoutElements";
import ContactForm from "./components/Homepage/ContactForm/ContactForm";
import TermsAndCondition from "./components/Resources/TermsAndCondition";
import PrivacyPolicy from "./components/Resources/PrivacyPolicy";
import FormData from "./components/Dashboard/FormData/FormData";
import UserProfile from "./components/Dashboard/Profile/UserProfile";
import InternshipResponse from "./components/Dashboard/FormData/InternshipResponse";
import EditPublicProfile from "./components/Dashboard/Profile/EditPublicProfile/EditPublicProfile";
import Volunteer from "./components/Opportunities/Volunteer/Volunteer";
import DisplayCommunityEvents, { DisplayEventDetails } from "./components/Opportunities/DisplayCommunityEvents";
import OpenSecProjects from "./components/Opportunities/OpenSecProjects/OpenSecProjects";
import DashboardRoute from "./components/Dashboard/DashboardRoute";
import FeedsRoute from "./components/Feeds/FeedsRoute";
import Course from "./components/Courses/NewCourses/Course";
import QuizPage from "./components/Resources/Quiz/Categories/QuizPage";
import ToolsRoutes from "./components/Tools/ToolsRoute";
import CtfRoute from "./components/CaptureTheFlag/CTFRoute";
import BlogsRoute from "./components/Blogs/BlogsRoute";
import RoadmapsRoute from "./components/Learn/Roadmaps/RoadmapsRoute";
import CoursesRoute from "./components/Learn/Courses/CoursesRoute";
import ForumRoute from "./components/Forum/ForumRoute";
import SecurityRoutes from "./components/Other/Security/SecurityRoutes";
import ExploreRoutes from "./components/Explore/ExploreRoutes";
import Leaderboard from "./components/Other/CyberGames/Leaderboard/Leaderboard";
import SettingsRoute from "./components/Dashboard/Settings";
import AdminDashboardRoute from "./components/AdminDashboard/AdminDashboardRoute";
import AiChat from "./components/AIChat/AIChat";
import MakeQuiz from "./components/Resources/Quiz/CreateQuiz/Main";

import Connections from "./components/Dashboard/Profile/ConnectionsAndFollows/Connections/Connections";
import WebSecurityRoutes from "./components/WebSecurity/WebSecurityRoutes";
import SessionExpireLogout from "./components/Other/SessionExpireLogout";
import { useSelector } from "react-redux";
import MainPage from "./components/CaptureTheFlag/CtFPage/MainPage";
import NewLeaderboard from "src/components/Other/CyberGames/Leaderboard/NewLeaderboard";
import ForgotPassword from "src/pages/ForgotPassword";
import ResetPassword from "src/pages/ResetPassword";
import Register from "src/pages/Register";
import ResourcesRoutes from "src/components/Resources/ResourcesRoutes.jsx";

const App = () => {
    const { user } = useSelector((state) => state.auth);

    const { pathname } = useLocation();

    const hideHomeHeader = () => {
        const pathDashboard = pathname.includes("/dashboard");
        const pathAdminDashboard = pathname.includes("/admin-dashboard");
        const pathLogin = pathname.includes("/login");
        const pathRegister = pathname.includes("/register");
        const pathForgetPassword = pathname.includes("/forgetPassword");
        const pathResetPassword = pathname.includes("/resetPassword");
        const pathSettings = pathname.includes("/settings");
        return (
            pathDashboard ||
            pathAdminDashboard ||
            pathLogin ||
            pathRegister ||
            pathForgetPassword ||
            pathResetPassword ||
            pathSettings
        );
    };

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => {
        setIsOpen(!isOpen);
        const overflowStatus = document.body.style.overflow;
        document.body.style.overflow = overflowStatus === "hidden" ? "auto" : "hidden";
    };

    return (
        <>
            {user ? <SessionExpireLogout /> : null}
            <Container>
                {!hideHomeHeader() && (
                    <>
                        <Sidebar isOpen={isOpen} toggle={toggle} />
                        <Navbar toggle={toggle} />
                        {/* {user ? <ChatBox /> : null} */}
                    </>
                )}
                <ScrollToTop>
                    <Routes>
                        <Route index exact path={"/"} element={<Homepage />} />

                        {/* <Route path={"/*"} element={<AuthRoute />} /> */}
                        <Route exact path={"/login"} element={<Login />} />
                        <Route exact path={"/forgetPassword"} element={<ForgotPassword />} />
                        <Route exact path={"/resetPassword/:token"} element={<ResetPassword />} />
                        <Route exact path={"/register"} element={<Register />} />

                        <Route exact path={"/aichat/*"} element={<AiChat />} />

                        <Route path={"/explore/*"} element={<ExploreRoutes />} />
                        <Route path={"/feeds/*"} element={<FeedsRoute />} />
                        <Route path={"/blogs/*"} element={<BlogsRoute />} />

                        <Route path={"/forum/*"} element={<ForumRoute />} />

                        <Route path={"/ctf/*"} element={<CtfRoute />} />
                        <Route path={"/ctf/mainpage"} element={<MainPage />} />

                        <Route exact path={"/leaderboard"} element={<Leaderboard />} />
                        <Route exact path={"/newleaderboard"} element={<NewLeaderboard />} />
                        <Route exact path={"courses/:title"} element={<Course />} />

                        <Route path={"/websecurity/*"} element={<WebSecurityRoutes />} />

                        {/* Resources */}
                        <Route path={"/roadmaps/*"} element={<RoadmapsRoute />} />
                        <Route path={"/interviewQuestions"} element={<InterviewQuestions />} />
                        <Route path={"/tools/*"} element={<ToolsRoutes />} />
                        <Route path={"/resources/*"} element={<ResourcesRoutes />} />
                        <Route path={"/courses/*"} element={<CoursesRoute />} />

                        <Route path={"/settings/*"} element={<SettingsRoute />} />

                        <Route path={"/dashboard/*"} element={<DashboardRoute />} />
                        <Route path={"/admin-dashboard/*"} element={<AdminDashboardRoute />} />
                        <Route exact path={"/contact"} element={<ContactForm />} />

                        <Route>
                            <Route exact path={"/user/:username"} element={<UserProfile />} />
                            <Route exact path={"/connections"} element={<Connections />} />
                            <Route exact path={"/user/edit/:username"} element={<EditPublicProfile />} />
                        </Route>

                        <Route exact path={"/community"} element={<Community />} />
                        <Route exact path={"/support"} element={<Support />} />
                        <Route exact path={"/sponsors"} element={<SpecialSponsors />} />

                        <Route exact path={"/volunteer"} element={<Volunteer />} />
                        <Route exact path={"/opensec-projects"} element={<OpenSecProjects />} />
                        <Route exact path={"/community-events"} element={<DisplayCommunityEvents />} />
                        <Route exact path={"/community-events/:eventId"} element={<DisplayEventDetails />} />

                        {/* <Route exact path={"/thecyberxcel"} element={<TheCyberXcel />} /> */}
                        {/* <Route exact path={"/thecyberspeak"} element={<TheCyberXcel />} /> */}

                        {/* <Route exact path={"/CyberGames"} element={<CyberGames />} /> */}
                        {/* <Route exact path={"/OSINT"} element={<OSINTGame />} /> */}
                        {/* <Route exact path={"/course"} element={<LearningPath />} /> */}

                        {/* <Route path={"/dashboard/forum/create"} element={<CreateForumPost />} /> */}

                        <Route path={"/internship"} element={<Jobs />} />
                        <Route path={"/quiz"} element={<Quiz />} />
                        <Route path={"/createquiz"} element={<MakeQuiz />} />
                        <Route path={"/quiz/:type"} element={<QuizPage />} />

                        <Route exact path={"/contactFormResponses"} element={<FormData />} />
                        <Route
                            exact
                            path={"/contactFormResponses/internshipResponse"}
                            element={<InternshipResponse />}
                        />

                        <Route path={"/security/*"} element={<SecurityRoutes />} />

                        <Route exact path={"/about"} element={<About />} />
                        <Route exact path={"/terms-conditions"} element={<TermsAndCondition />} />
                        <Route exact path={"/privacy-policy"} element={<PrivacyPolicy />} />

                        <Route path={"*"} element={<NotFound />} />
                    </Routes>
                </ScrollToTop>
                {/* <ChatBot /> */}
                {!hideHomeHeader() && <Footer />}
            </Container>

            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={true}
                rtl={false}
                pauseOnFocusLoss={true}
                draggable={false}
                pauseOnHover={true}
                toastStyle={{
                    backgroundColor: "#000",
                    color: "#fff",
                    fontWeight: "bold",
                    borderRadius: "10px",
                    border: "1px solid grey",
                }}
            />
        </>
    );
};

export default App;
