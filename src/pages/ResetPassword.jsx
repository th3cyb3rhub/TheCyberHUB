import React, { useEffect, useState } from "react";
import { CenterCard, Container } from "../components/Homepage/Registration/CenterCard";
import { Learn2CodePromotion } from "../components/Homepage/Registration/Learn2CodePromotion";
import { CustomInputGroup } from "../components/Other/MixComponents/InputField/CustomInputField";
import { RegistrationFormContainer } from "../components/Homepage/Registration/Form";
import { ButtonGreen, LoadingButton } from "../components/Other/MixComponents/Buttons/ButtonElements";
import { CgPassword } from "react-icons/all";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { reset, resetPasswordWithToken } from "../features/resetPassword/resetPasswordSlice";
import { CircleSpinner } from "react-spinners-kit";
import { RouterLink } from "../components/Resources/Events/EventsElement";

const ResetPassword = () => {
    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
    });

    const [setError, setSetError] = useState(false);
    const [isPasswordReset, setIsPasswordReset] = useState(false);

    const { password, confirmPassword } = formData;

    const { token } = useParams();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { isLoading, isError, isSuccess, message } = useSelector((state) => state.resetPassword);
    useEffect(() => {
        if (isSuccess === true) {
            setIsPasswordReset(true);
            navigate("/login");
        }
        if (isError === true) {
            setSetError(true);
        }
        if (message === "Invalid token") {
            setSetError(true);
        }
        if (isError) {
            if (message === "Request failed with status code 429") {
                toast.error("Please try again in 1 minute");
            } else toast.error(message);
        }

        return () => {
            dispatch(reset());
        };
    }, [isError, isSuccess, message, navigate, dispatch]);

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
        } else {
            dispatch(resetPasswordWithToken({ token, password }));
            setFormData({
                password: "",
                confirmPassword: "",
            });
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
                    </div>
                    <div className="registration__ctas">
                        {!isLoading ? (
                            isPasswordReset ? (
                                <p style={{ color: "white" }}>Password Reset Successful</p>
                            ) : setError ? (
                                <p style={{ color: "white" }}>Invalid Token</p>
                            ) : (
                                <ButtonGreen width={"100%"} type="submit">
                                    Save Password
                                </ButtonGreen>
                            )
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

export default ResetPassword;
