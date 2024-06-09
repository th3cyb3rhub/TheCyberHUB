import React from "react";
import "./Notification.css";

export default function Toggle({ className, handleClick, checked }) {
    return (
        <label className={`switch ${className}`}>
            <input type="checkbox" onChange={handleClick} checked={checked} />
            <span className="slider" />
        </label>
    );
}
