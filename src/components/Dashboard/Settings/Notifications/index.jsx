import React, { useEffect, useState } from "react";
import "./Notification.css";
import Toggle from "./toggle";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateUser, userReset } from "src/features/auth/authSlice";

export default function Notifications() {
    const dispatch = useDispatch();
    const { user, isUserSuccess } = useSelector((state) => state.auth);

    const [toggled, setToggled] = useState({
        all: false,
        newsletter: false,
        event: false,
        blogs: false,
    });

    useEffect(() => {
        if (isUserSuccess) {
            toast("Successfully updated");
        }

        if (user && user.notification) {
            setToggled(user.notification);
        }

        dispatch(userReset());
    }, [user, isUserSuccess, dispatch]);

    function handleClickAll() {
        const newState = !toggled.all;
        const updatedToggled = {
            all: newState,
            blogs: newState,
            newsletter: newState,
            event: newState,
        };

        setToggled(updatedToggled);
        dispatch(updateUser({ notification: updatedToggled }));
    }

    function handleToggle(type) {
        setToggled((prevToggled) => {
            const updatedToggled = { ...prevToggled, [type]: !prevToggled[type] };

            if (type !== "all" && updatedToggled.all) {
                updatedToggled.all = updatedToggled.blogs && updatedToggled.newsletter && updatedToggled.event;
            }

            dispatch(updateUser({ notification: updatedToggled }));
            return updatedToggled;
        });
    }

    return (
        <section style={{ width: "100%" }}>
            <div>
                <h3>Notifications</h3>
                <p>Here you can modify which notifications you want to receive</p>
                <div id="container">
                    <div>
                        <h2>All notifications</h2>
                        <p id="allNotif">Turn off all notifications</p>
                    </div>
                    <Toggle handleClick={handleClickAll} checked={toggled.all} className={"allButton"} />

                    <div>
                        <h3>Newsletter notifications</h3>
                        <p>Receive the monthly newsletter</p>
                    </div>
                    <Toggle
                        handleClick={() => handleToggle("newsletter")}
                        checked={toggled.newsletter}
                        className={"otherButtons"}
                    />

                    <div>
                        <h3>Event notifications</h3>
                        <p>Receive notifications related to events</p>
                    </div>
                    <Toggle
                        handleClick={() => handleToggle("event")}
                        checked={toggled.event}
                        className={"otherButtons"}
                    />

                    <div>
                        <h3>Blogs notifications</h3>
                        <p>Receive notifications regarding the blog</p>
                    </div>
                    <Toggle
                        handleClick={() => handleToggle("blogs")}
                        checked={toggled.blogs}
                        className={"otherButtons"}
                    />
                </div>
            </div>
        </section>
    );
}
