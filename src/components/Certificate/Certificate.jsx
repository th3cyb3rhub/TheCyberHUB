import React, { useEffect, useState } from "react";
import axios from "axios";
import { CertificateContainer, CertificateComponent, CertificateFooter } from "./CertificateElements";
import { InvalidCertificate } from "../CyberGames/CTF/CTFElements";

export default function Certificate(certId) {
    const [certificate, setCertificate] = useState();
    const baseUrl = "https://thecyberhub-next.vercel.app/api/";

    useEffect(() => {
        async function fetchCertificate() {
            const res = await axios.get(baseUrl + "get-certificate?id=" + certId.certId);
            const data = await res.data;
            setCertificate(data);
        }

        fetchCertificate();
    }, []);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 5000);
    }, []);

    return (
        <CertificateContainer>
            {certificate ? (
                loading ? (
                    <InvalidCertificate>loading</InvalidCertificate>
                ) : (
                    <CertificateComponent>
                        <div className="certificate-word">Certificate</div>
                        <div className="achievement-word">of achievement</div>
                        <div className="presented-word">This certificate is presented to</div>
                        <div className="full-name">{certificate.fullName}</div>
                        <div className="ctf">
                            for {getKindText(certificate.kind)} - {certificate.ctf}
                        </div>
                        <div className="description">{certificate.description}</div>

                        <CertificateFooter>
                            <div className="date-block">
                                <div className="date">{certificate.issueDate}</div>
                                <div className="date-word">Date</div>
                            </div>
                            <div className="certificate-id">
                                <p>Id: {certificate.id}</p>
                            </div>
                            <div className="signature-block">
                                <div className="signature">thecyberworld</div>
                                <div className="signature-word">signature</div>
                            </div>
                        </CertificateFooter>
                    </CertificateComponent>
                )
            ) : loading ? (
                " "
            ) : (
                <InvalidCertificate>
                    <h4>Invalid certificate id</h4>
                </InvalidCertificate>
            )}
        </CertificateContainer>
    );
}

function getKindText(kind) {
    switch (kind) {
        case "winner":
            return "winning";
        case "participation":
            return "participating in";
        default:
            return "";
    }
}
