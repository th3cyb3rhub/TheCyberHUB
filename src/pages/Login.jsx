import React, { useState, useEffect } from "react";
import { Container } from "../components/Homepage/Registration";
import { CenterCard } from "../components/Homepage/Registration/CenterCard";
import { Learn2CodePromotion } from "../components/Homepage/Registration/Learn2CodePromotion";
import { CustomInputGroup } from "../components/MixComponents/InputField/CustomInputField";
import { RegistrationFormContainer } from "../components/Homepage/Registration/Form";
import { PrimaryFilledButton } from "../components/MixComponents/Buttons/ButtonElements";
// import { FaEnvelope } from "react-icons/fa";
// import { FaLock } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { BsCardText } from "react-icons/all";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "../features/auth/authSlice";
import Loader from "../components/MixComponents/Spinner/Loader";

const Login = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const { username, password } = formData;

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
    const onSubmit = (e) => {
        e.preventDefault();
        const userData = {
            username,
            password,
        };
        dispatch(login(userData));
    };

    if (isLoading) {
        return <Loader />;
    }
    return (
        <Container>
            <CenterCard>
                <Learn2CodePromotion>
                    <div id="reg-promo-content">
                        <span className="brand-logo">Thecyberworld</span>
                        <h1 className="leading-title">Learn Cybersecurity For Free</h1>
                        {/* <span>Watch Demo</span> */}
                        <ul className="nav-links">
                            <li>Home</li>
                            <li>Tour</li>
                            <li>Courses</li>
                            <li>Articles</li>
                            <li>Blog</li>
                        </ul>
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
                                autoComplete={false}
                            />
                        </CustomInputGroup>
                        <CustomInputGroup>
                            <span>
                                <BsCardText />
                            </span>
                            <input
                                type="password"
                                id={"password"}
                                name={"password"}
                                value={password}
                                placeholder="Password"
                                onChange={onChange}
                                aria-label="Password"
                                autoComplete={false}
                            />
                        </CustomInputGroup>
                    </div>
                    <div className="registration__ctas">
                        <div className="registration__tandc">
                            <input role="checkbox" type="checkbox" autoComplete="" />
                            <div>
                                I agree to all statements included in
                                <span role="link">Terms of Use</span>
                            </div>
                        </div>
                        <PrimaryFilledButton width={"100%"} type="submit">
                            Start Hacking
                        </PrimaryFilledButton>
                    </div>
                </RegistrationFormContainer>
            </CenterCard>
        </Container>
    );
};

export default Login;
