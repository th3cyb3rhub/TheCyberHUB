import React, { useEffect, useState } from "react";
import { CenterCard, Container } from "../components/Homepage/Registration/CenterCard";
import { Learn2CodePromotion } from "../components/Homepage/Registration/Learn2CodePromotion";
import {
    CustomInputGroup,
    VerificationCodeSection,
} from "../components/Other/MixComponents/InputField/CustomInputField";
import { RegistrationFormContainer } from "../components/Homepage/Registration/Form";
import { ButtonGreen, LoadingButton } from "../components/Other/MixComponents/Buttons/ButtonElements";
import { FaUserCircle } from "react-icons/fa";
import { AiTwotoneMail, CgPassword, SiNamecheap } from "react-icons/all";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerUser, reset, sendEmailCode, verifyEmailCode } from "../features/auth/authSlice";
import { CircleSpinner } from "react-spinners-kit";
import { RouterLink } from "../components/Resources/Events/EventsElement";

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
        password2: "",
        termsAndConditions: "",
        code: "",
    });

    const [emailSent, setEmailSent] = useState(false);
    const [emailRegistered, setEmailRegistered] = useState(false);
    const { name, username, email, password, password2, termsAndConditions, code } = formData;
    const { user, isLoading, isError, message } = useSelector((state) => state.auth);

    useEffect(() => {
        // if (isError) {toast.error(message);}
        if (message) {
            toast(message);
        }
        if (user) {
            navigate("/");
        }
        dispatch(reset());

        if (message === "Email sent successfully") {
            setEmailSent(true);
        }
        if (message === "Email verified successfully") {
            setEmailRegistered(true);
        }
    }, [user, isError, message, navigate, dispatch]);

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
        } else if (!termsAndConditions) {
            toast.error("You must agree to the terms and conditions");
        } else {
            const userData = { email, termsAndConditions };
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
        if (password !== password2) {
            toast.error("Passwords do not match");
        } else if (password.length < 8 || password.length > 64) {
            toast.error("Password must be between 8 and 32 characters");
        } else if (username.length < 2 || username.length > 32) {
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
                    <h1 className="registration__promotion__h1">Join over 25 million learners from around the globe</h1>
                    <p className="registration__promotion__p">
                        Master Cybersecurity. This path will prepare you to build you base strong in cyber security
                    </p>
                    <div className="registration__inputfields">
                        {!emailRegistered
                            ? !emailSent
                                ? RegisterEmail({
                                      email,
                                      onChange,
                                      onSubmitSendEmail,
                                      setFormData,
                                      formData,
                                      termsAndConditions,
                                      isLoading,
                                  })
                                : VerifyCode({
                                      code,
                                      onChange,
                                      onSubmitVerifyCode,
                                      isLoading,
                                  })
                            : AddUserData({
                                  name,
                                  username,
                                  password,
                                  password2,
                                  onChange,
                                  onSubmitUserData,
                                  isLoading,
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
    isLoading,
    setFormData,
    formData,
    termsAndConditions,
}) => (
    <>
        <CustomInputGroup>
            <span>
                <AiTwotoneMail />
            </span>
            <input
                type={"text"}
                id={"email"}
                name={"email"}
                value={email}
                placeholder={"Email"}
                onChange={onChange}
                aria-label={"Email"}
            />
        </CustomInputGroup>
        <div className="registration__ctas">
            <div className="registration__tandc">
                <input
                    role={"checkbox"}
                    type={"checkbox"}
                    id={"termsAndConditions"}
                    name={"termsAndConditions"}
                    onChange={(e) => setFormData({ ...formData, termsAndConditions: e.target.checked })}
                    value={termsAndConditions}
                />
                <div>
                    {" "}
                    I agree to all statements included in
                    <RouterLink to={"/terms-conditions"}>
                        {" "}
                        <span style={{ color: "#20c20e" }}> Terms of Use </span>
                    </RouterLink>
                </div>
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
        </div>
    </>
);

const VerifyCode = ({ code, onChange, onSubmitVerifyCode, isLoading }) => (
    <>
        <VerificationCodeSection>
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
            {!isLoading ? (
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

const AddUserData = ({ name, username, password, password2, onChange, onSubmitUserData, isLoading }) => (
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
            />
        </CustomInputGroup>

        {!isLoading ? (
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
