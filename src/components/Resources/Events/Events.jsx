import React from "react";
import { Section } from "../WriteUps/WriteUpsElements";
import EventsElements from "./EventsElement";
import "./Events.css";

// probably recieved by a api call
const events = {
  title: "Lorem ipsum dolor",
  date: "1st October 2022",
  venue: "Discord",
  content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex molestias nam, iure hic, sunt totam, eaque corporis inventore mollitia nemo saepe eligendi cumque numquam dolor placeat architecto pariatur fugiat accusantium!\nLorem ipsum dolor sit, amet consectetur adipisicing elit. Earum, cum perspiciatis pariatur facere soluta consectetur rerum aut ex quas deserunt inventore, dignissimos dicta blanditiis? Adipisci incidunt odio eaque nobis earum sit! Sequi, ducimus debitis. Commodi officiis vel quae sequi aspernatur iusto reprehenderit repellendus autem architecto!",
}

const Events = () => {
  return (
    <Section>
      <h1> All Events </h1>
      <div className="Allevents">
        <EventsElements title={events.title} venue={events.venue} date={events.date} content={events.content}/>
        <EventsElements title={events.title} venue={events.venue} date={events.date} content={events.content}/>
        <EventsElements title={events.title} venue={events.venue} date={events.date} content={events.content}/>
        <EventsElements title={events.title} venue={events.venue} date={events.date} content={events.content}/>
      </div>
    </Section>
  );
};

export default Events;