import React, { useState, useRef } from "react";
import {
    Container,
    Settings,
    BackgroundColorInput,
    LanguageSelect,
    ButtonGroup,
    CopyButton,
    ThemeToggle,
    Wrapper,
    CodeContainer,
    EditorContainer,
    Editor,
} from "./CodeSnippetElements";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
    solarizedlight,
    coldarkDark,
    atomDark,
    prism,
    materialLight,
    materialDark,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { Copy, Check, Sun, Moon } from "lucide-react";

const LANGUAGES = ["javascript", "typescript", "python", "java", "cpp", "csharp", "ruby", "swift", "kotlin", "rust"];

const THEMES = {
    dark: [coldarkDark, atomDark, materialDark],
    light: [solarizedlight, prism, materialLight],
};

const CodeSnippet = () => {
    const [code, setCode] = useState(`const hello = () => {
    console.log("Hello, world!");
};

hello(); // Call the function`);
    const [backgroundColor, setBackgroundColor] = useState("#1E1E1E");
    const [language, setLanguage] = useState("javascript");
    const [isDarkTheme, setIsDarkTheme] = useState(true);
    const [themeIndex, setThemeIndex] = useState(0);
    const [isCopied, setIsCopied] = useState(false);
    const codeRef = useRef(null);

    const handleCopyCode = () => {
        if (codeRef.current) {
            navigator.clipboard
                .writeText(code)
                .then(() => {
                    setIsCopied(true);
                    setTimeout(() => setIsCopied(false), 2000);
                })
                .catch((err) => console.error("Failed to copy:", err));
        }
    };

    const toggleTheme = () => {
        setIsDarkTheme(!isDarkTheme);
        setThemeIndex((prevIndex) => (prevIndex + 1) % (isDarkTheme ? THEMES.dark.length : THEMES.light.length));
    };

    return (
        <Wrapper>
            <Container style={{ display: "flex" }}>
                {/* Code Editor */}
                <EditorContainer>
                    <Editor
                        as="textarea" // Add this line if `Editor` is a styled component
                        placeholder="Type or paste your code here..."
                        value={code}
                        onChange={(e) => setCode(e.target.value)} // Update this line
                        style={{
                            minHeight: "200px",
                            padding: "10px",
                            backgroundColor: "#1E1E1E",
                            color: "#FFF",
                            borderRadius: "8px",
                            outline: "none",
                            fontFamily: "'Fira Code', monospace",
                            fontSize: "14px",
                            lineHeight: "1.5",
                            overflowY: "auto",
                        }}
                    />
                </EditorContainer>

                {/* Settings and Syntax Highlighter */}
                <div
                    style={{
                        width: "100%",
                        paddingLeft: "20px",
                        maxWidth: "1000px",
                    }}
                >
                    <Settings>
                        <LanguageSelect value={language} onChange={(e) => setLanguage(e.target.value)}>
                            {LANGUAGES?.map((lang) => (
                                <option key={lang} value={lang}>
                                    {lang.charAt(0).toUpperCase() + lang.slice(1)}
                                </option>
                            ))}
                        </LanguageSelect>

                        <BackgroundColorInput
                            type="color"
                            value={backgroundColor}
                            onChange={(e) => setBackgroundColor(e.target.value)}
                            title="Change Background Color"
                        />

                        <ButtonGroup>
                            <ThemeToggle
                                onClick={toggleTheme}
                                title={`Switch to ${isDarkTheme ? "Light" : "Dark"} Theme`}
                            >
                                {isDarkTheme ? <Sun size={20} /> : <Moon size={20} />}
                            </ThemeToggle>

                            <CopyButton onClick={handleCopyCode} title="Copy Code">
                                {isCopied ? <Check size={20} color="green" /> : <Copy size={20} />}
                            </CopyButton>
                        </ButtonGroup>
                    </Settings>

                    <CodeContainer>
                        <SyntaxHighlighter
                            ref={codeRef}
                            language={language}
                            style={isDarkTheme ? THEMES.dark[themeIndex] : THEMES.light[themeIndex]}
                            customStyle={{
                                backgroundColor,
                                borderRadius: "8px",
                                padding: "16px",
                                fontSize: "14px",
                                lineHeight: "1.5",
                                fontFamily: "'Fira Code', monospace",
                                cursor: "text",
                                maxHeight: "400px",
                                overflowY: "auto",
                                width: "max-content",
                            }}
                        >
                            {code.trim() !== "" ? code : "No code provided."}
                        </SyntaxHighlighter>
                    </CodeContainer>
                </div>
            </Container>
        </Wrapper>
    );
};

export default CodeSnippet;
