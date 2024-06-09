import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { Provider } from "react-redux";

import App from "./App";
import "./index.css";
import store from "./app/store";

const rootElement = document.getElementById("root");
export const webEnv = import.meta.env.VITE_WEB_ENV || "production";
const hostname = window.location.hostname;
const isElectron = navigator.userAgent.toLowerCase().indexOf(" electron/") > -1;

ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
        {isElectron || isElectron || webEnv === "security" || (webEnv === "development" && hostname !== "localhost") ? (
            <HashRouter>
                <Provider store={store}>
                    <App />
                </Provider>
            </HashRouter>
        ) : (
            <BrowserRouter>
                <Provider store={store}>
                    <App />
                </Provider>
            </BrowserRouter>
        )}
    </React.StrictMode>,
);
