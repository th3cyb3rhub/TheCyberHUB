import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { dracula } from "@uiw/codemirror-theme-dracula";
// import SyntaxHighlight from "src/components/WebSecurity/Common/SyntaxHighlight.jsx";
import { secureCodeData } from "src/components/WebSecurity/SecureCode/secureCodeData.jsx";

const SecureCode = () => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [editedCode, setEditedCode] = useState(secureCodeData[0].vulnerableCode);
    const [checkResult, setCheckResult] = useState(null);

    const handleCodeChange = (value) => {
        setEditedCode(value);
    };

    const handleSubmit = () => {
        const currentChecks = secureCodeData[selectedIndex].isSecuredChecks;
        const isPassed = currentChecks.every((check) => editedCode.includes(check));
        setCheckResult(isPassed);
    };

    return (
        <div style={{ display: "flex" }}>
            {/* Sidebar */}
            <div style={{ width: "200px", borderRight: "1px solid #ccc", padding: "20px" }}>
                <h3>Code Snippets</h3>
                <ul style={{ listStyle: "none", padding: 0 }}>
                    {secureCodeData.map((item, index) => (
                        <li
                            key={index}
                            onClick={() => {
                                setSelectedIndex(index);
                                setEditedCode(item.vulnerableCode);
                                setCheckResult(null);
                            }}
                            style={{
                                cursor: "pointer",
                                padding: "10px",
                                backgroundColor: selectedIndex === index ? "#303030" : "transparent",
                            }}
                        >
                            {item.title}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Main content */}
            <div style={{ flex: 1, padding: "20px" }}>
                <h2>{secureCodeData[selectedIndex].title}</h2>
                <div style={{ display: "flex", justifyContent: "space-between", gap: "25px" }}>
                    <div style={{ width: "48%" }}>
                        <h3>Vulnerable Code (Editable)</h3>
                        <CodeMirror
                            value={editedCode}
                            height="300px"
                            theme={dracula}
                            extensions={[python()]}
                            onChange={handleCodeChange}
                        />
                        <button
                            onClick={handleSubmit}
                            style={{
                                marginTop: "10px",
                                backgroundColor: "#202020",
                                cursor: "pointer",
                                color: "white",
                                padding: "10px 20px",
                                borderRadius: "5px",
                                fontWeight: "bold",
                                fontSize: "14px",
                            }}
                        >
                            Submit
                        </button>
                        {checkResult !== null && (
                            <div style={{ marginTop: "10px", color: checkResult ? "green" : "red" }}>
                                {checkResult
                                    ? "Passed! Your code includes the necessary security measures."
                                    : "Failed. Please review the security guidelines and try again."}
                            </div>
                        )}
                    </div>
                    <div style={{ width: "48%" }}>
                        <h3>Secure Code</h3>
                        <CodeMirror
                            value={secureCodeData[selectedIndex].secureCode}
                            height="300px"
                            theme={dracula}
                            extensions={[python()]}
                            editable={false}
                        />
                    </div>
                </div>
                <div style={{ marginTop: "20px" }}>
                    <h3>Explanation</h3>
                    <p>{secureCodeData[selectedIndex].explanation}</p>
                </div>
            </div>
        </div>
    );
};

export default SecureCode;
