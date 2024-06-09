import React from "react";
import SettingsForm from "./ApiForm";
import "./api.css";

export default function Api() {
    return (
        <section style={{ width: "100%" }}>
            <div>
                <div className="api">
                    <h3 className="api-heading">Api</h3>
                    <p className="api-info">Entter Your gemini AI Api key.</p>
                </div>

                <div className="flex flex-row mt-2">
                    <p>Get your API Key:</p>
                    <a
                        className="text-white"
                        href="https://makersuite.google.com/app/apikey"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <button className="newApibtn ml-2 pl-4 pr-4">Click here</button>
                    </a>
                </div>

                <div>
                    <SettingsForm />
                </div>
            </div>
        </section>
    );
}
