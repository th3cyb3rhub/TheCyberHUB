import React from "react";
import { Section } from "../../Resources/WriteUps/WriteUpsElements";
import { CTFContainer, InputBox } from "./CTFElements";
import "./CTF.css";
import { useState } from "react";
import Certificate from "../../Certificate/Certificate";

const CTF = () => {
    const [certId, setCert] = useState("");

    console.log(certId);
    return (
        <CTFContainer>
            <Section>
                <>
                    Get Certificate:{" "}
                    <InputBox
                        type="text"
                        placeholder={"certificate id"}
                        name={"site"}
                        value={certId}
                        onChange={(e) => setCert(e.target.value)}
                    />
                </>
                {certId > 0 ? <Certificate certId={certId} /> : " "}
            </Section>
        </CTFContainer>
    );
};

export default CTF;
