import React from "react";
import { Wrapper } from "./components/Dashboard/Profile/ProfileElements";

const NotFound = ({
    title = "404 - Page Not Found",
    description = "Sorry, the page you are looking for could not be found.",
}) => {
    return (
        <Wrapper
            style={{
                paddingTop: "40px",
                paddingBottom: "40px",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <h1>{title}</h1>
            <p>{description}</p>
        </Wrapper>
    );
};

export default NotFound;
