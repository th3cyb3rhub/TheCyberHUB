import React, { createContext, useState } from "react";

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleTheme = () => {
        setIsDarkMode((prevMode) => !prevMode);
    };

    const lightTheme = {
        theme: "light",
        background: "#f5f5f5",
        text: "#000",
        primary: "gray", // Add your primary color here
    };

    const darkTheme = {
        theme: "dark",
        background: "#000",
        text: "#f5f5f5",
        primary: "gray", // Add your primary color here
    };

    const themes = {
        dark: darkTheme,
        light: lightTheme,
    };

    const theme = isDarkMode ? themes.dark : themes.light;

    return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

export { ThemeProvider, ThemeContext };
