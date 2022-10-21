import React, { useState } from "react";
import "./CTF.css";
import EventImage from "../../../assets/images/Events/Capture.png";

const EventsElements = (props) => {
  const [viewFull, setViewFull] = useState(false);
  return (
    <>
      <div className="ctf__containerHeader">
        <div className="ctf__container__title">
          <img className="eventImg" src={EventImage} alt="Event Image" width="100%" height="180px" />
          <h2>{props.title}</h2>
          <h6>
            {props.date} • {props.venue}
          </h6>
        </div>
        <div className="ctf__container__contentHeader">{props.content}</div>
      </div>
    </>
  );
};

export default EventsElements;
