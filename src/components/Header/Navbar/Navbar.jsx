import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled, { keyframes } from "styled-components";
import {
    FaShieldAlt,
    FaUserCircle,
    FaBars,
    FaTimes,
    FaSearch,
    FaUserAstronaut,
    FaChevronDown,
    FaBell,
    FaRegBookmark,
} from "react-icons/fa";
import { MdDashboard, MdSettings, MdOutlineNightlight } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";
import { BiLogOut } from "react-icons/bi";
import { IoMdLogIn } from "react-icons/io";
import { logout, userReset } from "src/features/auth/authSlice.js";

// Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulseAnimation = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(255, 106, 0, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(255, 106, 0, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(255, 106, 0, 0);
  }
`;

// Styled Components
const HeaderContainer = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    background: ${({ scrolled }) => (scrolled ? "#0a0a0a" : "rgba(10, 10, 10, 0.9)")};
    backdrop-filter: blur(8px);
    box-shadow: 0 2px 10px rgba(0, 0, 0, ${({ scrolled }) => (scrolled ? "0.3" : "0.1")});
    transition: all 0.3s ease;
    height: 70px;
    display: flex;
    align-items: center;
    padding: 0 20px;

    @media (width <= 768px) {
        padding: 0 15px;
    }
`;

const NavContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    height: 100%;
`;

const LogoContainer = styled(Link)`
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #fff;
    font-weight: 700;
    font-size: 1.5rem;
    gap: 10px;
    transition: transform 0.2s ease;

    &:hover {
        transform: scale(1.03);
    }
`;

const Logo = styled.img`
    height: 40px;
    width: 40px;
    object-fit: contain;
`;

// const LogoText = styled.span`
//   background: linear-gradient(90deg, #ff6a00, #ee0979);
//   -webkit-background-clip: text;
//   -webkit-text-fill-color: transparent;
//   font-family: 'Space Mono', monospace;
//
//   @media (max-width: 576px) {
//     display: none;
//   }
// `;

const NavLinksContainer = styled.nav`
    display: flex;
    align-items: center;
    gap: 5px;

    @media (width <= 1023px) {
        display: none;
    }
`;

const NavItem = styled(NavLink)`
    color: #fff;
    text-decoration: none;
    padding: 8px 15px;
    border-radius: 6px;
    font-weight: 500;
    font-size: 0.95rem;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    gap: 6px;
    position: relative;

    &:hover {
        background: rgb(255 255 255 / 5%);
        color: #ff6a00;
    }

    &.active {
        background: rgb(255 106 0 / 10%);
        color: #ff6a00;

        &::after {
            content: "";
            position: absolute;
            bottom: 0;
            left: 15%;
            width: 70%;
            height: 3px;
            background: #ff6a00;
            border-radius: 5px 5px 0 0;
        }
    }
`;

const NavItemWithDropdown = styled.div`
    position: relative;
    display: flex;
    align-items: center;
`;

const DropdownButton = styled.button`
    color: #fff;
    background: none;
    border: none;
    padding: 8px 15px;
    border-radius: 6px;
    font-weight: 500;
    font-size: 0.95rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 6px;
    transition: all 0.2s ease;

    &:hover {
        background: rgb(255 255 255 / 5%);
        color: #ff6a00;
    }

    ${({ isOpen }) =>
        isOpen &&
        `
    background: rgba(255, 106, 0, 0.1);
    color: #ff6a00;
  `}
`;

const DropdownIcon = styled(FaChevronDown)`
    font-size: 12px;
    transition: transform 0.3s ease;
    transform: ${({ isOpen }) => (isOpen ? "rotate(180deg)" : "rotate(0)")};
`;

const DropdownMenu = styled.div`
    position: absolute;
    top: calc(100% + 5px);
    right: 0;
    width: 250px;
    background: #0f0f0f;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 5px 20px rgb(0 0 0 / 30%);
    z-index: 100;
    animation: ${fadeIn} 0.2s ease forwards;
    border: 1px solid rgb(255 255 255 / 5%);
    display: ${({ isOpen }) => (isOpen ? "block" : "none")};

    &::before {
        content: "";
        position: absolute;
        top: -5px;
        right: 20px;
        width: 10px;
        height: 10px;
        background: #0f0f0f;
        transform: rotate(45deg);
        border-top: 1px solid rgb(255 255 255 / 5%);
        border-left: 1px solid rgb(255 255 255 / 5%);
    }
`;

const ResourcesDropdown = styled(DropdownMenu)`
    width: 700px;
    display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
    flex-wrap: wrap;
    padding: 20px;
    right: auto;
    left: 50%;
    transform: translateX(-50%);

    &::before {
        right: auto;
        left: 50%;
        transform: translateX(-50%) rotate(45deg);
    }

    @media (width <= 768px) {
        width: 90vw;
    }
`;

const ResourceCategory = styled.div`
    width: 200px;
    margin: 0 15px 15px 0;
`;

const CategoryTitle = styled.h3`
    color: #ff6a00;
    font-size: 0.95rem;
    margin-bottom: 10px;
    padding-bottom: 5px;
    border-bottom: 1px solid rgb(255 255 255 / 5%);
`;

const ResourceLink = styled(Link)`
    color: #f5f5f5;
    padding: 6px 0;
    font-size: 0.9rem;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 8px;

    &:hover {
        color: #ff6a00;
    }
`;

const DropdownItem = styled(Link)`
    display: flex;
    align-items: center;
    padding: 12px 15px;
    color: #f5f5f5;
    text-decoration: none;
    font-size: 0.9rem;
    gap: 10px;
    transition: all 0.2s ease;

    &:hover {
        background: rgb(255 106 0 / 10%);
        color: #ff6a00;
    }

    svg {
        font-size: 1.1rem;
        color: #999;
    }
`;

const DropdownDivider = styled.div`
    height: 1px;
    background: rgb(255 255 255 / 5%);
    margin: 5px 0;
`;

const UserSection = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
`;

const SearchButton = styled.button`
    background: none;
    border: none;
    color: #f5f5f5;
    font-size: 1.2rem;
    cursor: pointer;
    padding: 8px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;

    &:hover {
        background: rgb(255 255 255 / 5%);
        color: #ff6a00;
    }
`;

const NotificationButton = styled(SearchButton)`
    position: relative;
`;

const NotificationBadge = styled.span`
    position: absolute;
    top: 3px;
    right: 3px;
    width: 8px;
    height: 8px;
    background: #ff6a00;
    border-radius: 50%;
    animation: ${pulseAnimation} 2s infinite;
`;

const UserButton = styled.button`
    background: none;
    border: none;
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    padding: 5px;
    border-radius: 24px;
    transition: all 0.2s ease;

    &:hover {
        background: rgb(255 255 255 / 5%);
    }
`;

const UserAvatar = styled.img`
    width: 36px;
    height: 36px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid ${({ isLoggedIn }) => (isLoggedIn ? "#ff6a00" : "transparent")};
`;

const DefaultAvatar = styled(FaUserAstronaut)`
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: #222;
    padding: 7px;
    color: #999;
`;

const UserInfo = styled.div`
    display: none;
    flex-direction: column;
    align-items: flex-start;

    @media (width >= 576px) {
        display: flex;
    }
`;

const UserName = styled.span`
    color: #fff;
    font-size: 0.9rem;
    font-weight: 500;
`;

const UserRole = styled.span`
    color: #999;
    font-size: 0.7rem;
`;

const MobileMenuButton = styled.button`
    display: none;
    background: none;
    border: none;
    color: #fff;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 5px;

    @media (width <= 1023px) {
        display: block;
    }
`;

const MobileMenu = styled.div`
    position: fixed;
    inset: 70px 0 0;
    background: #0a0a0a;
    z-index: 99;
    padding: 20px;
    transform: ${({ isOpen }) => (isOpen ? "translateX(0)" : "translateX(100%)")};
    transition: transform 0.3s ease;
    overflow-y: auto;
`;

const MobileNavItem = styled(NavLink)`
    display: flex;
    align-items: center;
    gap: 10px;
    color: #fff;
    text-decoration: none;
    padding: 12px 15px;
    border-radius: 6px;
    font-weight: 500;
    margin-bottom: 5px;

    &:hover,
    &.active {
        background: rgb(255 106 0 / 10%);
        color: #ff6a00;
    }

    svg {
        font-size: 1.2rem;
    }
`;

const MobileDropdownButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    color: #fff;
    background: none;
    border: none;
    padding: 12px 15px;
    border-radius: 6px;
    font-weight: 500;
    font-size: 1rem;
    text-align: left;
    cursor: pointer;

    &:hover {
        background: rgb(255 255 255 / 5%);
    }

    div {
        display: flex;
        align-items: center;
        gap: 10px;
    }
`;

const MobileDropdownContent = styled.div`
    padding-left: 20px;
    margin-bottom: 10px;
    display: ${({ isOpen }) => (isOpen ? "block" : "none")};
    animation: ${fadeIn} 0.2s ease forwards;
`;

const MobileNavDivider = styled.div`
    height: 1px;
    background: rgb(255 255 255 / 5%);
    margin: 15px 0;
`;

const MobileUserInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 15px;
    margin: -20px -20px 20px;
    background: rgb(255 255 255 / 2%);
    border-bottom: 1px solid rgb(255 255 255 / 5%);
`;

const MobileUserAvatar = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid #ff6a00;
`;

const MobileUserDetails = styled.div`
    display: flex;
    flex-direction: column;
`;

const MobileUserName = styled.span`
    color: #fff;
    font-weight: 600;
    font-size: 1rem;
`;

const MobileUserEmail = styled.span`
    color: #999;
    font-size: 0.8rem;
`;

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [resourcesMenuOpen, setResourcesMenuOpen] = useState(false);
    const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);
    const [mobileUserOptionsOpen, setMobileUserOptionsOpen] = useState(false);

    const userMenuRef = useRef(null);
    const resourcesMenuRef = useRef(null);

    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Get user from Redux store
    const { user } = useSelector((state) => state.auth);

    // Handle scroll event to change navbar appearance
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                setUserMenuOpen(false);
            }
            if (resourcesMenuRef.current && !resourcesMenuRef.current.contains(event.target)) {
                setResourcesMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [location]);

    // Logout function
    const handleLogout = () => {
        dispatch(logout());
        dispatch(userReset());
        setUserMenuOpen(false);
        navigate("/");
    };

    // Resource categories
    const resourceCategories = [
        {
            title: "Learning",
            items: [
                { label: "Roadmaps", path: "/roadmaps", icon: <FaShieldAlt /> },
                { label: "Methodology", path: "/resources/methodology", icon: <FaShieldAlt /> },
                { label: "Quiz", path: "/quiz", icon: <FaShieldAlt /> },
            ],
        },
        {
            title: "Tools",
            items: [
                { label: "Cheatsheets", path: "/resources/cheatsheets", icon: <FaShieldAlt /> },
                { label: "Hacklists", path: "/resources/hacklist", icon: <FaShieldAlt /> },
                { label: "Tools", path: "/tools", icon: <FaShieldAlt /> },
            ],
        },
        {
            title: "Testing",
            items: [
                { label: "Checklist", path: "/resources/checklist", icon: <FaShieldAlt /> },
                { label: "Wordlists", path: "/resources/wordlist", icon: <FaShieldAlt /> },
                { label: "Payloads", path: "/resources/payloads", icon: <FaShieldAlt /> },
            ],
        },
    ];

    return (
        <HeaderContainer scrolled={scrolled}>
            <NavContainer>
                {/* Logo */}
                <LogoContainer to="/">
                    <Logo src="/src/assets/images/TheCyberHUB_logo_outlined.png" alt="TheCyberHUB" />
                </LogoContainer>

                {/* Desktop Navigation */}
                <NavLinksContainer>
                    <NavItem to="/explore">Explore</NavItem>
                    <NavItem to="/feeds">Feeds</NavItem>
                    <NavItem to="/blogs">Blogs</NavItem>
                    <NavItem to="/aiChat">AI Assistant</NavItem>
                    <NavItem to="/websecurity">Web Security</NavItem>

                    {/* Resources Dropdown */}
                    <NavItemWithDropdown ref={resourcesMenuRef}>
                        <DropdownButton
                            onClick={() => setResourcesMenuOpen(!resourcesMenuOpen)}
                            isOpen={resourcesMenuOpen}
                        >
                            Resources <DropdownIcon isOpen={resourcesMenuOpen} />
                        </DropdownButton>

                        <ResourcesDropdown isOpen={resourcesMenuOpen}>
                            {resourceCategories.map((category, idx) => (
                                <ResourceCategory key={idx}>
                                    <CategoryTitle>{category.title}</CategoryTitle>
                                    {category.items.map((item, index) => (
                                        <ResourceLink
                                            key={index}
                                            to={item.path}
                                            onClick={() => setResourcesMenuOpen(false)}
                                        >
                                            {item.icon} {item.label}
                                        </ResourceLink>
                                    ))}
                                </ResourceCategory>
                            ))}

                            <ResourceCategory>
                                <CategoryTitle>Community</CategoryTitle>
                                <ResourceLink to="/community" onClick={() => setResourcesMenuOpen(false)}>
                                    <FaUserCircle /> Join Community
                                </ResourceLink>
                                <ResourceLink to="/interviewQuestions" onClick={() => setResourcesMenuOpen(false)}>
                                    <FaShieldAlt /> Interview Questions
                                </ResourceLink>
                            </ResourceCategory>
                        </ResourcesDropdown>
                    </NavItemWithDropdown>

                    <NavItem to="/community-events">Events</NavItem>
                    <NavItem to="/opensec-projects">Projects</NavItem>
                </NavLinksContainer>

                {/* User Section */}
                <UserSection>
                    <SearchButton aria-label="Search">
                        <FaSearch />
                    </SearchButton>

                    {user && (
                        <NotificationButton aria-label="Notifications">
                            <FaBell />
                            <NotificationBadge />
                        </NotificationButton>
                    )}

                    <div ref={userMenuRef}>
                        <UserButton onClick={() => setUserMenuOpen(!userMenuOpen)}>
                            {user?.avatar ? (
                                <UserAvatar src={`/user/${user.avatar}`} alt={user.username} isLoggedIn={true} />
                            ) : (
                                <DefaultAvatar />
                            )}

                            {user && (
                                <UserInfo>
                                    <UserName>{user.username}</UserName>
                                    <UserRole>{user.role === "admin" ? "Administrator" : "Member"}</UserRole>
                                </UserInfo>
                            )}
                        </UserButton>

                        <DropdownMenu isOpen={userMenuOpen}>
                            {user ? (
                                <>
                                    <DropdownItem to={`/user/${user.username}`}>
                                        <FaUserCircle /> My Profile
                                    </DropdownItem>
                                    <DropdownItem to="/dashboard">
                                        <MdDashboard /> Dashboard
                                    </DropdownItem>
                                    {(user.role === "admin" || user.role === "team") && (
                                        <DropdownItem to="/admin-dashboard">
                                            <RiAdminFill /> Admin Dashboard
                                        </DropdownItem>
                                    )}
                                    <DropdownItem to="/saved">
                                        <FaRegBookmark /> Saved Items
                                    </DropdownItem>
                                    <DropdownDivider />
                                    <DropdownItem to="/settings">
                                        <MdSettings /> Settings
                                    </DropdownItem>
                                    <DropdownItem as="button" onClick={handleLogout}>
                                        <BiLogOut /> Logout
                                    </DropdownItem>
                                </>
                            ) : (
                                <>
                                    <DropdownItem to="/login">
                                        <IoMdLogIn /> Login
                                    </DropdownItem>
                                    <DropdownItem to="/register">
                                        <FaUserCircle /> Create Account
                                    </DropdownItem>
                                </>
                            )}
                        </DropdownMenu>
                    </div>

                    {/* Mobile Menu Button */}
                    <MobileMenuButton onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        {mobileMenuOpen ? <FaTimes /> : <FaBars />}
                    </MobileMenuButton>
                </UserSection>

                {/* Mobile Menu */}
                <MobileMenu isOpen={mobileMenuOpen}>
                    {user && (
                        <MobileUserInfo>
                            {user.avatar ? (
                                <MobileUserAvatar src={`/user/${user.avatar}`} alt={user.username} />
                            ) : (
                                <DefaultAvatar />
                            )}
                            <MobileUserDetails>
                                <MobileUserName>{user.username}</MobileUserName>
                                <MobileUserEmail>{user.email}</MobileUserEmail>
                            </MobileUserDetails>
                        </MobileUserInfo>
                    )}

                    <MobileNavItem to="/explore">
                        <FaSearch /> Explore
                    </MobileNavItem>
                    <MobileNavItem to="/feeds">
                        <FaShieldAlt /> Feeds
                    </MobileNavItem>
                    <MobileNavItem to="/blogs">
                        <FaShieldAlt /> Blogs
                    </MobileNavItem>
                    <MobileNavItem to="/aiChat">
                        <FaShieldAlt /> AI Assistant
                    </MobileNavItem>
                    <MobileNavItem to="/websecurity">
                        <FaShieldAlt /> Web Security
                    </MobileNavItem>

                    {/* Mobile Resources Dropdown */}
                    <MobileDropdownButton onClick={() => setMobileResourcesOpen(!mobileResourcesOpen)}>
                        <div>
                            <FaShieldAlt /> Resources
                        </div>
                        <DropdownIcon isOpen={mobileResourcesOpen} />
                    </MobileDropdownButton>

                    <MobileDropdownContent isOpen={mobileResourcesOpen}>
                        {resourceCategories.flatMap((category) =>
                            category.items.map((item, index) => (
                                <MobileNavItem key={index} to={item.path}>
                                    {item.icon} {item.label}
                                </MobileNavItem>
                            )),
                        )}
                        <MobileNavItem to="/community">
                            <FaUserCircle /> Join Community
                        </MobileNavItem>
                        <MobileNavItem to="/interviewQuestions">
                            <FaShieldAlt /> Interview Questions
                        </MobileNavItem>
                    </MobileDropdownContent>

                    <MobileNavItem to="/community-events">
                        <FaShieldAlt /> Events
                    </MobileNavItem>
                    <MobileNavItem to="/opensec-projects">
                        <FaShieldAlt /> Projects
                    </MobileNavItem>

                    <MobileNavDivider />

                    {/* Mobile User Options */}
                    {user ? (
                        <>
                            <MobileDropdownButton onClick={() => setMobileUserOptionsOpen(!mobileUserOptionsOpen)}>
                                <div>
                                    <FaUserCircle /> Account
                                </div>
                                <DropdownIcon isOpen={mobileUserOptionsOpen} />
                            </MobileDropdownButton>

                            <MobileDropdownContent isOpen={mobileUserOptionsOpen}>
                                <MobileNavItem to={`/user/${user.username}`}>
                                    <FaUserCircle /> My Profile
                                </MobileNavItem>
                                <MobileNavItem to="/dashboard">
                                    <MdDashboard /> Dashboard
                                </MobileNavItem>
                                {(user.role === "admin" || user.role === "team") && (
                                    <MobileNavItem to="/admin-dashboard">
                                        <RiAdminFill /> Admin Dashboard
                                    </MobileNavItem>
                                )}
                                <MobileNavItem to="/saved">
                                    <FaRegBookmark /> Saved Items
                                </MobileNavItem>
                                <MobileNavItem to="/settings">
                                    <MdSettings /> Settings
                                </MobileNavItem>
                                <MobileNavItem as="button" onClick={handleLogout}>
                                    <BiLogOut /> Logout
                                </MobileNavItem>
                            </MobileDropdownContent>
                        </>
                    ) : (
                        <>
                            <MobileNavItem to="/login">
                                <IoMdLogIn /> Login
                            </MobileNavItem>
                            <MobileNavItem to="/register">
                                <FaUserCircle /> Create Account
                            </MobileNavItem>
                        </>
                    )}

                    <MobileNavItem to="#">
                        <MdOutlineNightlight /> Dark Mode
                    </MobileNavItem>
                </MobileMenu>
            </NavContainer>
        </HeaderContainer>
    );
};

export default Navbar;
