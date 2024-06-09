import React, { useState } from "react";
import { Input } from "src/components/WebSecurity/Common/SubmissionBoxElements";
import { Button } from "./QuestionAnswerComponentElement";

export default function QuestionAnswerComponent(props) {
    const [loggedIn, setLoggedIn] = useState(false);

    function handleHints() {
        setLoggedIn(!loggedIn);
    }

    return (
        <div style={{ paddingLeft: "10px" }}>
            <span style={{ marginBottom: "10px" }}>{props.question}</span>
            <div style={{ display: "flex", marginTop: "5px" }}>
                <Input placeholder="Enter Flag value" />
                <Button>Submit</Button>
                <Button style={{ color: "white", borderColor: "white" }} onClick={handleHints}>
                    Hints
                </Button>
            </div>
            <div
                style={{
                    marginTop: "10px",
                    transition: "height 0.5s ease",
                    height: loggedIn ? "auto" : 0,
                    overflow: "hidden",
                }}
            >
                {loggedIn && (
                    <div style={{ width: "100%", borderRadius: "5px", backgroundColor: "black", padding: "10px" }}>
                        {props.hints}
                    </div>
                )}
            </div>
        </div>
    );
}
