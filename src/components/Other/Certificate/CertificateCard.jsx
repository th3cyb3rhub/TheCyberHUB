import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    CertificateComponent,
    CertificateContainer,
    CertificateFooter,
    DownloadButton,
    DownloadCertificateAs,
    DownloadCertificateSection,
} from "./CertificateElements";
import { InvalidCertificate } from "../CyberGames/CTF/CTFElements";
import { useParams } from "react-router-dom";
import html2canvas from "html2canvas";
import JsPDF from "jspdf";
import { AiFillFileImage, VscFilePdf } from "react-icons/all";
import { Wrapper } from "../../Dashboard/Profile/ProfileElements";
const CertificateCard = () => {
    const [certificate, setCertificate] = useState();
    const baseUrl = "https://thecyberhub-next.vercel.app/api/";

    const { id } = useParams();
    const certificateId = id;

    useEffect(() => {
        async function fetchCertificate() {
            const res = await axios.get(baseUrl + "get-certificate?id=" + certificateId);
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

    const downloadCertificate = (asPdf = true) => {
        html2canvas(document.querySelector("#certificate"), { scale: 5 }).then((canvas) => {
            if (asPdf) {
                const pdf = new JsPDF("l", "pt", [canvas.width, canvas.height]);
                pdf.addImage(canvas, "JPEG", 0, 0, canvas.width, canvas.height);
                pdf.save("certificate.pdf");
            } else {
                canvas.toBlob(
                    (blob) => {
                        const link = document.createElement("a");
                        link.href = URL.createObjectURL(blob);
                        link.download = "certificate.jpeg";
                        link.click();
                    },
                    "image/jpeg",
                    1,
                );
            }
        });
    };
    return (
        <Wrapper>
            <CertificateContainer>
                {certificate ? (
                    // loading ? (
                    //     <InvalidCertificate>loading</InvalidCertificate>
                    // ) : (
                    <>
                        <DownloadCertificateSection>
                            <p> Download your certificate as </p>
                            <DownloadCertificateAs>
                                <DownloadButton onClick={downloadCertificate}>
                                    <VscFilePdf />
                                    <p> PDF </p>
                                </DownloadButton>
                                <DownloadButton onClick={downloadCertificate(false)}>
                                    <AiFillFileImage />
                                    <p> Image </p>
                                </DownloadButton>
                            </DownloadCertificateAs>
                        </DownloadCertificateSection>
                        <CertificateComponent id="certificate">
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
                    </>
                ) : // )
                loading ? (
                    " "
                ) : (
                    <InvalidCertificate>
                        <h4>Invalid certificate id</h4>
                    </InvalidCertificate>
                )}
            </CertificateContainer>
        </Wrapper>
    );
};

function getKindText(kind) {
    switch (kind) {
        case "winner":
            return "winning";
        case "participation":
            return "participating in";
        case "rooted":
            return "Rooting";
        default:
            return "";
    }
}

export default CertificateCard;
