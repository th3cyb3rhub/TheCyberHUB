import React, { useEffect, useState } from "react";
import { Container } from "../components/Homepage/Registration";
import { CenterCard } from "../components/Homepage/Registration/CenterCard";
import { Learn2CodePromotion } from "../components/Homepage/Registration/Learn2CodePromotion";
import { CustomInputGroup } from "../components/Other/MixComponents/InputField/CustomInputField";
import { RegistrationFormContainer } from "../components/Homepage/Registration/Form";
import {
    GlowingButton,
    LoadingButton,
    RouterButtonGreen,
} from "../components/Other/MixComponents/Buttons/ButtonElements";
import { FaUserCircle } from "react-icons/fa";
import { AiTwotoneMail, CgPassword, SiNamecheap } from "react-icons/all";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register, reset } from "../features/auth/authSlice";
import { CircleSpinner } from "react-spinners-kit";
import { RouterLink } from "../components/Resources/Events/EventsElement";

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
        password2: "",
    });

    const { name, username, email, password, password2 } = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }
        if (isSuccess || user) {
            navigate("/dashboard");
        }
        dispatch(reset());
    }, [user, isError, isSuccess, message, navigate, dispatch]);

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
        "@protonmail.ch",
    ];

    const onSubmit = (e) => {
        e.preventDefault();
        const domain = email.split("@")[1];
        if (password !== password2) {
            toast.error("Passwords do not match");
        } else if (password.length < 8) {
            toast.error("Password must be at least 8 characters");
        } else if (domain === undefined) {
            toast.error("Please enter a valid email");
        } else if (whitelistedDomains.indexOf(domain) === -1) {
            toast.error(`Sorry, ${domain} email domain is not allowed`);
        } else {
            const userData = { name, username, email, password };
            dispatch(register(userData));
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
                    <h1 className="registration__promotion__h1">Join over 25 million learners from around the globe</h1>
                    <p className="registration__promotion__p">
                        Master Cybersecurity. This path will prepare you to build you base strong in cyber security
                    </p>
                    <div className="registration__inputfields">
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
                                <AiTwotoneMail />
                            </span>
                            <input
                                type="text"
                                id={"email"}
                                name={"email"}
                                value={email}
                                placeholder="Email"
                                onChange={onChange}
                                aria-label="Email"
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
                            />
                        </CustomInputGroup>
                        <CustomInputGroup>
                            <span>
                                <CgPassword />
                            </span>
                            <input
                                type="password"
                                id={"password2"}
                                name={"password2"}
                                value={password2}
                                placeholder="Confirm Password"
                                onChange={onChange}
                                aria-label="Confirm Password"
                            />
                        </CustomInputGroup>
                    </div>
                    <div className="registration__ctas">
                        {!isLoading ? (
                            <GlowingButton width={"100%"} type="submit">
                                Start Hacking
                            </GlowingButton>
                        ) : (
                            <LoadingButton width={"100%"}>
                                <CircleSpinner size={20} color={"#131313"} />
                            </LoadingButton>
                        )}
                        <RouterButtonGreen to={"/login"} width={"100%"}>
                            Login
                        </RouterButtonGreen>
                    </div>
                </RegistrationFormContainer>
            </CenterCard>
        </Container>
    );
};

export default Register;
