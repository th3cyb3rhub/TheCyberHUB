/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";

import "./App.css";
import {
    Route,
    Routes,
    // useLocation
} from "react-router-dom";

import Homepage from "./pages/Homepage";
import ScrollToTop from "./components/ScrollToTop";
import Registration from "./pages/Registration";

import {
    Navbar,
    Navbars,
    Sidebar,
    Learn,
    Courses,
    CourseDetail,
    CoursesLayout,
    Roadmaps,
    CyberNews,
    Jobs,
    Quiz,
    InterviewQuestions,
    Events,
    Community,
    About,
    CTF,
    CyberGames,
    OSINTGame,
    Footer,
} from "./components";

import OpenSourceProjects from "./components/OpenSourceProjects/OpenSourceProjects";
import Spinner from "./components/MixComponents/Spinner/Spinner";
import AllBlogs from "./components/Learn/Blogs/Blogs";
import ViewBlog from "./components/Learn/Blogs/ViewBlog";
import Roadmap from "./components/Learn/Roadmaps/Roadmap";
import { Container } from "./components/MixComponents/Layout/LayoutElements";

const App = () => {
    const [loading, setLoading] = useState(false);
    // const { pathname } = useLocation();

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    }, []);

    // const showFooter = () => {
    //     return pathname !== "/register";
    // };

    const [isOpen, setIsOpen] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            {loading ? (
                <Spinner />
            ) : (
                <Container>
                    <>
                        {/* ❌No need of this code❌
                        <Sidebar isOpen={isOpen} toggle={toggle} />
                        <Navbar toggle={toggle} />
                        ❌❌ */}
                        <Navbars />
                    </>

                    <ScrollToTop>
                        <Routes>
                            <Route index exact path={"/"} element={<Homepage />} />

                            <Route exact path={"/events"} element={<Events />} />
                            <Route exact path={"/community"} element={<Community />} />
                            <Route exact path={"/about"} element={<About />} />
                            <Route exact path={"/projects/*"} element={<OpenSourceProjects />} />

                            <Route exact path={"/CyberGames"} element={<CyberGames />} />
                            <Route exact path={"/CyberGames/CTF"} element={<CTF />} />
                            <Route exact path={"/CyberGames/OSINTGame"} element={<OSINTGame />} />

                            <Route exact path={"/learn/*"}>
                                <Route index path={"learn"} element={<Learn />} />
                                {/* <Route path={"roadmaps"} element={<Roadmaps/>}/> */}

                                <Route path={"roadmaps"}>
                                    <Route index element={<Roadmaps />} />
                                    <Route path={":title"} element={<Roadmap />} />
                                </Route>

                                <Route path={"courses"} element={<CoursesLayout />}>
                                    <Route index element={<Courses />} />
                                    <Route path={":id"} element={<CourseDetail />} />
                                </Route>

                                <Route path={"blogs"}>
                                    <Route index element={<AllBlogs />} />
                                    <Route exact path={":title"} element={<ViewBlog />} />
                                </Route>
                            </Route>

                            <Route exact path={"/resources/*"}>
                                <Route index path={"roadmaps"} element={<Roadmaps />} />
                                <Route path={"events"} element={<Events />} />
                                <Route path={"jobs"} element={<Jobs />} />
                                <Route path={"quiz"} element={<Quiz />} />
                                <Route path={"interviewQuestions"} element={<InterviewQuestions />} />
                                <Route path={"cyberNews"} element={<CyberNews />} />
                            </Route>

                            <Route exact path={"/register"} element={<Registration />}></Route>
                        </Routes>
                    </ScrollToTop>
                    {/* {showFooter() &&
                    } */}
                    <Footer />
                </Container>
            )}
        </div>
    );
};

export default App;
