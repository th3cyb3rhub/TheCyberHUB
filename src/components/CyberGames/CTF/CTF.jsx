import React from "react";
import { MarginTop, Section } from "../../Resources/WriteUps/WriteUpsElements";
import {CTFContainer, InputBox} from "./CTFElements";
import "./CTF.css";
import { useState } from "react";
import { Heading } from "../../Community/CommunityElements";
import Certificate from "../../Certificate/Certificate";

const CTF = () => {
    const [certId, setCert] = useState("");

    const handleClick = () => {
        console.log(certId);
    };
    console.log(certId);
  return (
    <CTFContainer>
      <Section>
              <>
              Get Certificate:   <InputBox type="text" placeholder={"certificate id"} name={"site"} value={certId}
              onChange={(e) => setCert(e.target.value)}/>
          </>
            {/*<button onClick={handleClick}>Submit</button>*/}
          {certId > 0 ?  <Certificate certId={certId}/> : " "}

        {/*<Heading> Coming soon </Heading>*/}
      </Section>
    </CTFContainer>
  );
};

export default CTF;
