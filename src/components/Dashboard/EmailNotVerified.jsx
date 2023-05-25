import React, { useEffect, useState } from "react";
import { EmailNotVerifiedContainer, EmailNotVerifiedText, ResendButton } from "./EmailNotVerifiedElements";
import axios from "axios";
import { getApiUrl } from "../../features/apiUrl";
import { useUserData } from "./checkUserVerified";
import apiStatus from "../../features/apiStatus";

const EmailNotVerified = ({ user }) => {
    const { isApiLoading, isApiWorking } = apiStatus();

    const [message, setMessage] = useState("");
    const [scrollNav, setScrollNav] = useState(false);
    const [timeLeft, setTimeLeft] = useState(60);
    const [isCounting, setIsCounting] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
        }, 5000);
    }, []);

    const userVerified = useUserData({ user }).isVerified;

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

    if (useUserData({ user }) === "Network Error") return null;

    if (isApiLoading || isLoading) return null;

    if (!user || !isApiWorking) {
        return null;
    }

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
