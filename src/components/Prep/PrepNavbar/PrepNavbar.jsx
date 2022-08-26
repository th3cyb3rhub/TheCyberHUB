import React, {useEffect, useState} from 'react'
import {IconContext} from 'react-icons/lib';
import {animateScroll as scroll} from 'react-scroll';
import {FaBars, FaTwitter} from 'react-icons/fa';
import {
    Nav,
    NavbarContainer,
    NavLogo,
    MobileIcon,
    NavMenu,
    NavItem,
    NavLinks,
    NavLinkRouter,
    NavBtn,
    NavBtnLink,
    Text
} from "./PrepNavbarElements";
import {Button, RedirectButton} from "../../MixComponenets/Buttons/ButtonElements";
import {Link} from "react-router-dom";

const Navbar = ({toggle}) => {
    const [scrollNav, setScrollNav] = useState(false);

    const changeNav = () => {
        if (window.scrollY >= 80) {
            setScrollNav(true);
        } else {
            setScrollNav(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', changeNav);
    }, []);

    const toggleHome = () => {
        scroll.scrollToTop();
    };


    return (
        <>
            <IconContext.Provider value={{color: '#fff'}}>
                <Nav scrollNav={scrollNav}>
                    <NavbarContainer>
                        <NavLogo to={"/"} onClick={toggleHome}>
                            Thecyberworld
                        </NavLogo>
                        <MobileIcon onClick={toggle}>
                            <FaBars/>
                        </MobileIcon>
                        <NavMenu>
                            {[
                                {to: 'interviewQuestions', title: 'Interview Questions',},
                                {to: 'interviewExperiences', title: 'Interview Experiences',},
                                {to: 'quiz', title: 'Quiz',},
                                // {to: 'blogs', title: 'Blogs',},
                                {to: 'jobs', title: 'Jobs',},
                            ].map(({to, title}) => (
                                <NavItem key={to}>
                                    <NavLinks
                                        to={to}
                                        smooth={true}
                                        duration={500}
                                        spy={true}
                                        exact="true"
                                        offset={-80}
                                    >
                                        {title}
                                    </NavLinks>

                                </NavItem>
                            ))}
                        </NavMenu>
                        <NavBtn>
                            <RedirectButton
                                href={"https://twitter.com/intent/tweet?text=Hi%20Everyone,%20%0D%0AFound%20the%20best%20website%20to%20learn%20Cybersecurity%20for%20free%20by%20@thecyberw0rld%20community.%20%0D%0A%0D%0AWebsite:%20https://thecyberhub.org%20%0D%0AResources:%20https://thecyberhub.org/resources%20%0D%0A%0D%0AMore%20features%20are%20on%20the%20way...%20%0D%0Afollow%20@thecyberw0rld%20for%20getting%20updates%20and%20for%20cyber%20security%20content."}
                                rel="noopener"
                                target="_blank"
                                smooth={true}
                                duration={500}
                                spy={true}
                                exact="true"
                                offset={-80}
                            >
                                <FaTwitter/>
                                <Text>
                                    Share us
                                </Text>
                            </RedirectButton>
                        </NavBtn>
                    </NavbarContainer>
                </Nav>
            </IconContext.Provider>
        </>
    );
};

export default Navbar;


