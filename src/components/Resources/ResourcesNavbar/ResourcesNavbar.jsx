import React, {useEffect, useState} from 'react'
import {IconContext} from 'react-icons/lib';
import {animateScroll as scroll} from 'react-scroll';
import {FaBars} from 'react-icons/fa';
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
    NavBtnLink
} from "./NavbarElements";
import {Button} from "../../Buttons/ButtonElements";
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
                                {to: 'about', title: 'Home',},
                                {to: 'resources', title: 'Courses',},
                                {to: 'writeups', title: 'WriteUps',},
                                {to: 'contribute', title: 'Events',},
                                {to: 'cybernews', title: 'Cyber News',},
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
                            <NavLinkRouter
                                href={"https://blog.thecyberhub.org/"}
                                target={"_blank"}
                            >
                                Blog
                            </NavLinkRouter>
                        </NavMenu>
                        <NavBtn>
                            <Button
                                to={"join"}
                                smooth={true}
                                duration={500}
                                spy={true}
                                exact="true"
                                offset={-80}
                            >
                                Join us
                            </Button>
                        </NavBtn>
                    </NavbarContainer>
                </Nav>
            </IconContext.Provider>
        </>
    );
};

export default Navbar;


