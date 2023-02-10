import React, { useEffect, useState } from "react";
import { EmailNotVerifiedContainer, EmailNotVerifiedText, ResendButton } from "./EmailNotVerifiedElements";
import axios from "axios";

const EmailNotVerified = ({ user }) => {
    if (!user) {
        return null;
    }

    const [message, setMessage] = useState("");
    const [scrollNav, setScrollNav] = useState(false);
    const [timeLeft, setTimeLeft] = useState(60);
    const [isCounting, setIsCounting] = useState(false);
    const [userData, setUserData] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, []);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/user`, {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });

                setUserData(response.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchUserData();
    }, [user.token]);

    useEffect(() => {
        let intervalId = null;
        if (isCounting) {
            intervalId = setInterval(() => {
                setTimeLeft((timeLeft) => {
                    if (timeLeft <= 0) {
                        clearInterval(intervalId);
                        setIsCounting(false);
                        return 0;
                    }
                    return timeLeft - 1;
                });
            }, 1000);
        }
        return () => clearInterval(intervalId);
    }, [isCounting]);

    let APIURL = "http://localhost:5000";
    if (import.meta.env.VITE_API_URL === "production") {
        APIURL = import.meta.env.VITE_API_URL;
    } else APIURL = "http://localhost:5000";

    const resendEmail = () => {
        setTimeLeft(60);
        setIsCounting(true);
        axios
            .post(
                `${APIURL}/account/resend-verification-email`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                },
            )
            .then((res) => {
                setMessage(res.data.message);
            })
            .catch((error) => {
                setMessage(error.response.data.message);
            });
    };

    const changeNav = () => {
        if (window.scrollY >= 80) {
            setScrollNav(true);
        } else {
            setScrollNav(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", changeNav);
        return () => window.removeEventListener("scroll", changeNav);
    }, []);

    return (
        <EmailNotVerifiedContainer scrollNav={scrollNav}>
            {!isLoading && !userData.isVerified ? (
                <EmailNotVerifiedText>
                    Email Verification link has been sent, please verify it.
                    {!isCounting ? (
                        <ResendButton onClick={resendEmail}> Resend </ResendButton>
                    ) : (
                        <ResendButton> Retry after {timeLeft >= 0 ? timeLeft : 0} </ResendButton>
                    )}
                    {message && <div style={{ color: "cornflowerblue" }}>{message}</div>}
                </EmailNotVerifiedText>
            ) : (
                <></>
            )}
        </EmailNotVerifiedContainer>
    );
};

export default EmailNotVerified;
