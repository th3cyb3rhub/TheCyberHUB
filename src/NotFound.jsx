import React from "react";
import { Wrapper } from "./components/Dashboard/Profile/ProfileElements";

const NotFound = () => {
    return (
        <Wrapper style={{ paddingTop: "40px" }}>
            <h1>404 - Page Not Found</h1>
            <p>Sorry, the page you are looking for could not be found.</p>
        </Wrapper>
    );
};

export default NotFound;
