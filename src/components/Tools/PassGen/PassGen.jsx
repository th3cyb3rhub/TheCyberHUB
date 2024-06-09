import React, { useState } from "react";
import {
    CopyToClipboardButton,
    GenerateButton,
    IsStrongText,
    PassGenCard,
    PassGenContainer,
    PassGenForm,
    PassGenHeading,
    PassGenOptionsContainer,
    PassGenPasswordContainer,
    PasswordDisplay,
    PasswordDisplayContainer,
} from "./PassGenElements";
import { Wrapper } from "src/components/Dashboard/Profile/ProfileElements";
import { toast } from "react-toastify";
import HeadingBanner from "src/components/Common/HeadingBanner/HeadingBanner";

const PassGen = () => {
    const [password, setPassword] = useState("7h3cyb3rw04ld (0mmun17y");
    const [options, setOptions] = useState({
        length: 16,
        includeNumbers: true,
        includeSymbols: true,
        includeUppercase: true,
        includeLowercase: true,
    });

    const generatePassword = (e) => {
        e.preventDefault();
        const { length, includeNumbers, includeSymbols, includeUppercase, includeLowercase } = options;

        const numbers = includeNumbers ? "0123456789" : "";
        const symbols = includeSymbols ? "!@#$%^&*()_-+=<>?" : "";
        const lowercase = includeLowercase ? "abcdefghijklmnopqrstuvwxyz" : "";
        const uppercase = includeUppercase ? "ABCDEFGHIJKLMNOPQRSTUVWXYZ" : "";

        const allChars = numbers + symbols + lowercase + uppercase;

        if (!allChars.length) {
            toast("Please select at least one character type", {
                type: "error",
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
            });
            return;
        }

        let newPassword = "";
        for (let i = 0; i < length; i++) {
            newPassword += allChars.charAt(Math.floor(Math.random() * allChars.length));
        }

        setPassword(newPassword);
    };

    const copyPassword = () => {
        navigator.clipboard.writeText(password);

        toast("Copied to clipboard", {
            type: "success",
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
        });
    };

    const isPasswordStrong = () => {
        const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_\-=<>?]).{8,}$/;
        return strongRegex.test(password);
    };

    const handleOptionsChange = (event) => {
        const { name, value, type, checked } = event.target;
        setOptions((prevOptions) => ({
            ...prevOptions,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    return (
        <Wrapper>
            <PassGenContainer>
                <HeadingBanner heading={"Password Generator"} />
                <PassGenCard>
                    <PassGenOptionsContainer>
                        <PassGenHeading>Options</PassGenHeading>
                        <div>
                            <span> Length </span>
                            <input
                                className={"range"}
                                type="range"
                                name="length"
                                min="6"
                                max="30"
                                value={options.length}
                                onChange={handleOptionsChange}
                            />
                            <span>{options.length}</span>
                        </div>
                        <div>
                            <label>
                                Numbers
                                <input
                                    type="checkbox"
                                    name="includeNumbers"
                                    checked={options.includeNumbers}
                                    onChange={handleOptionsChange}
                                />
                            </label>
                            <label>
                                Symbols
                                <input
                                    type="checkbox"
                                    name="includeSymbols"
                                    checked={options.includeSymbols}
                                    onChange={handleOptionsChange}
                                />
                            </label>
                        </div>
                        <div>
                            <label>
                                Uppercase
                                <input
                                    className={".checkbox"}
                                    type="checkbox"
                                    name="includeUppercase"
                                    checked={options.includeUppercase}
                                    onChange={handleOptionsChange}
                                />
                            </label>
                            <label>
                                Lowercase
                                <input
                                    type="checkbox"
                                    name="includeLowercase"
                                    checked={options.includeLowercase}
                                    onChange={handleOptionsChange}
                                />
                            </label>
                        </div>
                    </PassGenOptionsContainer>

                    <PassGenPasswordContainer>
                        <PassGenHeading>Password</PassGenHeading>

                        <PassGenForm>
                            <PasswordDisplayContainer>
                                <PasswordDisplay> {password} </PasswordDisplay>
                                <CopyToClipboardButton onClick={copyPassword} />
                            </PasswordDisplayContainer>

                            <IsStrongText isStrong={isPasswordStrong()}>
                                {isPasswordStrong() ? "Strong" : "Weak"}
                            </IsStrongText>
                            <GenerateButton onClick={generatePassword}>Generate</GenerateButton>
                        </PassGenForm>
                    </PassGenPasswordContainer>
                </PassGenCard>
            </PassGenContainer>
        </Wrapper>
    );
};

export default PassGen;
