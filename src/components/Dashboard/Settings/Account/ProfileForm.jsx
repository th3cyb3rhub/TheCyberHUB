import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { validateEmail } from "src/utils/validateEmail.js";
import { updateUser, userReset } from "src/features/auth/authSlice.js";
import { toast } from "react-toastify";
import { CircleSpinner } from "react-spinners-kit";

export default function SettingsForm() {
    const dispatch = useDispatch();

    const { user, isUserSuccess, isUserLoading } = useSelector((state) => state.auth);

    const {
        name: reduxName,
        username: reduxUsername,
        email: reduxEmail,
        is2fa: reduxIs2fa,
    } = useSelector((state) => state.auth.user);

    const [name, setName] = useState({
        value: reduxName,
        error: "",
    });

    const [username, setUsername] = useState({
        value: reduxUsername,
        error: "",
    });

    const [password, setPassword] = useState({
        value: "",
        error: "",
    });

    const [email, setEmail] = useState({
        value: reduxEmail,
        error: "",
    });

    const [is2fa, setIs2fa] = useState(reduxIs2fa);
    const disabled =
        name.value === reduxName &&
        username.value === reduxUsername &&
        email.value === reduxEmail &&
        !password.value &&
        is2fa === reduxIs2fa;

    useEffect(() => {
        if (isUserSuccess) {
            toast("Successfully updated");
        }

        dispatch(userReset());
    }, [user, isUserSuccess, dispatch]);

    function handleChange(e, setState) {
        setState({
            value: e.target.value,
            error: "",
        });
    }

    function handleSubmit(e) {
        e.preventDefault();

        const userData = {};

        if (!name.value) {
            return setName((curr) => ({
                ...curr,
                error: "Name required!",
            }));
        }

        if (name.value !== reduxName) {
            userData.name = name.value;
        }

        if (!username.value) {
            return setUsername((curr) => ({
                ...curr,
                error: "Username required!",
            }));
        }

        if (username.value !== reduxUsername) {
            userData.username = username.value;
        }

        if (password.value) {
            userData.password = password.value;
        } else if (password.value === "") {
            return setPassword((curr) => ({
                ...curr,
                error: "Password required!",
            }));
        }

        if (!validateEmail(email.value)) {
            return setEmail((curr) => ({
                ...curr,
                error: "Valid email required!",
            }));
        }

        if (email.value !== reduxEmail) {
            userData.email = email.value;
        }

        if (is2fa !== reduxIs2fa) {
            userData.is2fa = is2fa;
        }

        if (Object.keys(userData).length > 0) {
            dispatch(updateUser(userData));
        }
    }

    return (
        <form className="settings-profile-form">
            <div className="settings-profile-input-wrapper">
                <label htmlFor="name">Name</label>
                <br />
                <input
                    type="text"
                    value={name.value}
                    id="name"
                    name="name"
                    placeholder="Name"
                    onChange={(e) => handleChange(e, setName)}
                />
                {name.error && <p className="profile-error">{name.error}</p>}
            </div>
            <div className="settings-profile-input-wrapper">
                <label htmlFor="username">Username</label>
                <br />
                <input
                    type="text"
                    value={username.value}
                    id="username"
                    name="username"
                    placeholder="Your cool username"
                    onChange={(e) => handleChange(e, setUsername)}
                />
                {username.error && <p className="profile-error">{username.error}</p>}
            </div>
            <div className="settings-profile-input-wrapper">
                <label htmlFor="password">Password</label>
                <br />
                <input
                    type="password"
                    value={password.value}
                    id="password"
                    name="password"
                    placeholder="Your awesome password"
                    onChange={(e) => handleChange(e, setPassword)}
                />
                {password.error && <p className="profile-error">{password.error}</p>}
            </div>
            <div className="settings-profile-input-wrapper">
                <label htmlFor="email">Email</label>
                <br />
                <input
                    type="email"
                    value={email.value}
                    id="email"
                    name="email"
                    placeholder="Your email"
                    onChange={(e) => handleChange(e, setEmail)}
                    disabled={true}
                />
                {email.error && <p className="profile-error">{email.error}</p>}
            </div>
            <div
                className="settings-profile-input-wrapper"
                style={{
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "center",
                }}
            >
                <label htmlFor="is2fa">Enable 2FA</label>
                <input
                    style={{ height: "15px", width: "15px", padding: "25px", margin: "20px" }}
                    type="checkbox"
                    checked={is2fa}
                    id="is2fa"
                    name="is2fa"
                    onChange={() => setIs2fa(!is2fa)}
                />
            </div>
            {isUserLoading ? (
                <button
                    className="settings-profile-form-submitbtn"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <CircleSpinner size={20} color={"#ff6b08"} />
                </button>
            ) : (
                <button onClick={handleSubmit} className="settings-profile-form-submitbtn" disabled={disabled}>
                    Submit
                </button>
            )}
        </form>
    );
}
