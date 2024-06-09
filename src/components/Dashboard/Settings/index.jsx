import React from "react";
import { Route, Routes } from "react-router-dom";
import Profile from "./Profile";
import Sidebar from "./SettingsSidebar";
import "./settings.css";
import Account from "./Account";
import Appearance from "./Appearance";
import Notifications from "./Notifications";
import Display from "./Display";
import NotFound from "src/NotFound";
import Api from "./Api";

export default function SettingsRoute() {
    return (
        <section>
            <div className="settings-wrapper">
                <div className="settings-header">
                    <h2 className="settings-header-h2">Settings</h2>
                    <p className="settings-header-info">Manage your account settings and set e-mail preferences.</p>
                </div>
                <div className="settings-profile-wrapper">
                    <Sidebar />
                    <Routes>
                        <Route index element={<Account />} />
                        <Route path={"profile"} element={<Profile />} />
                        <Route path={"account"} element={<Account />} />
                        <Route path={"appearance"} element={<Appearance />} />
                        <Route path={"notifications"} element={<Notifications />} />
                        <Route path={"display"} element={<Display />} />
                        <Route path={"api"} element={<Api />} />
                        <Route path={"*"} element={<NotFound />} />
                    </Routes>
                </div>
            </div>
        </section>
    );
}
