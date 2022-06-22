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
                            <NavLinks to={"about"}>About</NavLinks>
                        </NavItem>
                        <NavItem>
                            <NavLinks to={"freeCourses"}>Free Courses</NavLinks>
                        </NavItem>
                        <NavItem>
                            <NavLinks to={"community"}>Community</NavLinks>
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
        </>
    );
};

export default Navbar;


