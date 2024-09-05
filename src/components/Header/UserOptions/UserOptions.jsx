import React, { useRef, useState } from "react";
import "./UserOptions.css";

import { FaUserAstronaut, FaUserCircle } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { IoMdLogIn } from "react-icons/io";
import { MdDashboard } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";

import { useDispatch, useSelector } from "react-redux";
import { RouterLink, UserOptionsContainer, UserOptionsDropdownContainer } from "./UserOptionsElements";
import { logout, userReset } from "src/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { cdnContentImagesUrl } from "src/features/apiUrl";
import { CiSettingsIcon } from "src/components/Dashboard/DashbaordSidebar/DashbaordSidebarElements";

const NavItem = (props) => {
    const [open, setOpen] = useState(false);
    const userRef = useRef(null);
    const handleClose = (e) => {
        if (userRef.current && !userRef.current?.contains(e.target)) {
            setOpen(false);
        }
    };

    window.addEventListener("scroll", () => setOpen(false));
    window.addEventListener("click", handleClose);

    return (
        <div ref={userRef} className={"nav-item"}>
            <span className={"icon-button"} onClick={() => setOpen(!open)} onMouseEnter={() => setOpen(true)}>
                {props.text} {props.icon}
            </span>

            {open && props.children}
        </div>
    );
};

const DropdownMenu = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const inDevelopment = true;
    const { user } = useSelector((state) => state.auth);

    const onLogout = () => {
        dispatch(logout());
        dispatch(userReset());
        navigate("/");
    };

    const DropdownItem = (props) => {
        return (
            <RouterLink to={props.to} onClick={props.onClickLogout} className={"menu-item"}>
                <span className={"icon-button"}>{props.leftIcon}</span>
                {props.children}
                <span className={"icon-right"}>{props.rightIcon}</span>
            </RouterLink>
        );
    };
    return (
        <UserOptionsDropdownContainer className={"dropdown"}>
            <div className={"menu"}>
                {!user ? (
                    <>
                        <DropdownItem to={"/login"} leftIcon={<IoMdLogIn />}>
                            Login
                        </DropdownItem>
                        <DropdownItem to={"/register"} leftIcon={<IoMdLogIn />}>
                            Register
                        </DropdownItem>
                    </>
                ) : (
                    <>
                        <DropdownItem to={`/user/${user?.username}`} leftIcon={<FaUserCircle />}>
                            Public Profile
                        </DropdownItem>
                        {(user?.userType === "admin" || user?.userType === "team") && (
                            <DropdownItem to={"/admin-dashboard"} leftIcon={<RiAdminFill />}>
                                Admin Dashboard
                            </DropdownItem>
                        )}
                        <DropdownItem to={"/dashboard"} leftIcon={<MdDashboard />}>
                            Dashboard
                        </DropdownItem>
                        <DropdownItem to={`/settings`} leftIcon={<CiSettingsIcon />}>
                            Settings
                        </DropdownItem>
                        {/* {!inDevelopment ? ( */}
                        {/* ) : null} */}
                        {/* <DropdownItem to={"/settings"} leftIcon={<FcSettings />}> */}
                        {/*    Settings */}
                        {/* </DropdownItem> */}
                        <DropdownItem onClickLogout={onLogout} leftIcon={<BiLogOut />}>
                            Logout
                        </DropdownItem>
                    </>
                )}
                {/* <DropdownItem leftIcon={<MdDarkMode />}> DarkMode </DropdownItem> */}
            </div>
        </UserOptionsDropdownContainer>
    );
};

const UserOptions = () => {
    const { user } = useSelector((state) => state.auth);

    const avatar = cdnContentImagesUrl("/user/" + user?.avatar);

    return (
        <UserOptionsContainer className={"navbar-nav"}>
            {/* <NavItem icon={<MdNotifications/>}/> */}
            <NavItem
                icon={
                    user?.avatar ? (
                        <img className={"avatar"} width={"40px"} height={"40px"} src={avatar} alt={""} />
                    ) : (
                        <FaUserAstronaut />
                    )
                }
            >
                <DropdownMenu></DropdownMenu>
            </NavItem>
        </UserOptionsContainer>
    );
};

export default UserOptions;
