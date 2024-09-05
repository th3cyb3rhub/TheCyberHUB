import React, { useEffect, useState } from "react";
import { CenterCard, Container } from "src/components/Homepage/Registration/CenterCard";
import { Learn2CodePromotion } from "src/components/Homepage/Registration/Learn2CodePromotion";
import { CustomInputGroup } from "src/components/Other/MixComponents/InputField/CustomInputField";
import { RegistrationFormContainer } from "src/components/Homepage/Registration/Form";
import { ButtonGreen, LoadingButton } from "src/components/Other/MixComponents/Buttons/ButtonElements";
import { FaUserCircle, FaEye, FaEyeSlash } from "react-icons/fa";
import { CgPassword } from "react-icons/cg";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, userReset, verify2FACode } from "src/features/auth/authSlice";
import { CircleSpinner } from "react-spinners-kit";
import { RouterLink } from "src/components/Tools/ToolsElements";
import { VerifyCode } from "src/pages/Register.jsx";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const { email, password, code } = formData;
    const [showPassword, setShowPassword] = useState(false);
    const [passwordType, setPasswordType] = useState("password");
    const [isEmailSent, setEmailSent] = useState(false);
    const [showVerifyForm, setShowVerifyForm] = useState(false);
    const eyeColor = "white";
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, isUserLoading, isUserError, isUserSuccess, userMessage } = useSelector((state) => state.auth);

    useEffect(() => {
        if ((user && !user?._id && user?.message !== "email sent" && isUserSuccess) || user?._id) {
            navigate("/");
        }

        if (isUserError) {
            if (userMessage === "Request failed with status code 429") {
                toast.error("Please try again in 30 minute");
                // } else if (userMessage === "AxiosError: Request failed with status code 401") {
                //     toast.error("Invalid Credentials");
            } else {
                toast.error(userMessage);
            }
        }

        dispatch(userReset());
    }, [user, isUserError, isUserSuccess, userMessage, navigate, dispatch]);

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if (email !== "" && password !== "") {
            const userData = {
                email,
                password,
            };
            dispatch(login(userData));
        }
    };

    const handleTogglePassword = () => {
        setShowPassword((prevState) => {
            const newState = !prevState;
            newState ? setPasswordType("text") : setPasswordType("password");
            return newState;
        });
    };

    const onSubmitVerifyCode = (e) => {
        e.preventDefault();
        const userData = { email, code };
        dispatch(verify2FACode(userData));
    };

    useEffect(() => {
        setEmailSent(user?.message === "email sent");

        if (isEmailSent) {
            setShowVerifyForm(!showVerifyForm);
        }

        if (user && user?._id) {
            navigate("/");
        }
    }, [user, isEmailSent, isUserSuccess, navigate]);

    return (
        <Container>
            <CenterCard>
                <Learn2CodePromotion>
                    <div id="reg-promo-content">
                        <RouterLink to={"/"} className="brand-logo">
                            TheCyberHUB
                        </RouterLink>
                        <h1 className="leading-title">Learn Cybersecurity For Free</h1>
                    </div>
                </Learn2CodePromotion>
                <RegistrationFormContainer>
                    <h1 className="registration-promotion-h1">Join over 25 million learners from around the globe</h1>
                    <p className="registration-promotion-p">
                        Master Cybersecurity. This path will prepare you to build you base strong in cyber security
                    </p>
                    {showVerifyForm ? (
                        VerifyCode({
                            code,
                            onChange,
                            onSubmitVerifyCode,
                            isUserLoading,
                        })
                    ) : (
                        <>
                            <div className="registration-inputfields">
                                <CustomInputGroup>
                                    <span>
                                        <FaUserCircle />
                                    </span>
                                    <input
                                        type="text"
                                        id={"email"}
                                        name={"email"}
                                        value={email}
                                        placeholder="Email"
                                        onChange={onChange}
                                        aria-label="Email"
                                        autoComplete="off"
                                    />
                                </CustomInputGroup>
                                <CustomInputGroup>
                                    <span>
                                        <CgPassword />
                                    </span>
                                    <input
                                        type={passwordType}
                                        id={"password"}
                                        name={"password"}
                                        value={password}
                                        placeholder="Password"
                                        onChange={onChange}
                                        aria-label="Password"
                                        autoComplete="off"
                                    />
                                    <button type="button" onClick={handleTogglePassword}>
                                        {showPassword ? <FaEyeSlash color={eyeColor} /> : <FaEye color={eyeColor} />}
                                    </button>
                                </CustomInputGroup>
                            </div>
                            <div className={"forgot-register"}>
                                <RouterLink to={"/forgetPassword"}>
                                    <p style={{ color: "white", margin: "15px 0 0 0" }}>Forgot Password?</p>
                                </RouterLink>
                                <RouterLink to={"/register"}>
                                    <p style={{ color: "white", margin: "15px 0 0 0" }}>Register Instead?</p>
                                </RouterLink>
                            </div>

                            <div className="registration-ctas">
                                {/* <div className="registration-tandc"> */}
                                {/*    <input role="checkbox" type="checkbox" autoComplete="" /> */}
                                {/*    <div> */}
                                {/*        I agree to all statements included in */}
                                {/*        <span role="link">Terms of Use</span> */}
                                {/*    </div> */}
                                {/* </div> */}

                                {!isUserLoading ? (
                                    <ButtonGreen width={"100%"} onClick={onSubmit}>
                                        Start Hacking
                                    </ButtonGreen>
                                ) : (
                                    <LoadingButton width={"100%"}>
                                        <CircleSpinner size={20} color={"#131313"} />
                                    </LoadingButton>
                                )}
                            </div>
                        </>
                    )}
                </RegistrationFormContainer>
            </CenterCard>
        </Container>
    );
};

export default Login;
