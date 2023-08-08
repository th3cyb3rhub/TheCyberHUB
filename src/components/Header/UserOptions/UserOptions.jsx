import React, { useEffect, useRef, useState } from "react";
import "./UserOptions.css";

import { FaUserAstronaut, FaUserCircle } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { IoMdLogIn } from "react-icons/io";
import { MdDashboard } from "react-icons/md";

import { useDispatch, useSelector } from "react-redux";
import { RouterLink, UserOptionsContainer, UserOptionsDropdownContainer } from "./UserOptionsElements";
import { logout, userReset } from "../../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { getAllUserDetails } from "../../../features/userDetail/userDetailSlice";
import { cdnContentImagesUrl } from "../../../features/apiUrl";
// import Streak from "../../Dashboard/Streak/Streak";

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
        <li ref={userRef} className={"nav-item"}>
            <a className={"icon-button"} onClick={() => setOpen(!open)}>
                {props.text} {props.icon}
            </a>
            {open && props.children}
        </li>
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
                        <DropdownItem to={"/dashboard"} leftIcon={<MdDashboard />}>
                            Dashboard
                        </DropdownItem>
                        <DropdownItem to={`/@${user.username}`} leftIcon={<FaUserCircle />}>
                            Public Profile
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
    const dispatch = useDispatch();
    const { userDetails } = useSelector((state) => state.userDetail);
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        if (user) dispatch(getAllUserDetails());
    }, [dispatch, user]);

    const userDetail = userDetails?.find((userDetail) => userDetail?.user === user?._id);
    const avatar = cdnContentImagesUrl("/user/" + userDetail?.avatar);

    return (
        <UserOptionsContainer className={"navbar-nav"}>
            {/* <NavItem icon={<MdNotifications/>}/> */}
            <NavItem
                icon={
                    userDetail?.avatar ? (
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
