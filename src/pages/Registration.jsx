import React from "react";
import { Container } from "../components/Registration";
import { CenterCard } from "../components/Registration/CenterCard";
import { Learn2CodePromotion } from "../components/Registration/Learn2CodePromotion";
import { CustomInputGroup } from "../components/MixComponents/InputField/CustomInputField";
import { RegistrationFormContainer } from "../components/Registration/Form";
import { PrimaryFilledButton } from "../components/MixComponents/Buttons/ButtonElements";
import { FaEnvelope } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";

const Registration = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <Container>
            <CenterCard>
                <Learn2CodePromotion>
                    <div id="reg-promo-content">
                        <span className="brand-logo">Thecyberworld</span>
                        <h1 className="leading-title">Learn to Hack Interactively For Free</h1>
                        <span>Watch Demo</span>
                        <ul className="nav-links">
                            <li>Home</li>
                            <li>Tour</li>
                            <li>Courses</li>
                            <li>Articles</li>
                            <li>Blog</li>
                        </ul>
                    </div>
                </Learn2CodePromotion>
                <RegistrationFormContainer onSubmit={handleSubmit}>
                    <h1 className="registration__promotion__h1">Join over 25 million learners from around the globe</h1>
                    <p className="registration__promotion__p">
                        Master the languages of the web: HTML, CSS and Javascript. This path will prepare you to build
                        highly secure web applications.
                    </p>
                    <div className="registration__inputfields">
                        <CustomInputGroup>
                            <span>
                                <FaUserCircle />
                            </span>
                            <input type="text" placeholder="Username" aria-label="Username" autoComplete={false} />
                        </CustomInputGroup>
                        <CustomInputGroup>
                            <span>
                                <FaEnvelope />
                            </span>
                            <input type="text" placeholder="Email" aria-label="Email" autoComplete={false} />
                        </CustomInputGroup>
                        <CustomInputGroup>
                            <span>
                                <FaLock />
                            </span>
                            <input type="password" placeholder="Password" aria-label="Password" autoComplete={false} />
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
                            Start Learning Now
                        </PrimaryFilledButton>
                    </div>
                </RegistrationFormContainer>
            </CenterCard>
        </Container>
    );
};

export default Registration;
