import React, { useEffect, useState } from "react";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Homepage from "./components/Homepage/Homepage";
import ScrollToTop from "./components/Other/ScrollToTop";
import Register from "./pages/Register";
import {
    About,
    Blogs,
    CertificateCard,
    Community,
    CreateBlog,
    CTF,
    CyberGames,
    Event,
    Events,
    Footer,
    InterviewQuestions,
    Jobs,
    LearningPath,
    Login,
    Navbar,
    NotFound,
    OSINTGame,
    Quiz,
    Roadmap,
    Roadmaps,
    Sidebar,
    SingleBlog,
    Sponsors,
} from "./components";
import { Container } from "./components/Other/MixComponents/Layout/LayoutElements";
import Tools from "./components/Beta/Tools/Tools";
import BreachCheck from "./components/Beta/Tools/BreachCheck/BreachCheck";
import Spinner from "./components/Other/MixComponents/Spinner/Spinner";
import { useSelector } from "react-redux";
import ContactForm from "./components/Homepage/ContactForm/ContactForm";
import TermsAndCondition from "./components/Resources/TermsAndCondition";
import PrivacyPolicy from "./components/Resources/PrivacyPolicy";
import FormData from "./components/Dashboard/FormData/FormData";
import SubdomainFinder from "./components/Beta/Tools/SubdomainFinder/SubdomainFinder";
import UserProfile from "./components/Dashboard/Profile/UserProfile";
import SingleCTF from "./components/CaptureTheFlag/SingleCTF/SingleCTF";
import CreateCTF from "./components/CaptureTheFlag/CreateCTF";
import Leaderboard from "./components/Other/CyberGames/Leaderboard/Leaderboard";
import UserTimestamps from "./features/UserTimestamps";
import InternshipResponse from "./components/Dashboard/FormData/InternshipResponse";
import Security from "./components/Other/Security/Security";
import HallOfFame from "./components/Other/Security/HallOfFame";
import RulesOfEngagement from "./components/Other/Security/RulesOfEngagement";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import EditPublicProfile from "./components/Dashboard/Profile/EditPublicProfile/EditPublicProfile";
import Explore from "./components/Explore/Explore";
// import Feeds from "./components/Feeds/Feeds";
import Volunteer from "./components/Opportunities/Volunteer/Volunteer";
import TheCyberXcel from "./components/Opportunities/TheCyberXcel/TheCyberXcel";
import OpenSecProjects from "./components/Opportunities/OpenSecProjects/OpenSecProjects";
import Courses from "./components/Courses/Courses";
import Forum from "./components/Forum/Forum";
import ForumSubPage from "./components/Forum/ForumSubPage";
import DashboardRoutes from "./components/Dashboard/DashboardRoutes";
import CreateForumPost from "./components/Forum/CreateForumPost/CreateForumPost";
import FeedRoutes from "./components/Feeds/FeedRoutes";

const App = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [showWebsite, setShowWebsite] = useState(false);
    const { pathname } = useLocation();

    const hostname = window.location.hostname;

    useEffect(() => {
        if (hostname === "localhost") {
            setTimeout(() => {
                setIsLoading(false);
            }, 0);
            setTimeout(() => {
                setShowWebsite(true);
            }, 0);
        } else {
            setTimeout(() => {
                setIsLoading(false);
            }, 5000);
            setTimeout(() => {
                setShowWebsite(true);
            }, 3000);
        }
    }, []);

    const hideHomeHeader = () => {
        const pathDashboard = pathname.includes("/dashboard");
        const pathLogin = pathname.includes("/login");
        const pathRegister = pathname.includes("/register");
        const pathForgetPassword = pathname.includes("/forgetPassword");
        const pathResetPassword = pathname.includes("/resetPassword");
        return pathDashboard || pathLogin || pathRegister || pathForgetPassword || pathResetPassword;
    };

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const { user } = useSelector((state) => state.auth);

    if (isLoading) return <Spinner />;

    if (showWebsite)
        return (
            <>
                {user && <UserTimestamps user={user} />}
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

                            <Route path={"/tools/*"}>
                                <Route index element={<Tools />} />
                                <Route path={"breachCheck"} element={<BreachCheck />} />
                                <Route path={"subdomainFinder"} element={<SubdomainFinder />} />
                                {/* <Route path={"portScanner"} element={<PortScanner/>}/> */}
                                <Route path={"*"} element={<NotFound />} />
                                <Route element={<NotFound />} />
                            </Route>

                            <Route path={"/blogs"}>
                                <Route index element={<Blogs />} />
                                <Route exact path={":username/:title"} element={<SingleBlog />} />
                                {/* <Route element={<NotFound/>}/> */}
                                <Route path={"*"} element={<NotFound />} />
                            </Route>

                            <Route exact path={"/contact"} element={<ContactForm />} />
                            <Route exact path={"/login"} element={<Login />} />
                            <Route exact path={"/forgetPassword"} element={<ForgotPassword />} />
                            <Route exact path={"/resetPassword/:token"} element={<ResetPassword />} />
                            <Route exact path={"/register"} element={<Register />} />
                            <Route exact path={"/leaderboard"} element={<Leaderboard />} />

                            <Route>
                                <Route exact path={"/@:username"} element={<UserProfile />} />
                                <Route exact path={"/edit/@:username"} element={<EditPublicProfile />} />
                            </Route>

                            <Route path={"/dashboard/*"} element={<DashboardRoutes />} />
                            <Route path={"/feeds/*"} element={<FeedRoutes />} />

                            <Route path={"/events/*"}>
                                <Route index element={<Events />} />
                                <Route path={":slug"} element={<Event />} />
                                <Route path={"*"} element={<NotFound />} />
                            </Route>

                            <Route exact path={"/community"} element={<Community />} />
                            <Route exact path={"/support"} element={<Sponsors />} />
                            <Route exact path={"/about"} element={<About />} />
                            <Route exact path={"/terms-conditions"} element={<TermsAndCondition />} />
                            <Route exact path={"/privacy-policy"} element={<PrivacyPolicy />} />

                            <Route exact path={"/ctf"}>
                                <Route index element={<CTF />} />
                                <Route path={":type/:difficulty/:ctfId"} element={<SingleCTF />} />
                                <Route path={"create"} element={<CreateCTF />} />
                                <Route path={"certificate/:id"} element={<CertificateCard />} />
                                <Route path={"*"} element={<NotFound />} />
                            </Route>

                            <Route exact path={"/volunteer"} element={<Volunteer />} />
                            <Route exact path={"/opensec-projects"} element={<OpenSecProjects />} />
                            <Route exact path={"/thecyberxcel"} element={<TheCyberXcel />} />

                            <Route exact path={"/CyberGames"} element={<CyberGames />} />
                            <Route exact path={"/OSINT"} element={<OSINTGame />} />
                            <Route exact path={"/course"} element={<LearningPath />} />

                            <Route>
                                <Route path={"/roadmaps"}>
                                    <Route index element={<Roadmaps />} />
                                    <Route path={":title"} element={<Roadmap />} />
                                    <Route path={"*"} element={<NotFound />} />
                                </Route>
                            </Route>

                            <Route exact path={"/create-blog"} element={<CreateBlog />} />

                            <Route path={"/events"}>
                                <Route index element={<Events />} />
                                <Route path={":title"} element={<Event />} />
                                <Route path={"*"} element={<NotFound />} />
                            </Route>

                            <Route path={"/explore"}>
                                <Route index element={<Explore />} />
                                <Route path={"*"} element={<NotFound />} />
                            </Route>

                            <Route path={"/courses"}>
                                <Route index element={<Courses />} />
                                <Route path={"*"} element={<NotFound />} />
                            </Route>

                            <Route path={"/forum"}>
                                <Route index element={<Forum />} />
                                <Route path={":title"} element={<ForumSubPage />} />

                                <Route path={"*"} element={<NotFound />} />
                            </Route>

                            <Route path={"/dashboard/forum/create"} element={<CreateForumPost />} />

                            <Route>
                                <Route path={"/security"} element={<Security />} />
                                <Route path={"/security/hall-of-fame"} element={<HallOfFame />} />
                                <Route path={"/security/rules-of-engagement"} element={<RulesOfEngagement />} />
                            </Route>

                            <Route path={"/internship"} element={<Jobs />} />
                            <Route path={"/quiz"} element={<Quiz />} />
                            <Route path={"/interviewQuestions"} element={<InterviewQuestions />} />
                            {/* <Route path={"/cyberNews"} element={<CyberNews/>}/> */}
                            {/* <Route element={<NotFound/>}/> */}
                            <Route path={"*"} element={<NotFound />} />
                            <Route exact path={"/contactFormResponses"} element={<FormData />} />
                            <Route
                                exact
                                path={"/contactFormResponses/internshipResponse"}
                                element={<InternshipResponse />}
                            />
                        </Routes>
                    </ScrollToTop>
                    {hideHomeHeader() && <Footer />}
                </Container>
                <ToastContainer />
            </>
        );
};

export default App;
