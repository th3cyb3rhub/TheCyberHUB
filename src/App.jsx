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

import {SpinnerSection} from "./components/MixComponenets/Spinner/SpinnerElements";
import {BarLoader, BeatLoader, BounceLoader, CircleLoader, ClimbingBoxLoader, ClipLoader, ClockLoader, DotLoader, FadeLoader, GridLoader, HashLoader, MoonLoader, PacmanLoader, PropagateLoader, PuffLoader, PulseLoader, RingLoader, RiseLoader, RotateLoader, ScaleLoader, SkewLoader, SquareLoader, SyncLoader} from "react-spinners";



const App = () => {
    const [loading, setLoading] = useState(false);

    const spinnersList = [
        <BarLoader color={"#47cf73"} loading={loading} size={50}/>,
        <BeatLoader color={"#47cf73"} loading={loading} size={15}/>,
        <BounceLoader color={"#47cf73"} loading={loading} size={60}/>,
        <CircleLoader color={"#47cf73"} loading={loading} size={50}/>,
        <ClimbingBoxLoader color={"#47cf73"} loading={loading} size={15}/>,
        <ClipLoader color={"#47cf73"} loading={loading} size={35}/>,
        <ClockLoader color={"#47cf73"} loading={loading} size={50}/>,
        <DotLoader color={"#47cf73"} loading={loading} size={60}/>,
        <FadeLoader color={"#47cf73"} loading={loading} size={50}/>,
        <GridLoader color={"#47cf73"} loading={loading} size={15}/>,
        <HashLoader color={"#47cf73"} loading={loading} size={50}/>,
        <MoonLoader color={"#47cf73"} loading={loading} size={60}/>,
        <PacmanLoader color={"#47cf73"} loading={loading} size={25}/>,
        <PropagateLoader color={"#47cf73"} loading={loading} size={15}/>,
        <PuffLoader color={"#47cf73"} loading={loading} size={60}/>,
        <PulseLoader color={"#47cf73"} loading={loading} size={15}/>,
        <RingLoader color={"#47cf73"} loading={loading} size={60}/>,
        <RiseLoader color={"#47cf73"} loading={loading} size={15}/>,
        <RotateLoader color={"#47cf73"} loading={loading} size={15}/>,
        <ScaleLoader color={"#47cf73"} loading={loading} size={50}/>,
        <SkewLoader color={"#47cf73"} loading={loading} size={50}/>,
        <SquareLoader color={"#47cf73"} loading={loading} size={50}/>,
        <SyncLoader color={"#47cf73"} loading={loading} size={15}/>,
    ]

    let loadingSpinner = spinnersList[Math.floor(
        Math.random() * (spinnersList.length))];
    console.log(Math.floor(
        Math.random() * (spinnersList.length)))

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 2000)
    }, []);

    return (
        <div>
            {loading ? (
                <SpinnerSection>
                    {loadingSpinner}
                </SpinnerSection>
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
