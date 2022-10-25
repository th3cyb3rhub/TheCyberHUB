import { useEffect, useState } from "react";
import "./certificate.scss";
import axios from "axios";
import { CertificateContainer } from "./CertificateElements";

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

    return (
        <CertificateContainer>
            {certificate ? (
                <div className="certificate flex-column-center">
                    <div className="certificate-word">Certificate</div>
                    <div className="achievement-word">of achievement</div>
                    <div className="presented-word">This certificate is presented to</div>

                    <div className="full-name">{certificate.fullName}</div>
                    <div className="ctf">
                        for {getKindText(certificate.kind)} - {certificate.ctf}
                    </div>
                    <div className="description">{certificate.description}</div>

                    <div className="footer">
                        <div className="date-block">
                            <div className="date">{certificate.issueDate}</div>
                            <div className="date-word">Date</div>
                        </div>
                        <div className="certificate-id flex-column-center">
                            <p>Id: {certificate.id}</p>
                        </div>
                        <div className="signature-block">
                            <div className="signature flex-column-center">Some image here</div>
                            <div className="signature-word flex-column-center">signature</div>
                        </div>
                    </div>
                </div>
            ) : (
                ""
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
