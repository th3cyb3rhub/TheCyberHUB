import React from "react";
import {
    SocialsContainer,
    SocialsWrapper,
    SocialCardDiscord,
    SocialCardGithub,
    SocialCardTwitter,
    SocialCardYoutube,
    SocialCardTelegram,
    SocialCardInstagram,
    SocialCardLinkedin,
    SocialCardFacebook,
    SocialH1,
    SocialWrapper,
} from "./SocialsElements";
import {
    FaDiscord,
    FaFacebookF,
    FaGithub,
    FaInstagram,
    FaLinkedinIn,
    FaTelegramPlane,
    FaTwitter,
    FaYoutube,
} from "react-icons/fa";
import { H1 } from "../ContactForm/ContactFormElements";

const Socials = () => {
    return (
        <SocialWrapper>
            <SocialsContainer id="join">
                <H1>{"Community Links".toUpperCase()}</H1>
                <SocialsWrapper>
                    <SocialCardDiscord href="https://discord.gg/QHBPq6xP5p" target="_blank" aria-label="Discord">
                        <FaDiscord /> <SocialH1> Discord </SocialH1>
                    </SocialCardDiscord>

                    <SocialCardTelegram href="https://t.me/thecyberw0rld" target="_blank" aria-label="Telegram">
                        <FaTelegramPlane /> <SocialH1> Telegram </SocialH1>
                    </SocialCardTelegram>

                    <SocialCardGithub href="https://www.github.com/thecyberworld" target="_blank" aria-label="Github">
                        <FaGithub /> <SocialH1> Github </SocialH1>
                    </SocialCardGithub>

                    <SocialCardYoutube
                        href="https://www.youtube.com/c/thecyberworld"
                        target="_blank"
                        aria-label="Youtube"
                    >
                        <FaYoutube /> <SocialH1> YouTube </SocialH1>
                    </SocialCardYoutube>

                    <SocialCardTwitter
                        href="https://www.twitter.com/thecyberw0rld"
                        target="_blank"
                        aria-label="Twitter"
                    >
                        <FaTwitter /> <SocialH1> Twitter </SocialH1>
                    </SocialCardTwitter>

                    <SocialCardLinkedin
                        href="https://linkedin.com/company/thecyberw0rld"
                        target="_blank"
                        aria-label="Linkedin"
                    >
                        <FaLinkedinIn /> <SocialH1> LinkedIn </SocialH1>
                    </SocialCardLinkedin>
                    <SocialCardInstagram
                        href="https://www.instagram.com/thecyberw0rld"
                        target="_blank"
                        aria-label="Instagram"
                    >
                        <FaInstagram /> <SocialH1> Instagram </SocialH1>
                    </SocialCardInstagram>
                    <SocialCardFacebook
                        href="https://www.facebook.com/thecyberw0rld"
                        target="_blank"
                        aria-label="Facebook"
                    >
                        <FaFacebookF /> <SocialH1> Facebook </SocialH1>
                    </SocialCardFacebook>
                </SocialsWrapper>
            </SocialsContainer>
        </SocialWrapper>
    );
};

export default Socials;
