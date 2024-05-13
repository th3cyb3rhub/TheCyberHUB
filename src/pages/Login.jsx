import React, { useEffect, useState } from "react";
import { CenterCard, Container } from "src/components/Homepage/Registration/CenterCard";
import { Learn2CodePromotion } from "src/components/Homepage/Registration/Learn2CodePromotion";
import { CustomInputGroup } from "src/components/Other/MixComponents/InputField/CustomInputField";
import { RegistrationFormContainer } from "src/components/Homepage/Registration/Form";
import { ButtonGreen, LoadingButton } from "src/components/Other/MixComponents/Buttons/ButtonElements";
import { FaUserCircle } from "react-icons/fa";
import { CgPassword } from "react-icons/cg";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, userReset } from "src/features/auth/authSlice";
import { CircleSpinner } from "react-spinners-kit";
import { RouterLink } from "src/components/Tools/ToolsElements";

const Login = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const { username, password } = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isUserLoading, isUserError, isUserSuccess, userMessage } = useSelector((state) => state.auth);
    useEffect(() => {
        if (isUserSuccess || user) {
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

        if (username !== "" && password !== "") {
            const userData = {
                username,
                password,
            };
            dispatch(login(userData));
        }
    };

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
                <RegistrationFormContainer onSubmit={onSubmit}>
                    <h1 className="registration-promotion-h1">Join over 25 million learners from around the globe</h1>
                    <p className="registration-promotion-p">
                        Master Cybersecurity. This path will prepare you to build you base strong in cyber security
                    </p>
                    <div className="registration-inputfields">
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
                                type="password"
                                id={"password"}
                                name={"password"}
                                value={password}
                                placeholder="Password"
                                onChange={onChange}
                                aria-label="Password"
                                autoComplete="off"
                            />
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
                </RegistrationFormContainer>
            </CenterCard>
        </Container>
    );
};

export default Login;
