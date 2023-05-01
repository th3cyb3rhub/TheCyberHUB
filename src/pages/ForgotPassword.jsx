import React, { useEffect, useState } from "react";
import { Container } from "../components/Homepage/Registration";
import { CenterCard } from "../components/Homepage/Registration/CenterCard";
import { Learn2CodePromotion } from "../components/Homepage/Registration/Learn2CodePromotion";
import { CustomInputGroup } from "../components/Other/MixComponents/InputField/CustomInputField";
import { RegistrationFormContainer } from "../components/Homepage/Registration/Form";
import { GlowingButton, LoadingButton } from "../components/Other/MixComponents/Buttons/ButtonElements";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { forgetPasswordWithEmail, reset } from "../features/resetPassword/resetPasswordSlice";
import { CircleSpinner } from "react-spinners-kit";
import { RouterLink } from "../components/Resources/Events/EventsElement";
import { FaUserCircle } from "react-icons/fa";

const ForgotPassword = () => {
    const [formData, setFormData] = useState({
        email: "",
    });

    const { email } = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { isLoading, isError, isSuccess, message } = useSelector((state) => state.resetPassword);

    const [isEmailSent, setIsEmailSent] = useState(false);

    useEffect(() => {
        if (isError) {
            if (message === "Request failed with status code 429") {
                toast.error("Please try again in 1 minute");
            } else toast.error(message);
        }

        if (isSuccess === true) {
            setIsEmailSent(true);
        }

        dispatch(reset());
    }, [isError, isSuccess, message, navigate, dispatch]);

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if (email !== "") {
            const userData = { email };
            dispatch(forgetPasswordWithEmail(userData));
        }
    };

    return (
        <Container>
            <CenterCard>
                <Learn2CodePromotion>
                    <div id="reg-promo-content">
                        <RouterLink to={"/"} className="brand-logo">
                            Thecyberhub
                        </RouterLink>
                        <h1 className="leading-title">Learn Cybersecurity For Free</h1>
                    </div>
                </Learn2CodePromotion>
                <RegistrationFormContainer onSubmit={onSubmit}>
                    <p className="registration__promotion__p">
                        Master Cybersecurity. This path will prepare you to build you base strong in cyber security
                    </p>
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
                    <div className="registration__ctas">
                        {!isLoading ? (
                            isEmailSent ? (
                                <p style={{ color: "white" }}>
                                    Password reset email sent successfully to your email address <br />
                                    {">"} {email}
                                </p>
                            ) : (
                                <GlowingButton width={"100%"} type="submit">
                                    Send Email
                                </GlowingButton>
                            )
                        ) : (
                            <LoadingButton width={"100%"} type="submit">
                                <CircleSpinner size={20} color={"#131313"} />
                            </LoadingButton>
                        )}
                    </div>
                </RegistrationFormContainer>
            </CenterCard>
        </Container>
    );
};

export default ForgotPassword;
