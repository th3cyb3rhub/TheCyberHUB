import React from "react";
import { Wrapper } from "src/components/Dashboard/Profile/ProfileElements";
import { CircleSpinner } from "react-spinners-kit";

const LoadingSpinner = () => {
    return (
        <Wrapper style={{ padding: "25px" }}>
            <CircleSpinner size={20} color={"#ff6b08"} />
        </Wrapper>
    );
};

export default LoadingSpinner;
