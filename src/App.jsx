import React, { useEffect, useState } from "react";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Homepage from "./components/Homepage/Homepage";
import ScrollToTop from "./components/Other/ScrollToTop";
import {
    About,
    Community,
    CreateBlog,
    CyberGames,
    Footer,
    InterviewQuestions,
    Jobs,
    LearningPath,
    Navbar,
    NotFound,
    OSINTGame,
    Quiz,
    Sidebar,
    SpecialSponsors,
    Support,
} from "./components";
import { Container } from "./components/Other/MixComponents/Layout/LayoutElements";
import Spinner from "./components/Other/MixComponents/Spinner/Spinner";
// import { useSelector } from "react-redux";
import ContactForm from "./components/Homepage/ContactForm/ContactForm";
import TermsAndCondition from "./components/Resources/TermsAndCondition";
import PrivacyPolicy from "./components/Resources/PrivacyPolicy";
import FormData from "./components/Dashboard/FormData/FormData";
import UserProfile from "./components/Dashboard/Profile/UserProfile";
// import UserTimestamps from "./features/UserTimestamps";
import InternshipResponse from "./components/Dashboard/FormData/InternshipResponse";
import EditPublicProfile from "./components/Dashboard/Profile/EditPublicProfile/EditPublicProfile";
import Volunteer from "./components/Opportunities/Volunteer/Volunteer";
import TimeLineEvent from "./components/Opportunities/TimeLineEvent/TimeLineEvent";
import TheCyberXcel from "./components/Opportunities/TheCyberXcel/TheCyberXcel";
import OpenSecProjects from "./components/Opportunities/OpenSecProjects/OpenSecProjects";
import DashboardRoute from "./components/Dashboard/DashboardRoute";
import CreateForumPost from "./components/Forum/CreateForumPost/CreateForumPost";
import FeedsRoute from "./components/Feeds/FeedsRoute";
import ToolsRoutes from "./components/Tools/ToolsRoute";
import CtfRoute from "./components/CaptureTheFlag/CTFRoute";
import BlogsRoute from "./components/Blogs/BlogsRoute";
import EventsRoute from "./components/Events/EventsRoute";
import RoadmapsRoute from "./components/Learn/Roadmaps/RoadmapsRoute";
import CoursesRoute from "./components/Learn/Courses/CoursesRoute";
import ForumRoute from "./components/Forum/ForumRoute";
import AuthRoute from "./pages/AuthRoute";
import SecurityRoutes from "./components/Other/Security/SecurityRoutes";
import ExploreRoutes from "./components/Explore/ExploreRoutes";
import Leaderboard from "./components/Other/CyberGames/Leaderboard/Leaderboard";
import ChatRoute from "./components/Chat/ChatRoute";
import SettingsRoute from "./components/Dashboard/Settings";
import HackBook from "./components/HackBook/HackBook";
// import ChatBot from "./components/ChatBot/ChatBot";

const App = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { pathname } = useLocation();

    const hostname = window.location.hostname;

    useEffect(() => {
        if (hostname === "localhost") {
            setTimeout(() => {
                setIsLoading(false);
            }, 0);
        } else {
            setTimeout(() => {
                setIsLoading(false);
            }, 5000);
        }
    }, []);

    const hideHomeHeader = () => {
        const pathDashboard = pathname.includes("/dashboard");
        const chat = pathname.includes("/chat");
        const pathLogin = pathname.includes("/login");
        const pathRegister = pathname.includes("/register");
        const pathForgetPassword = pathname.includes("/forgetPassword");
        const pathResetPassword = pathname.includes("/resetPassword");
        return pathDashboard || pathLogin || pathRegister || pathForgetPassword || pathResetPassword || chat;
    };

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => {
        setIsOpen(!isOpen);
        const overflowStatus = document.body.style.overflow;
        document.body.style.overflow = overflowStatus === "hidden" ? "auto" : "hidden";
    };

    // const { user } = useSelector((state) => state.auth);

    if (isLoading) return <Spinner />;

    return (
        <>
            {/* {user && <UserTimestamps user={user} />} */}
            <Container>
                {!hideHomeHeader() && (
                    <>
                        <Sidebar isOpen={isOpen} toggle={toggle} />
                        <Navbar toggle={toggle} />
                    </>
                )}
                <ScrollToTop>
                    <Routes>
                        <Route index exact path={"/"} element={<Homepage />} />

                        <Route path={"/*"} element={<AuthRoute />} />

                        <Route path={"/explore/*"} element={<ExploreRoutes />} />
                        <Route path={"/feeds/*"} element={<FeedsRoute />} />
                        <Route path={"/blogs/*"} element={<BlogsRoute />} />
                        <Route exact path={"/blogs/create-blog"} element={<CreateBlog />} />

                        <Route path={"/forum/*"} element={<ForumRoute />} />
                        <Route path={"/events/*"} element={<EventsRoute />} />

                        <Route path={"/ctf/*"} element={<CtfRoute />} />
                        <Route exact path={"/leaderboard"} element={<Leaderboard />} />

                        <Route path={"/tools/*"} element={<ToolsRoutes />} />

                        <Route path={"/roadmaps/*"} element={<RoadmapsRoute />} />
                        <Route path={"/courses/*"} element={<CoursesRoute />} />

                        <Route path={"/security/*"} element={<SecurityRoutes />} />

                        <Route path={"/dashboard/settings/*"} element={<SettingsRoute />} />

                        <Route path={"/dashboard/*"} element={<DashboardRoute />} />
                        <Route path={"/chat/*"} element={<ChatRoute />} />

                        <Route exact path={"/contact"} element={<ContactForm />} />
                        <Route exact path={"/hackbook"} element={<HackBook />} />

                        <Route>
                            <Route exact path={"/@:username"} element={<UserProfile />} />
                            <Route exact path={"/edit/@:username"} element={<EditPublicProfile />} />
                        </Route>

                        <Route exact path={"/community"} element={<Community />} />
                        <Route exact path={"/support"} element={<Support />} />
                        <Route exact path={"/sponsors"} element={<SpecialSponsors />} />

                        <Route exact path={"/about"} element={<About />} />
                        <Route exact path={"/terms-conditions"} element={<TermsAndCondition />} />
                        <Route exact path={"/privacy-policy"} element={<PrivacyPolicy />} />

                        <Route exact path={"/volunteer"} element={<Volunteer />} />
                        <Route exact path={"/opensec-projects"} element={<OpenSecProjects />} />
                        <Route exact path={"/timeline-events"} element={<TimeLineEvent />} />
                        <Route exact path={"/thecyberxcel"} element={<TheCyberXcel />} />
                        <Route exact path={"/thecyberspeak"} element={<TheCyberXcel />} />

                        <Route exact path={"/CyberGames"} element={<CyberGames />} />
                        <Route exact path={"/OSINT"} element={<OSINTGame />} />
                        <Route exact path={"/course"} element={<LearningPath />} />

                        <Route path={"/dashboard/forum/create"} element={<CreateForumPost />} />

                        <Route path={"/internship"} element={<Jobs />} />
                        <Route path={"/quiz"} element={<Quiz />} />
                        <Route path={"/interviewQuestions"} element={<InterviewQuestions />} />
                        <Route exact path={"/contactFormResponses"} element={<FormData />} />
                        <Route
                            exact
                            path={"/contactFormResponses/internshipResponse"}
                            element={<InternshipResponse />}
                        />
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
