import React, {useState, useEffect} from 'react';

import './App.css';
import {Route, Routes} from "react-router-dom";

import Homepage from './pages/Homepage';
import {Courses, Footer, ResourcesHome} from "./components";
import ScrollToTop from "./components/ScrollToTop";
import Resources from "./pages/Resources";
import {CyberNews, WriteUps, Events, Jobs} from "./components";
import {SpinnerSection} from "./Spinner/SpinnerElements";
import {BarLoader, BeatLoader, BounceLoader, CircleLoader, ClimbingBoxLoader, ClipLoader, ClockLoader, DotLoader, FadeLoader, GridLoader, HashLoader, MoonLoader, PacmanLoader, PropagateLoader, PuffLoader, PulseLoader, RingLoader, RiseLoader, RotateLoader, ScaleLoader, SkewLoader, SquareLoader, SyncLoader} from "react-spinners";


const App = () => {
    const [loading, setLoading] = useState(false);

    const spinnersList = [
        <BarLoader color={"#47cf73"} loading={loading} size={50}/>,
        <BeatLoader color={"#47cf73"} loading={loading} size={50}/>,
        <BounceLoader color={"#47cf73"} loading={loading} size={60}/>,
        <CircleLoader color={"#47cf73"} loading={loading} size={150}/>,
        <ClimbingBoxLoader color={"#47cf73"} loading={loading} size={50}/>,
        <ClimbingBoxLoader color={"#47cf73"} loading={loading} size={50}/>,
        <ClipLoader color={"#47cf73"} loading={loading} size={50}/>,
        <ClockLoader color={"#47cf73"} loading={loading} size={100}/>,
        <DotLoader color={"#47cf73"} loading={loading} size={60}/>,
        <FadeLoader color={"#47cf73"} loading={loading} size={50}/>,
        <GridLoader color={"#47cf73"} loading={loading} size={50}/>,
        <HashLoader color={"#47cf73"} loading={loading} size={50}/>,
        <MoonLoader color={"#47cf73"} loading={loading} size={50}/>,
        <PacmanLoader color={"#47cf73"} loading={loading} size={50}/>,
        <PropagateLoader color={"#47cf73"} loading={loading} size={50}/>,
        <PuffLoader color={"#47cf73"} loading={loading} size={50}/>,
        <PulseLoader color={"#47cf73"} loading={loading} size={50}/>,
        <RingLoader color={"#47cf73"} loading={loading} size={50}/>,
        <RiseLoader color={"#47cf73"} loading={loading} size={50}/>,
        <RotateLoader color={"#47cf73"} loading={loading} size={50}/>,
        <ScaleLoader color={"#47cf73"} loading={loading} size={50}/>,
        <SkewLoader color={"#47cf73"} loading={loading} size={50}/>,
        <SquareLoader color={"#47cf73"} loading={loading} size={50}/>,
        <SyncLoader color={"#47cf73"} loading={loading} size={50}/>,
    ]

    let loadingSpinner = spinnersList[Math.floor(
        Math.random() * (spinnersList.length))];
    console.log(Math.floor(
        Math.random() * (spinnersList.length)))

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 8000)
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
                            <Route path={"courses"} element={<Courses/>}/>
                            <Route className={"app routes main"} path={"cybernews"} element={<CyberNews/>}/>
                            <Route path={"writeups"} element={<WriteUps/>}/>
                            <Route path={"events"} element={<Events/>}/>
                            <Route path={"jobs"} element={<Jobs/>}/>
                        </Route>
                    </Routes>
                </ScrollToTop>
                    <Footer/> </>
            )}
        </div>
    );
};

export default App;
