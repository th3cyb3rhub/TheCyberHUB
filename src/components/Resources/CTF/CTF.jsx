import React from "react";
import { Section } from "../WriteUps/WriteUpsElements";
import CTFElements from "./CTFElements";
import "./CTF.css";
import { useState } from "react";

// const CtfsData = {
//     title: "TheCyberCTF",
//     date: "October 8 2022",
//     venue: <a style={{ color: "white" }} href={"https://discord.gg/QHBPq6xP5p"} target={"_blank"}>Discord</a>,
//     content: <p>
//         We host every weekend for the community for free. Take participate in the CTF and win exciting prizes and this is free for everyone.<br />Join Discord now."
//     </p>
// }

const CTF = () => {
    const number=193471289037
    const [value, setValue] = useState(null)
    const [correct,setCorrect]=useState(false)
    console.log(value)
    const handleClick = () => {
        value == number ? setCorrect(true) : setCorrect(false)
    }
    return (
        <Section>
            {/* <h1> Join the discord link to participate </h1> */}
            <br />
            <div className="AllEvents">
                {/* <CTFElements venue={CtfsData.venue} date={CtfsData.date} content={CtfsData.content}/> */}
                <div className="submit-container">
                    <label htmlFor="value" className="label-css">Enter value:</label>
                    <input type="text" id="value" className="input-css"
                        value={value} onChange={e => setValue(e.target.value)}></input>
                    {correct ? <button className="button-final" onClick={handleClick}> Submit </button> : <button className="button-initial" onClick={handleClick}> Submit </button>}
                    {correct ? <p> Congratulations! </p> : null}
                </div>
            </div>
        </Section>
    );
};

export default CTF;