import React, {useState} from 'react';
import {Route, Routes} from "react-router-dom";

import {PrepNavbar, PrepSidebar, PrepHome,
    InterviewQuestions, InterviewExperiences, Quiz, Jobs} from "../components";

const Prep = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <navbar>
                <PrepSidebar isOpen={isOpen} toggle={toggle}/>
                <PrepNavbar toggle={toggle}/>
            </navbar>
            <Routes>
                <Route exact path={"/"} element={<PrepHome/>}/>
                <Route exact path={"InterviewQuestions"} element={<InterviewQuestions/>}/>
                <Route exact path={"InterviewExperiences"} element={<InterviewExperiences/>}/>
                <Route exact path={"Quiz"} element={<Quiz/>}/>
                <Route exact path={"Jobs"} element={<Jobs/>}/>
            </Routes>
        </div>
    );
};

export default Prep;