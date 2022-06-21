import React from 'react';
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
    return (
        <>
            <Nav>
                <NavbarContainer>
                    <NavLogo to={"/"}>Thecyberworld</NavLogo>
                    <MobileIcon onClick={toggle}>
                        <FaBars/>
                    </MobileIcon>
                    <NavMenu>
                        <NavItem>
                            <NavLinks to={"about"} onClick={toggle} >About</NavLinks>
                        </NavItem>
                        <NavItem>
                            <NavLinks to={"freeCourses"} onClick={toggle} >Free Courses</NavLinks>
                        </NavItem>
                        <NavItem>
                            <NavLinks to={"newsletters"} onClick={toggle} >Newsletters</NavLinks>
                        </NavItem>
                        <NavItem>
                            <NavLinks to={"community"} onClick={toggle} >Community</NavLinks>
                        </NavItem>
                        <NavItem>
                            <NavLinks to={"joinUs"} onClick={toggle} >Join Us</NavLinks>
                        </NavItem>
                        <NavItem>
                            <NavLinks to={"socials"} onClick={toggle} >Socials</NavLinks>
                        </NavItem>
                    </NavMenu>

                    <NavBtn>
                        <NavBtnLink to={"/subscribe"} onClick={toggle} >Subscribe</NavBtnLink>
                    </NavBtn>
                </NavbarContainer>
            </Nav>
        </>
    );
};

export default Navbar;


