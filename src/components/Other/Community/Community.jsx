import React from "react";
import {
    CommunitySection,
    CommunityContainer,
    CommunityHeading,
    CommunityParagraph,
    // DiscordLink,
    // DiscordButtonIcon,
    // DiscordButton,
} from "./CommunityElements";
import Socials from "../../Homepage/Socials/Socials";

const Community = () => {
    return (
        <CommunitySection>
            <CommunityContainer>
                <CommunityHeading>Empowering the Next Generation of Cybersecurity Experts</CommunityHeading>
                <CommunityParagraph>
                    Welcome to TheCyberHUB, the ultimate destination for hackers, cybersecurity enthusiasts, and IT
                    professionals. Our platform is designed to empower you with a wide range of free resources,
                    including engaging Capture The Flag (CTF) challenges, comprehensive courses, insightful blogs,
                    interactive forums, and so much more.
                </CommunityParagraph>
                <CommunityParagraph>
                    Join our vibrant community of passionate hackers, where you can learn, share knowledge, and
                    collaborate with like-minded individuals. Whether you&apos;re just starting your cybersecurity
                    journey or looking to expand your skills, TheCyberHUB provides the tools and support you need to
                    succeed.
                </CommunityParagraph>

                <Socials />
            </CommunityContainer>
        </CommunitySection>
    );
};

export default Community;
