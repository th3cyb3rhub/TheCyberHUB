import React, {useState} from "react";
import "./EventsHeader.css";
import EventImage from "/src/assets/HacktoberfestXthecyberworld.png";

const EventsElements = (props) => {
  const [viewFull, setViewFull] = useState(false)
  return (
    <>
      <div className="events__containerHeader">
        <div className="events__container__title">
            <img className="eventHeaderImg" src={EventImage} alt="Event Image" width="100%" height="180px"/>
          <h2>{props.title}</h2>
          <h6>
             {props.date} • {props.venue}
          </h6>
        </div>
        <div className="events__container__contentHeader">
            {props.content}
        </div>
      </div>
    </>
  );
};

export default EventsElements;