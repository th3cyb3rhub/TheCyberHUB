import React from "react";
import {Section} from "../WriteUps/WriteUpsElements";
import CTFElements from "./CTFElements";
import "./CTF.css";

const CtfsData = {
    title: "TheCyberCTF",
    date: "October 8 2022",
    venue: <a style={{color: "white"}} href={"https://discord.gg/QHBPq6xP5p"} target={"_blank"}>Discord</a>,
    content: <p>
        We host every weekend for the community for free. Take participate in the CTF and win exciting prizes and this is free for everyone.<br/>Join Discord now."
    </p>
}

const CTF = () => {
    return (
        <Section>
            <h1> Join the discord link to participate </h1>
            <br/>
            <div className="AllEvents">
                <CTFElements venue={CtfsData.venue} date={CtfsData.date} content={CtfsData.content}/>
            </div>
        </Section>
    );
};

export default CTF;