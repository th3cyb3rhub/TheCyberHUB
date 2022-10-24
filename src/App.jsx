import React, {useState, useEffect} from "react";

import "./App.css";
import {Route, Routes, useLocation} from "react-router-dom";

import Homepage from "./pages/Homepage";
import ScrollToTop from "./components/ScrollToTop";
import Registration from "./pages/Registration";

import {
    Navbar, Sidebar,
    Learn, Courses, Blogs, CourseDetail, CoursesLayout,
    Roadmaps, CyberNews,
    Resources, Jobs, Quiz, InterviewQuestions,
    Events, Community, About,
    CTF, CyberGames, OSINTGame,
    Footer,
} from "./components";

import OpenSourceProjects from "./components/OpenSourceProjects/OpenSourceProjects";
import Spinner from "./components/MixComponents/Spinner/Spinner";
import Layout from "./components/Layout";

const App = () => {
    const [loading, setLoading] = useState(false);
    const {pathname} = useLocation();

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 5000);
    }, []);

    const showFooter = () => {
        return pathname !== "/register";
    };

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            {loading ? (
                <Spinner/>
            ) : (
                <Layout>
                    <>
                        <Sidebar isOpen={isOpen} toggle={toggle}/>
                        <Navbar toggle={toggle}/>
                    </>

                    <ScrollToTop>
                        <Routes>
                            <Route index exact path={"/"} element={<Homepage/>}/>

                            <Route exact path={"/events"} element={<Events/>}/>
                            <Route exact path={"/community"} element={<Community/>}/>
                            <Route exact path={"/about"} element={<About/>}/>
                            <Route exact path={"/projects/*"} element={<OpenSourceProjects/>}/>

                            <Route exact path={"/CyberGames"} element={<CyberGames/>}/>
                            <Route exact path={"/CyberGames/CTF"} element={<CTF/>}/>
                            <Route exact path={"/CyberGames/OSINTGame"} element={<OSINTGame/>}/>


                            <Route exact path={"/learn/*"}>
                                <Route index path="learn" element={<Learn/>}/>
                                <Route path="roadmaps" element={<Roadmaps/>}/>
                                <Route path="courses" element={<CoursesLayout/>}>
                                    <Route index element={<Courses/>}/>
                                    <Route path=":id" element={<CourseDetail/>}/>
                                </Route>
                                <Route path="blogs" element={<Blogs/>}/>
                            </Route>

                            <Route exact path={"/resources/*"}>
                                <Route index path="roadmaps" element={<Roadmaps/>}/>
                                <Route path={"events"} element={<Events/>}/>
                                <Route path={"jobs"} element={<Jobs/>}/>
                                <Route path={"quiz"} element={<Quiz/>}/>
                                <Route path={"interviewQuestions"} element={<InterviewQuestions/>}/>
                                <Route path={"cyberNews"} element={<CyberNews/>}/>
                            </Route>

                            <Route exact path={"/register"} element={<Registration/>}></Route>
                        </Routes>
                    </ScrollToTop>
                    {/*{showFooter() &&*/}
                    <Footer/>
                    {/*}*/}
                </Layout>
            )}
        </div>
    );
};

export default App;
