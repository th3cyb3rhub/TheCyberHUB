import React, { useEffect, useState } from "react";
import { CenterCard, Container } from "../components/Homepage/Registration/CenterCard";
import { Learn2CodePromotion } from "../components/Homepage/Registration/Learn2CodePromotion";
import {
    CustomInputGroup,
    VerificationCodeSection,
} from "../components/Other/MixComponents/InputField/CustomInputField";
import { RegistrationFormContainer } from "../components/Homepage/Registration/Form";
import { ButtonGreen, LoadingButton } from "../components/Other/MixComponents/Buttons/ButtonElements";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { forgetPasswordWithEmail, reset, resetPasswordWithToken } from "../features/resetPassword/resetPasswordSlice";
import { CircleSpinner } from "react-spinners-kit";
import { RouterLink } from "../components/Resources/Events/EventsElement";
import { FaUserCircle } from "react-icons/fa";
import { verifyEmailCode } from "../features/auth/authSlice";
import { CgPassword } from "react-icons/all";

const ForgotPassword = () => {
    const [formData, setFormData] = useState({
        email: "",
        code: "",
        password: "",
        confirmPassword: "",
    });

    const { email, code, password, confirmPassword } = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [emailSent, setEmailSent] = useState(false);
    const [isEmailVerified, setIsEmailVerified] = useState(false);

    const { isLoading: isAuthLoading, isError: isAuthError, message: authMessage } = useSelector((state) => state.auth);

    const { isLoading, isError, isSuccess, message } = useSelector((state) => state.resetPassword);

    useEffect(() => {
        if (isError || isAuthError) {
            if (message === "Request failed with status code 429") {
                toast.error("Please try again in 1 minute");
            } else toast.error(message || authMessage);
        }

        toast(message.length > 0 && message);
        toast(authMessage.length > 0 && authMessage);

        dispatch(reset());

        if (message === "Email sent successfully") {
            setEmailSent(true);
        }
        if (authMessage === "Email verified successfully") {
            setIsEmailVerified(true);
            // setEmailSent(false);
        }
        if (message === "Password updated successfully") {
            navigate("/login");
        }
    }, [isError, isSuccess, message, authMessage, navigate, dispatch]);

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };
    const whitelistedDomains = [
        "gmail.com",
        "yahoo.com",
        "outlook.com",
        "hotmail.com",
        "icloud.com",
        "protonmail.com",
        "pm.me",
        "proton.me",
        "protonmail.ch",
    ];
    const onSubmitSendEmail = (e) => {
        e.preventDefault();
        const domain = email.split("@")[1];
        if (domain === undefined) {
            toast.error("Please enter a valid email");
        } else if (whitelistedDomains.indexOf(domain) === -1) {
            toast.error(`Sorry, ${domain} email domain is not allowed`);
        } else {
            const userData = { email };
            console.log(userData);
            dispatch(forgetPasswordWithEmail(userData));
        }
    };

    const onSubmitVerifyCode = (e) => {
        e.preventDefault();
        const userData = { email, code };
        console.log(userData);
        dispatch(verifyEmailCode(userData));
    };

    const onSubmitPassword = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
        } else {
            const userData = { email, code, password };
            console.log(userData);
            dispatch(resetPasswordWithToken(userData));
        }
    };

    return (
        <Container>
            <CenterCard>
                <Learn2CodePromotion>
                    <div id="reg-promo-content">
                        <RouterLink to={"/"} className="brand-logo">
                            {" "}
                            TheCyberHUB{" "}
                        </RouterLink>
                        <h1 className="leading-title">Learn Cybersecurity For Free</h1>
                    </div>
                </Learn2CodePromotion>
                <RegistrationFormContainer>
                    <p className="registration__promotion__p">
                        Master Cybersecurity. This path will prepare you to build you base strong in cyber security
                    </p>
                    <div className="registration__ctas">
                        {!emailSent
                            ? SendEmail({ email, onChange, onSubmitSendEmail, isLoading })
                            : !isEmailVerified
                            ? VerifyCode({ code, onChange, onSubmitVerifyCode, isAuthLoading })
                            : ResetPassword({ password, confirmPassword, onChange, onSubmitPassword, isLoading })}{" "}
                    </div>
                </RegistrationFormContainer>
            </CenterCard>
        </Container>
    );
};

const SendEmail = ({ email, onChange, onSubmitSendEmail, isLoading }) => (
    <>
        <h1 className="registration__promotion__h1">Forgot Password</h1>
        <div className="registration__inputfields">
            <CustomInputGroup>
                <span>
                    <FaUserCircle />
                </span>
                <input
                    type="email"
                    id={"email"}
                    name={"email"}
                    value={email}
                    placeholder="email"
                    onChange={onChange}
                    aria-label="email"
                />
            </CustomInputGroup>
        </div>
        {isLoading ? (
            <LoadingButton width={"100%"}>
                <CircleSpinner size={20} color={"#131313"} />
            </LoadingButton>
        ) : (
            <ButtonGreen width={"100%"} onClick={onSubmitSendEmail}>
                Send Code
            </ButtonGreen>
        )}
    </>
);

const VerifyCode = ({ code, onChange, onSubmitVerifyCode, isAuthLoading }) => (
    <>
        <>
            <h1 className="registration__promotion__h1">Verify Code</h1>
            <VerificationCodeSection>
                {/* <span> Code </span> */}
                <CustomInputGroup style={{ width: "100%" }}>
                    <input
                        className={"codeInput"}
                        type={"text"}
                        id={"code"}
                        name={"code"}
                        value={code}
                        placeholder={"Code"}
                        onChange={onChange}
                        aria-label={"Code"}
                    />
                </CustomInputGroup>
                {/* <ButtonGreen width={"100%"} onClick={onSubmitVerifyCode}> Resend </ButtonGreen> */}
                {!isAuthLoading ? (
                    <ButtonGreen style={{ width: "150px", height: "100%" }} onClick={onSubmitVerifyCode}>
                        Verify
                    </ButtonGreen>
                ) : (
                    <ButtonGreen style={{ width: "150px", height: "100%" }}>
                        <CircleSpinner size={23} color={"#131313"} />
                    </ButtonGreen>
                )}
            </VerificationCodeSection>
        </>
    </>
);

const ResetPassword = ({ password, confirmPassword, onChange, onSubmitPassword, isLoading }) => (
    <>
        <h1 className="registration__promotion__h1">Reset Password</h1>
        <div className="registration__inputfields">
            <CustomInputGroup>
                <span>
                    <CgPassword />
                </span>
                <input
                    type="password"
                    id={"password"}
                    name={"password"}
                    value={password}
                    placeholder="Password"
                    onChange={onChange}
                    aria-label="Password"
                    autoComplete={null}
                />
            </CustomInputGroup>
            <CustomInputGroup>
                <span>
                    <CgPassword />
                </span>
                <input
                    type="password"
                    id={"confirmPassword"}
                    name={"confirmPassword"}
                    value={confirmPassword}
                    placeholder="Confirm Password"
                    onChange={onChange}
                    aria-label="Password"
                    autoComplete={null}
                />
            </CustomInputGroup>
            {/* <ButtonGreen width={"100%"} onClick={onSubmitVerifyCode}> Resend </ButtonGreen> */}
            {!isLoading ? (
                <ButtonGreen style={{ width: "100%", height: "100%" }} onClick={onSubmitPassword}>
                    Submit
                </ButtonGreen>
            ) : (
                <ButtonGreen style={{ width: "100%", height: "100%" }}>
                    <CircleSpinner size={23} color={"#131313"} />
                </ButtonGreen>
            )}
        </div>
    </>
);

export default ForgotPassword;
