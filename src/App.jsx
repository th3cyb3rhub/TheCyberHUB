import React, {useState, useEffect} from 'react';

import './App.css';
import {Route, Routes} from "react-router-dom";

import Homepage from './pages/Homepage';
import ScrollToTop from "./components/ScrollToTop";
import Resources from "./pages/Resources";
import Prep from "./pages/Prep";

import {
    ResourcesHome, RoadmapResources, CyberNews, Blogs, Events,
    InterviewQuestions, InterviewExperiences, Quiz, Jobs,
    Footer
} from "./components";

import Spinner from "./components/MixComponenets/Spinner/Spinner";


const App = () => {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 2000)
    }, []);

    return (
        <div>
            {loading ? (
                <Spinner/>
            ) : (
                <> <ScrollToTop>
                    <Routes>
                        <Route index exact path={"/"} element={<Homepage/>}/>

                        <Route exact path={"/resources"} element={<Resources/>}>
                            <Route index element={<ResourcesHome/>}/>
                            <Route path={"roadmapResources"} element={<RoadmapResources/>}/>
                            <Route path={"cyberNews"} element={<CyberNews/>}/>
                            <Route path={"blogs"} element={<Blogs/>}/>
                            <Route path={"events"} element={<Events/>}/>
                        </Route>

                        <Route exact path={"/prep"} element={<Prep/>}>
                            <Route path={"interviewQuestions"} element={<InterviewQuestions/>}/>
                            <Route path={"interviewExperiences"} element={<InterviewExperiences/>}/>
                            <Route path={"quiz"} element={<Quiz/>}/>
                            <Route path={"jobs"} element={<Jobs/>}/>
                        </Route>
                    </Routes>
                </ScrollToTop>
                    <Footer/>
                </>
            )}
        </div>
    );
};

export default App;
