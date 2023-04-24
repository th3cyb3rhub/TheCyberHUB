import React, { useEffect, useState } from "react";
import { EmailNotVerifiedContainer, EmailNotVerifiedText, ResendButton } from "./EmailNotVerifiedElements";
import axios from "axios";
import { getApiUrl } from "../../features/apiUrl";
// import { useUserData } from "./checkUserVerified";

const EmailNotVerified = ({ user }) => {
    if (!user) {
        return null;
    }

    const [message, setMessage] = useState("");
    const [scrollNav, setScrollNav] = useState(false);
    const [timeLeft, setTimeLeft] = useState(60);
    const [isCounting, setIsCounting] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, []);

    const userVerified = user.isVerified;

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

    const resendEmail = () => {
        setTimeLeft(60);
        setIsCounting(true);
        axios
            .post(
                getApiUrl("account/resend-verification-email"),
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

    return !isLoading && !userVerified ? (
        <EmailNotVerifiedContainer scrollNav={scrollNav}>
            <EmailNotVerifiedText>
                Email Verification link has been sent, please verify it.
                {!isCounting ? (
                    <ResendButton onClick={resendEmail}> Resend </ResendButton>
                ) : (
                    <ResendButton> Retry after {timeLeft >= 0 ? timeLeft : 0} </ResendButton>
                )}
                {message && <div style={{ color: "cornflowerblue" }}>{message}</div>}
            </EmailNotVerifiedText>
        </EmailNotVerifiedContainer>
    ) : null;
};

export default EmailNotVerified;
