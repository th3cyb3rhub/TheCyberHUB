import React from "react";
import { Wrapper } from "./Profile/ProfileElements";

const VerifyToAccess = () => {
    return (
        <Wrapper>
            <div>
                <p
                    style={{
                        fontFamily: "Roboto Mono, monospace",
                        color: "#dadada",
                        textAlign: "center",
                    }}
                >
                    {" "}
                    Please Verify Your Email To Access This Page{" "}
                </p>
            </div>
        </Wrapper>
    );
};

export default VerifyToAccess;
