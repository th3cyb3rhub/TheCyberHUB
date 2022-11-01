/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import "./navbar.css";
import Dropdown from "../Dropdowns/Dropdown.jsx";
import { FaBars, FaTimes } from "react-icons/fa";

import logo from "../../../assets/images/WebsiteLogo/ThecyberhubLogo.png";

const Navlinks = ({ link, title, children }) => {
    const [open, setOpen] = useState(false);

    const handleClick = (e) => {
        if (window.innerHeight < 875) {
            e.target.classList.toggle("higher-zindex");
        }
        setOpen((currState) => !currState);
    };

    const handleMouseEnter = (e) => {
        if (window.innerWidth < 875) return;

        const val = document.querySelector(".higher-zindex");
        if (val) {
            val.classList.remove("higher-zindex");
        }
        e.target.classList.add("higher-zindex");
        setOpen(true);
    };

    return (
        <>
            <li>
                {link && (
                    <NavLink className="nav-links" to={`${link}`} end>
                        {title}
                    </NavLink>
                )}

                {!link && (
                    <p className="nav-links" onClick={handleClick} onMouseEnter={handleMouseEnter}>
                        {title}
                    </p>
                )}

                {open && children}
            </li>
        </>
    );
};

const Navbars = () => {
    const [navOpen, setNavOpen] = useState(false);

    const handleMobileNavBtn = () => {
        setNavOpen((currState) => !currState);
    };

    const handleMobileNavWrapper = () => {
        return navOpen ? "nav-links-wrapper nav-links-wrapper-transform" : "nav-links-wrapper";
    };

    return (
        <>
            <nav className="nav">
                <div className="logoWrapper">
                    <Link to={`/`}>
                        <img src={logo} alt="logo" />
                    </Link>
                </div>
                <div className={handleMobileNavWrapper()}>
                    <ul>
                        <Navlinks title={"Learn"}>
                            <div className="nav-link-child">
                                <Dropdown link={"learn"} handleMobileNavBtn={handleMobileNavBtn} />
                            </div>
                        </Navlinks>
                        <Navlinks title={"Resources"}>
                            <div className="nav-link-child">
                                <Dropdown link={"resources"} handleMobileNavBtn={handleMobileNavBtn} />
                            </div>
                        </Navlinks>
                        <Navlinks link={"events"} title={"Events"} />
                        <Navlinks link={"projects"} title={"Projects"} />
                        <Navlinks link={"community"} title={"Community"} />
                    </ul>
                    <div className="social-links-wrapper">
                        <a href="https://discord.com/invite/QHBPq6xP5p" target="_blank" rel="noreferrer">
                            Join Community
                        </a>
                    </div>
                    <div className="mobile-close-btn-wrapper" onClick={handleMobileNavBtn}>
                        <FaTimes />
                    </div>
                </div>
                <div className="mobile-fabars" onClick={handleMobileNavBtn}>
                    <FaBars />
                </div>
                <div className="nav-other-links">
                    <ul>
                        <li>
                            <Link className="cyber-games-links" to={`/CyberGames`}>
                                Cyber Games
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
};

export default Navbars;
