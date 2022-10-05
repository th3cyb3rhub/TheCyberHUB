import React from 'react';
import {SocialsContainer, SocialsH1, SocialsWrapper, SocialsCard, SocialIconDiscord, SocialIconGithub, SocialIconTwitter, SocialIconYoutube, SocialIconTelegram, SocialIconInstagram, SocialIconLinkedin, SocialIconFacebook,} from './SocialsElements'
import {FaDiscord, FaFacebookF, FaGithub, FaInstagram, FaLinkedinIn, FaTelegramPlane, FaTwitter, FaYoutube} from "react-icons/fa";

const Socials = () => {
    return (
        <SocialsContainer id="join">
            <SocialsH1>Join</SocialsH1>
            <SocialsWrapper>
                <SocialsCard>
                    <SocialIconDiscord href="https://discord.gg/QHBPq6xP5p" target="_blank" aria-label="Discord">
                            <FaDiscord/>
                    </SocialIconDiscord>
                </SocialsCard>
                <SocialsCard>
                    <SocialIconGithub href="https://www.github.com/thecyberworld" target="_blank" aria-label="Github">
                        <FaGithub/>
                    </SocialIconGithub>
                </SocialsCard>
                <SocialsCard>
                    <SocialIconTwitter href="https://www.twitter.com/thecyberw0rld" target="_blank" aria-label="Twitter">
                        <FaTwitter/>
                    </SocialIconTwitter>
                </SocialsCard>
                <SocialsCard>
                    <SocialIconYoutube href="https://www.youtube.com/c/thecyberworld" target="_blank" aria-label="Youtube">
                        <FaYoutube/>
                    </SocialIconYoutube>
                </SocialsCard>
                <SocialsCard>
                    <SocialIconTelegram href="https://t.me/thecyberw0rld" target="_blank" aria-label="Telegram">
                        <FaTelegramPlane/>
                    </SocialIconTelegram>
                </SocialsCard>
                <SocialsCard>
                    <SocialIconLinkedin href="https://linkedin.com/company/thecyberworld" target="_blank" aria-label="Linkedin">
                        <FaLinkedinIn/>
                    </SocialIconLinkedin>
                </SocialsCard>
                <SocialsCard>
                    <SocialIconInstagram href="https://www.instagram.com/thecyberw0rld" target="_blank" aria-label="Instagram">
                        <FaInstagram/>
                    </SocialIconInstagram>
                </SocialsCard>
                <SocialsCard>
                    <SocialIconFacebook href="https://www.facebook.com/thecyberw0rld" target="_blank" aria-label="Facebook">
                        <FaFacebookF/>
                    </SocialIconFacebook>
                </SocialsCard>
            </SocialsWrapper>
        </SocialsContainer>
    );
};

export default Socials;
