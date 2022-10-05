import React, {useState} from "react";
import "./Events.css";
import image from "/src/assets/CTF-blogImage.png";
import EventImage from "/src/assets/HacktoberfestXthecyberworld.png";

const EventsElements = (props) => {
  const [viewFull, setViewFull] = useState(false)
  return (
    <>
      <div className="events__container">
        <div className="events__container__title">
          <img className="eventImg" src={image} alt="Event Image" width="100%" height="180px"/>
          <h2>{props.title}</h2>
          <h6>
             {props.date} • {props.venue}
          </h6>
        </div>
        <div className="events__container__content">
            {viewFull?props.content:props.content.slice(0,200)+"..."}<br></br>
            <a className="change_view_btn" onClick={()=>{setViewFull(!viewFull)}}>
                {viewFull?"See Less":"See More"}
            </a>
        </div>
      </div>
    </>
  );
};

export default EventsElements;