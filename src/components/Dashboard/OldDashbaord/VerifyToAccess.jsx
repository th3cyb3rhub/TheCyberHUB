import React from "react";
import { Wrapper } from "../Profile/ProfileElements";

const VerifyToAccess = () => {
    return (
        <Wrapper>
            <div>
                <p
                    style={{
                        color: "#dadada",
                        textAlign: "center",
                        fontSize: "1.5rem",
                    }}
                >
                    Please Verify Your Email To Access This Page
                </p>
            </div>
        </Wrapper>
    );
};

export default VerifyToAccess;
