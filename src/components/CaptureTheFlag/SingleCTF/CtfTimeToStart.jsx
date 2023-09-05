import React from "react";
import { ChallengeName } from "./SingleCTFElements";
import TimeToStart from "../TimeToStart";

const CtfTimeToStart = ({ challenge }) => {
    return (
        <div>
            <ChallengeName>{challenge?.challengeName}</ChallengeName>
            <TimeToStart ctfDate={challenge?.startTime} />
            <p>Register and Build your team to participate in this challenge</p>
        </div>
    );
};

export default CtfTimeToStart;
