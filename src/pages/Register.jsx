import React, { useEffect, useState } from "react";
import { CenterCard, Container } from "src/components/Homepage/Registration/CenterCard";
import { Learn2CodePromotion } from "src/components/Homepage/Registration/Learn2CodePromotion";
import {
    CustomInputGroup,
    VerificationCodeSection,
} from "src/components/Other/MixComponents/InputField/CustomInputField";
import { RegistrationFormContainer } from "src/components/Homepage/Registration/Form";
import { ButtonGreen, LoadingButton } from "src/components/Other/MixComponents/Buttons/ButtonElements";
import { FaUserCircle } from "react-icons/fa";
import { AiTwotoneMail } from "react-icons/ai";
import { SiNamecheap } from "react-icons/si";
import { CgPassword } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerUser, userReset, sendEmailCode, verifyEmailCode } from "src/features/auth/authSlice";
import { CircleSpinner } from "react-spinners-kit";
import { RouterLink } from "src/components/Tools/ToolsElements";
import validator from "validator";

const Register = ({ authPopup }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
        password2: "",
        termsAndConditions: true,
        notifications: true,
        code: "",
    });

    const [emailSent, setEmailSent] = useState(false);
    const [emailRegistered, setEmailRegistered] = useState(false);
    const { name, username, email, password, password2, termsAndConditions, notifications, code } = formData;
    const { user, isUserLoading, isUserError, userMessage } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isUserError || userMessage) {
            toast(userMessage);
        }

        if (user && user._id) {
            navigate("/");
        }
        dispatch(userReset());

        if (userMessage === "Email sent successfully") {
            setEmailSent(true);
        }
        if (userMessage === "Email verified successfully") {
            setEmailRegistered(true);
        }
    }, [user, isUserError, userMessage, navigate, dispatch]);

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

    const validateEmail = (email) => {
        return validator?.isEmail(email);
    };

    const onSubmitSendEmail = (e) => {
        e.preventDefault();
        const domain = email.split("@")[1];
        if (!validateEmail(email)) {
            toast.error("Please enter a valid email address.");
        } else if (email.length < 8 || email.length > 64) {
            toast.error("Email must be between 8 and 32 characters");
        } else if (domain === undefined) {
            toast.error("Please enter a valid email");
        } else if (whitelistedDomains.indexOf(domain) === -1) {
            toast.error(`Sorry, ${domain} email domain is not allowed`);
        } else if (!termsAndConditions) {
            toast.error("You must agree to the terms and conditions");
        } else {
            // appended notifications to userData obj
            const userData = { email, termsAndConditions, notifications };
            dispatch(sendEmailCode(userData));
        }
    };

    const onSubmitVerifyCode = (e) => {
        e.preventDefault();
        const userData = { email, code };
        dispatch(verifyEmailCode(userData));
    };

    const onSubmitUserData = (e) => {
        e.preventDefault();
        if (!validateEmail(email)) {
            toast.error("Please enter a valid email address.");
        } else if (password !== password2) {
            toast.error("Passwords do not match");
        } else if (password.length < 8 || password.length > 64) {
            toast.error("Password must be between 8 and 32 characters");
        } else if (username?.length < 2 || username?.length > 32) {
            toast.error("Username must be between 2 and 20 characters");
        } else if (name.length < 1 || name.length > 32) {
            toast.error("Name must be between 1 and 20 characters");
        } else if (/[^a-zA-Z0-9]+/.test(username)) {
            toast.error("Username must only contain letters and numbers");
        } else {
            const userData = { name, username, email, password, code, termsAndConditions };
            dispatch(registerUser(userData));
        }
    };

    return (
        <Container $authPopup={authPopup}>
            <CenterCard $authPopup={authPopup}>
                {!authPopup ? (
                    <Learn2CodePromotion>
                        <div id="reg-promo-content">
                            <RouterLink to={"/"} className="brand-logo">
                                TheCyberHUB
                            </RouterLink>
                            <h1 className="leading-title">Learn Cybersecurity For Free</h1>
                        </div>
                    </Learn2CodePromotion>
                ) : null}
                <RegistrationFormContainer>
                    <h1 className="registration-promotion-h1">Join over 25 million learners from around the globe</h1>
                    <p className="registration-promotion-p">
                        Master Cybersecurity. This path will prepare you to build you base strong in cyber security
                    </p>
                    <div className="registration-inputfields">
                        {!emailRegistered
                            ? !emailSent
                                ? RegisterEmail({
                                      email,
                                      onChange,
                                      onSubmitSendEmail,
                                      setFormData,
                                      formData,
                                      termsAndConditions,
                                      isUserLoading,
                                  })
                                : VerifyCode({
                                      code,
                                      onChange,
                                      onSubmitVerifyCode,
                                      isUserLoading,
                                  })
                            : AddUserData({
                                  name,
                                  username,
                                  password,
                                  password2,
                                  onChange,
                                  onSubmitUserData,
                                  isUserLoading,
                              })}
                    </div>
                </RegistrationFormContainer>
            </CenterCard>
        </Container>
    );
};

const RegisterEmail = ({
    email,
    onChange,
    onSubmitSendEmail,
    isUserLoading,
    setFormData,
    formData,
    termsAndConditions, // included 'notifications' here to be used as value
    notifications,
}) => (
    <>
        <CustomInputGroup>
            <span>
                <AiTwotoneMail />
            </span>
            <input
                type={"email"}
                id={"email"}
                name={"email"}
                value={email}
                placeholder={"Email"}
                onChange={onChange}
                aria-label={"Email"}
                autoComplete="off"
            />
        </CustomInputGroup>
        <div className="registration-ctas">
            <div className="registration-tandc">
                <input
                    role={"checkbox"}
                    type={"checkbox"}
                    id={"termsAndConditions"}
                    name={"termsAndConditions"}
                    onChange={(e) => setFormData({ ...formData, termsAndConditions: e.target.checked })}
                    value={termsAndConditions}
                    autoComplete="off"
                />
                <div>
                    I agree to all statements included in
                    <RouterLink to={"/terms-conditions"}>
                        <span style={{ color: "#f67c07" }}> Terms of Use </span>
                    </RouterLink>
                </div>
            </div>

            <div className="registration-tandc">
                <input
                    role={"checkbox"}
                    type={"checkbox"}
                    // set the default value as checked
                    defaultChecked={"checked"}
                    // Ive named and id-ed it notifications to make future use easier
                    id={"notifications"}
                    name={"notifications"}
                    // I have implemented the onChange function
                    onChange={(e) => setFormData({ ...formData, notifications: e.target.checked })}
                    value={notifications}
                    autoComplete="off"
                />

                <div>I want to receive updates about upcoming Internships, Events and Newsletter</div>
            </div>

            {isUserLoading ? (
                <LoadingButton width={"100%"}>
                    <CircleSpinner size={20} color={"#131313"} />
                </LoadingButton>
            ) : (
                <ButtonGreen width={"100%"} onClick={onSubmitSendEmail}>
                    Send Code
                </ButtonGreen>
            )}
            <RouterLink to={"/login"}>
                <p style={{ color: "white", margin: "15px 0 0 0" }}>Login Instead?</p>
            </RouterLink>
        </div>
    </>
);

export const VerifyCode = ({ code, onChange, onSubmitVerifyCode, isUserLoading }) => (
    <>
        <VerificationCodeSection>
            <CustomInputGroup style={{ width: "100%" }}>
                <input
                    className={"code-input"}
                    type={"text"}
                    id={"code"}
                    name={"code"}
                    value={code}
                    placeholder={"Code"}
                    onChange={onChange}
                    aria-label={"Code"}
                    autoComplete="off"
                />
            </CustomInputGroup>
            {!isUserLoading ? (
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
);

const AddUserData = ({ name, username, password, password2, onChange, onSubmitUserData, isUserLoading }) => (
    <>
        <CustomInputGroup>
            <span>
                <SiNamecheap />
            </span>
            <input
                type="text"
                id={"name"}
                name={"name"}
                value={name}
                placeholder="Full Name"
                onChange={onChange}
                aria-label="name"
                autoComplete="off"
            />
        </CustomInputGroup>
        <CustomInputGroup>
            <span>
                <FaUserCircle />
            </span>
            <input
                type="text"
                id={"username"}
                name={"username"}
                value={username}
                placeholder="Username"
                onChange={onChange}
                aria-label="Username"
                autoComplete="off"
            />
        </CustomInputGroup>
        <CustomInputGroup>
            <span>
                <CgPassword />
            </span>
            <input
                type={"password"}
                id={"password"}
                name={"password"}
                value={password}
                placeholder={"Password"}
                onChange={onChange}
                aria-label={"Password"}
                autoComplete="off"
            />
        </CustomInputGroup>
        <CustomInputGroup>
            <span>
                <CgPassword />
            </span>
            <input
                type={"password"}
                id={"password2"}
                name={"password2"}
                value={password2}
                placeholder={"Confirm Password"}
                onChange={onChange}
                aria-label={"Confirm Password"}
                autoComplete="off"
            />
        </CustomInputGroup>

        {!isUserLoading ? (
            <ButtonGreen width={"100%"} onClick={onSubmitUserData}>
                Start Hacking
            </ButtonGreen>
        ) : (
            <LoadingButton width={"100%"}>
                <CircleSpinner size={20} color={"#131313"} />
            </LoadingButton>
        )}
    </>
);

export default Register;
