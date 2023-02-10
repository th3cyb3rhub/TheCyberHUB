import React, { useEffect, useState } from "react";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Route, Routes, useLocation } from "react-router-dom";
import Homepage from "./pages/Homepage";
import ScrollToTop from "./components/ScrollToTop";
// import Register from "./pages/Register";
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
    Navbar,
    NotFound,
    OpensourceProjects,
    OSINTGame,
    Quiz,
    Roadmap,
    Roadmaps,
    Sidebar,
    SingleBlog,
    Sponsors,
    Tags,
} from "./components";

import { Container } from "./components/Other/MixComponents/Layout/LayoutElements";
import Tools from "./components/Beta/Tools/Tools";
import BreachCheck from "./components/Beta/Tools/BreachCheck/BreachCheck";
import EmailNotVerified from "./components/Dashboard/EmailNotVerified";
import Spinner from "./components/Other/MixComponents/Spinner/Spinner";
import { useSelector } from "react-redux";
import ContactForm from "./components/ContactForm/ContactForm";
// import ContactForm from "./components/ContactForm/ContactForm";

const App = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [showWebsite, setShowWebsite] = useState(false);
    const { pathname } = useLocation();

    useEffect(() => {
        setIsLoading(true);
        setShowWebsite(false);

        setTimeout(() => {
            setIsLoading(false);
        }, 0);
        setTimeout(() => {
            setShowWebsite(true);
        }, 0);
    }, []);

    const showFooter = () => {
        const register = pathname !== "/register";
        const login = pathname !== "/login";
        if (register === false) {
            return register;
        } else return login;
    };

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const { user } = useSelector((state) => state.auth);
    if (isLoading) return <Spinner />;
    if (showWebsite)
        return (
            <div>
                <Container>
                    {showFooter() && (
                        <>
                            <Sidebar isOpen={isOpen} toggle={toggle} />
                            <Navbar toggle={toggle} />
                        </>
                    )}
                    {user ? <EmailNotVerified user={user} /> : null}
                    <ScrollToTop>
                        <Routes>
                            <Route index exact path={"/"} element={<Homepage />} />

                            <Route path={"/tools/*"}>
                                <Route index element={<Tools />} />
                                <Route path={"breachCheck"} element={<BreachCheck />} />
                            </Route>

                            <Route path={"/blogs"}>
                                <Route index element={<Blogs />} />
                                <Route exact path={"tags"} element={<Tags />} />
                                <Route exact path={":title"} element={<SingleBlog />} />
                                <Route element={<NotFound />} />
                            </Route>

                            {/* <Route exact path={"/dashboard"} element={<Dashboard />} /> */}
                            <Route exact path={"/contact"} element={<ContactForm />} />
                            {/* <Route exact path={"/login"} element={<Login />} /> */}
                            {/* <Route exact path={"/register"} element={<Register />} /> */}
                            {/* <Route exact path={"/profile"} element={<Profile />} /> */}
                            {/* <Route exact path={"/profile/edit"} element={<EditProfile />} /> */}

                            {/* <Route path={"/dashboard/*"}> */}
                            {/*    <Route index element={<Dashboard />} /> */}
                            {/*    <Route path={"goals"} element={<GoalSetter />} /> */}
                            {/*    <Route path={"blogs"}> */}
                            {/*        <Route index element={<UserBlogs />} /> */}
                            {/*        <Route exact path={"create"} element={<CreateBlog />} /> */}
                            {/*        <Route exact path={"edit/:title"} element={<EditBlog />} /> */}
                            {/*    </Route> */}
                            {/* </Route> */}

                            <Route path={"/events/*"}>
                                <Route index element={<Events />} />
                                <Route path={":slug"} element={<Event />} />
                            </Route>
                            <Route exact path={"/community"} element={<Community />} />
                            <Route exact path={"/support"} element={<Sponsors />} />
                            <Route exact path={"/about"} element={<About />} />
                            <Route exact path={"/projects"} element={<OpensourceProjects />} />

                            <Route exact path={"/ctf"}>
                                <Route index element={<CTF />} />
                                {/* <Route path={"certificate"} element={<CertificatePage />} /> */}
                                <Route path={"certificate/:id"} element={<CertificateCard />} />
                            </Route>

                            <Route exact path={"/CyberGames"} element={<CyberGames />} />
                            <Route exact path={"/CTF"} element={<CTF />} />
                            <Route exact path={"/OSINT"} element={<OSINTGame />} />
                            <Route exact path={"/learning-path"} element={<LearningPath />} />

                            <Route>
                                <Route path={"/roadmaps"}>
                                    <Route index element={<Roadmaps />} />
                                    <Route path={":title"} element={<Roadmap />} />
                                </Route>

                                {/* <Route path={"/courses"} element={<CoursesLayout />}> */}
                                {/*    <Route index element={<Courses />} /> */}
                                {/*    <Route path={":id"} element={<CourseDetail />} /> */}
                                {/* </Route> */}

                                {/* <Route exact path={"/blogs"} element={<Blogs />} /> */}
                            </Route>
                            <Route exact path={"/create-blog"} element={<CreateBlog />} />

                            <Route>
                                <Route path={"/events"}>
                                    <Route index element={<Events />} />
                                    <Route path={":title"} element={<Event />} />
                                </Route>

                                <Route path={"/jobs"} element={<Jobs />} />
                                <Route path={"/quiz"} element={<Quiz />} />
                                <Route path={"/interviewQuestions"} element={<InterviewQuestions />} />
                                {/* <Route path={"/cyberNews"} element={<CyberNews />} /> */}
                            </Route>
                            {/* <Route element={<NotFound />} /> */}
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </ScrollToTop>
                    {showFooter() && <Footer />}
                </Container>
                <ToastContainer />
            </div>
        );
};

export default App;
