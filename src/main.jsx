import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { Provider } from "react-redux";

import App from "./App";
import "./index.css";
import store from "./app/store";

const rootElement = document.getElementById("root");
export const webEnv = import.meta.env.VITE_WEB_ENV || "production";

ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
        {webEnv === "security" ? (
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
