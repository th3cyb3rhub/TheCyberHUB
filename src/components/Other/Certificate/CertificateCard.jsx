import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    CertificateComponent,
    CertificateContainer,
    CertificateContent,
    CertificateFooter,
    DownloadButton,
    DownloadCertificateAs,
    DownloadCertificateSection,
    LogoSection,
    TCWLogo,
    TCWText,
} from "./CertificateElements";
import { InvalidCertificate } from "../CyberGames/CTF/CTFElements";
import { useParams } from "react-router-dom";
import html2canvas from "html2canvas";
import JsPDF from "jspdf";
import { AiFillFileImage, VscFilePdf } from "react-icons/all";
import { Wrapper } from "../../Dashboard/Profile/ProfileElements";
import Logo from "../../../assets/images/Thecyberworld_logo_outlined.png";

// import {getCDNUrl} from "../../../features/apiUrl";
// const TCWlogo = `${getCDNUrl}/images/assets/images/ThecyberworldLogo/Thecyberworld_logo_outlined.png`;

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

    const downloadCertificatePDF = () => {
        html2canvas(document.querySelector("#certificate"), { scale: 5 })
            .then((canvas) => {
                const pdf = new JsPDF("l", "pt", [canvas.width, canvas.height]);
                pdf.addImage(canvas, "JPEG", 0, 0, canvas.width, canvas.height);
                pdf.save(`${certificate.ctf.split(" ").join("")}-${certificate.kind}-certificate.pdf`);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const downloadCertificateImage = () => {
        html2canvas(document.querySelector("#certificate"), { scale: 5 })
            .then((canvas) => {
                canvas.toBlob(
                    (blob) => {
                        const link = document.createElement("a");
                        link.href = URL.createObjectURL(blob);
                        link.download = `${certificate.ctf.split(" ").join("")}-${certificate.kind}-certificate.jpeg`;
                        link.click();
                    },
                    "image/jpeg",
                    1,
                );
            })
            .catch((err) => {
                console.log(err);
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
                                <DownloadButton onClick={downloadCertificatePDF}>
                                    <VscFilePdf />
                                    <p> PDF </p>
                                </DownloadButton>
                                <DownloadButton onClick={downloadCertificateImage}>
                                    <AiFillFileImage />
                                    <p> Image </p>
                                </DownloadButton>
                            </DownloadCertificateAs>
                        </DownloadCertificateSection>

                        <CertificateComponent id="certificate">
                            <LogoSection>
                                <TCWLogo src={Logo} />
                                <TCWText> Thecyberworld </TCWText>
                                <TCWText> TheCyberHUB.org </TCWText>
                                <TCWText> thecyber-sec.com </TCWText>
                                <TCWLogo src={Logo} />
                            </LogoSection>
                            <CertificateContent>
                                <div className="certificate-word">Certificate of achievement</div>
                                <div className="presented-word">This certificate is presented to</div>
                                <div className="full-name">
                                    {certificate.fullName}
                                    <span className="small-text">({certificate.username.toLowerCase()})</span>
                                </div>
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
                            </CertificateContent>
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
