import React from "react";
import SettingsForm from "src/components/Dashboard/Settings/Account/ProfileForm.jsx";
import "./profile.css";

export default function Account() {
    return (
        <section style={{ width: "100%" }}>
            <div>
                <div className="settings-profile">
                    <h3 className="profile-heading">Account</h3>
                    <p className="profile-info">User Configuration Settings.</p>
                </div>
                <div>
                    <SettingsForm />
                </div>
            </div>
        </section>
    );
}
