import React from 'react';
import {
    SocialsContainer,
    SocialsH1,
    SocialsWrapper,
    SocialsCard,
    SocialIconDiscord,
    SocialIconGithub,
    SocialIconTwitter,
    SocialIconYoutube,
    SocialIconTelegram,
    SocialIconInstagram,
    SocialIconLinkedin,
    SocialIconFacebook,
} from './SocialsElements'

import {
    FaDiscord,
    FaFacebookF,
    FaGithub,
    FaInstagram,
    FaLinkedinIn,
    FaTelegramPlane,
    FaTwitter, FaYoutube
} from "react-icons/fa";

const Socials = () => {
    return (
        <SocialsContainer id="join">
            <SocialsH1>Join</SocialsH1>
            <SocialsWrapper>
                <SocialsCard>
                    <SocialIconDiscord href="https://www.twitter.com/thecyberw0rld" target="_blank" aria-label="Twitter">
                            <FaDiscord/>
                    </SocialIconDiscord>
                </SocialsCard>
                <SocialsCard>
                    <SocialIconGithub href="https://www.twitter.com/thecyberw0rld" target="_blank" aria-label="Twitter">
                        <FaGithub/>
                    </SocialIconGithub>
                </SocialsCard>
                <SocialsCard>
                    <SocialIconTwitter href="https://www.twitter.com/thecyberw0rld" target="_blank" aria-label="Twitter">
                        <FaTwitter/>
                    </SocialIconTwitter>
                </SocialsCard>
                <SocialsCard>
                    <SocialIconYoutube href="https://www.twitter.com/thecyberw0rld" target="_blank" aria-label="Twitter">
                        <FaYoutube/>
                    </SocialIconYoutube>
                </SocialsCard>
                <SocialsCard>
                    <SocialIconTelegram href="https://www.twitter.com/thecyberw0rld" target="_blank" aria-label="Twitter">
                        <FaTelegramPlane/>
                    </SocialIconTelegram>
                </SocialsCard>
                <SocialsCard>
                    <SocialIconInstagram href="https://www.twitter.com/thecyberw0rld" target="_blank" aria-label="Twitter">
                        <FaInstagram/>
                    </SocialIconInstagram>
                </SocialsCard>

                <SocialsCard>
                    <SocialIconLinkedin href="https://www.twitter.com/thecyberw0rld" target="_blank" aria-label="Twitter">
                        <FaLinkedinIn/>
                    </SocialIconLinkedin>
                </SocialsCard>

                <SocialsCard>
                    <SocialIconFacebook href="https://www.twitter.com/thecyberw0rld" target="_blank" aria-label="Twitter">
                        <FaFacebookF/>
                    </SocialIconFacebook>
                </SocialsCard>

            </SocialsWrapper>
        </SocialsContainer>
    );
};

export default Socials;
