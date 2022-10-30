import React, { useState } from "react";
import {
    CertificateContainer,
    CTFContainer,
    GetCertificateContainer,
    Heading,
    InputBox,
    InvalidCertificate,
} from "./CTFElements";
import "./CTF.css";
import Certificate from "../../Certificate/Certificate";

const CTF = () => {
    const [certId, setCert] = useState("");

    console.log(certId);
    return (
        <CTFContainer>
            <GetCertificateContainer>
                <Heading> Get Your Certificate</Heading>
                <InputBox
                    type="text"
                    placeholder={"certificate id"}
                    name={"site"}
                    value={certId}
                    onChange={(e) => setCert(e.target.value)}
                />
            </GetCertificateContainer>
            <CertificateContainer>
                {certId.length === 13 ? <Certificate certId={certId} /> : " "}

                {(certId.length > 5 && certId.length !== 13) || certId.length > 13 ? (
                    <InvalidCertificate>
                        <h4>Invalid certificate id</h4>
                    </InvalidCertificate>
                ) : (
                    " "
                )}
            </CertificateContainer>
        </CTFContainer>
    );
};

export default CTF;
