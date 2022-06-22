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


    return (
        <>
            <IconContext.Provider value={{color: '#fff'}}>
                <Nav scrollNav={scrollNav}>
                    <NavbarContainer>
                        <NavLogo to={"/"}>Thecyberworld</NavLogo>
                        <MobileIcon onClick={toggle}>
                            <FaBars/>
                        </MobileIcon>
                        <NavMenu>
                            <NavItem>
                                <NavLinks to={"about"}>About</NavLinks>
                            </NavItem>
                            <NavItem>
                                <NavLinks to={"freeCourses"}>Free Courses</NavLinks>
                            </NavItem>
                            <NavItem>
                                <NavLinks to={"community"}>Community</NavLinks>
                            </NavItem>
                            <NavItem>
                                <NavLinks to={"services"}>Services</NavLinks>
                            </NavItem>
                            <NavItem>
                                <NavLinks to={"Testimonials"}>Testimonials</NavLinks>
                            </NavItem>

                            <NavItem>
                                <NavLinks to={"newsletters"}>Newsletters</NavLinks>
                            </NavItem>
                            <NavItem>
                                <NavLinks to={"socials"}>Socials</NavLinks>
                            </NavItem>
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


