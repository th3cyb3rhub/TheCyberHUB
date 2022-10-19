import React, { useState, useEffect } from "react";

import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";

import Homepage from "./pages/Homepage";
import ScrollToTop from "./components/ScrollToTop";
import Resources from "./pages/Resources";
import Prep from "./pages/Prep";
import Registration from "./pages/Registration";

import {
  ResourcesHome,
  RoadmapResources,
  CyberNews,
  Blogs,
  Events,
  Community,
  About,
  InterviewQuestions,
  InterviewExperiences,
  Quiz,
  Jobs,
  Footer,
  Sidebar,
  Navbar,
  Courses,
  CTF,
  CyberGames,
  OSINTGame,
} from "./components";

import OpenSourceProjects from "./components/OpenSourceProjects/OpenSourceProjects";

import Spinner from "./components/MixComponents/Spinner/Spinner";
import Submit from "./components/Resources/Submit/Submit";

const App = () => {
  const [loading, setLoading] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 0);
  }, []);

  const showFooter = () => {
    return pathname !== "/register";
  };

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <navbar>
            <Sidebar isOpen={isOpen} toggle={toggle} />
            <Navbar toggle={toggle} />
          </navbar>

          <ScrollToTop>
            <Routes>
              <Route index exact path={"/"} element={<Homepage />} />

              <Route exact path={"/blogs/*"} element={<Blogs />} />
              <Route exact path={"/events"} element={<Events />} />
              <Route exact path={"/community"} element={<Community />} />
              <Route exact path={"/about"} element={<About />} />
              <Route exact path={"/projects/*"} element={<OpenSourceProjects />} />
              <Route exact path={"/CyberGames"} element={<CyberGames />} />
              <Route exact path={"/CyberGames/CTF"} element={<CTF />} />
              <Route exact path={"/CyberGames/OSINTGame"} element={<OSINTGame />} />
              <Route exact path={"/submit"} element={<Submit />} />

              <Route exact path={"/resources/*"} element={<Resources />}>
                <Route index element={<ResourcesHome />} />
                <Route path={"roadmapResources"} element={<RoadmapResources />} />
                <Route path={"courses"} element={<Courses />} />
                <Route path={"cyberNews"} element={<CyberNews />} />
                <Route path={"blogs"} element={<Blogs />} />
                <Route path={"events"} element={<Events />} />
              </Route>

              <Route exact path={"/prep"} element={<Prep />}>
                <Route path={"interviewQuestions"} element={<InterviewQuestions />} />
                <Route path={"interviewExperiences"} element={<InterviewExperiences />} />
                <Route path={"quiz"} element={<Quiz />} />
                <Route path={"jobs"} element={<Jobs />} />
              </Route>

              <Route exact path={"/register"} element={<Registration />}></Route>
            </Routes>
          </ScrollToTop>
          {showFooter() && <Footer />}
        </>
      )}
    </div>
  );
};

export default App;
