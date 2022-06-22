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
    NavBtn,
    NavBtnLink
} from "./NavbarElements";

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
                                {to: 'about', title: 'About',},
                                {to: 'community', title: 'Community',},
                                {to: 'courses', title: 'Courses',},
                                {to: 'services', title: 'Services',},
                                {to: 'Testimonials', title: 'Testimonials',},
                                {to: 'Newsletter', title: 'Newsletter',},
                                {to: 'join', title: 'Join',},
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
                            <NavBtnLink to={"/subscribe"} onClick={toggle}>Subscribe</NavBtnLink>
                        </NavBtn>
                    </NavbarContainer>
                </Nav>
            </IconContext.Provider>
        </>
    );
};

export default Navbar;


