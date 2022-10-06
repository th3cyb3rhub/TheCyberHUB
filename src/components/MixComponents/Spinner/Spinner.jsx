import React from 'react';
import {
    BarLoader,
    BeatLoader,
    BounceLoader,
    CircleLoader,
    ClimbingBoxLoader,
    ClipLoader,
    ClockLoader,
    DotLoader,
    FadeLoader,
    GridLoader,
    HashLoader,
    MoonLoader,
    PacmanLoader,
    PropagateLoader,
    PuffLoader,
    PulseLoader, RingLoader, RiseLoader, RotateLoader, ScaleLoader, SkewLoader, SquareLoader, SyncLoader
} from "react-spinners";
import {SpinnerSection} from "./SpinnerElements";

const Spinner = (loading) => {

    const spinnersList = [
        <BarLoader color={"#20c20e"} loading={loading} size={50}/>,
        <BeatLoader color={"#20c20e"} loading={loading} size={15}/>,
        <BounceLoader color={"#20c20e"} loading={loading} size={60}/>,
        <CircleLoader color={"#20c20e"} loading={loading} size={50}/>,
        <ClimbingBoxLoader color={"#20c20e"} loading={loading} size={15}/>,
        <ClipLoader color={"#20c20e"} loading={loading} size={35}/>,
        <ClockLoader color={"#20c20e"} loading={loading} size={50}/>,
        <DotLoader color={"#20c20e"} loading={loading} size={60}/>,
        <FadeLoader color={"#20c20e"} loading={loading} size={50}/>,
        <GridLoader color={"#20c20e"} loading={loading} size={15}/>,
        <HashLoader color={"#20c20e"} loading={loading} size={50}/>,
        <MoonLoader color={"#20c20e"} loading={loading} size={60}/>,
        <PacmanLoader color={"#20c20e"} loading={loading} size={25}/>,
        <PropagateLoader color={"#20c20e"} loading={loading} size={15}/>,
        <PuffLoader color={"#20c20e"} loading={loading} size={60}/>,
        <PulseLoader color={"#20c20e"} loading={loading} size={15}/>,
        <RingLoader color={"#20c20e"} loading={loading} size={60}/>,
        <RiseLoader color={"#20c20e"} loading={loading} size={15}/>,
        <RotateLoader color={"#20c20e"} loading={loading} size={15}/>,
        <ScaleLoader color={"#20c20e"} loading={loading} size={50}/>,
        <SkewLoader color={"#20c20e"} loading={loading} size={50}/>,
        <SquareLoader color={"#20c20e"} loading={loading} size={50}/>,
        <SyncLoader color={"#20c20e"} loading={loading} size={15}/>,
    ]

    let loadingSpinner = spinnersList[Math.floor(
        Math.random() * (spinnersList.length))];
    console.log(Math.floor(
        Math.random() * (spinnersList.length)))

    return (
        <div>
            <SpinnerSection>
                {loadingSpinner}
            </SpinnerSection>
        </div>
    );
};

export default Spinner;