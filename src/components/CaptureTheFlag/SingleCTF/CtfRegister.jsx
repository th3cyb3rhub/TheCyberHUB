import React from "react";
import { ButtonCTFRegister, ChallengeName, CTFRegistration } from "./SingleCTFElements";

const CtfRegister = ({ challenge, handleRegister }) => {
    return (
        <CTFRegistration>
            <ChallengeName
                style={{
                    padding: "0",
                }}
            >
                {challenge?.challengeName}
            </ChallengeName>
            <p>Register and Build your team to participate in this challenge</p>
            <ButtonCTFRegister onClick={handleRegister}>Register Now</ButtonCTFRegister>
        </CTFRegistration>
    );
};

export default CtfRegister;
