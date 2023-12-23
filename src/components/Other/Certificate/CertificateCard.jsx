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
    Linkedin,
    LogoSection,
    ShareCertificateSection,
    ShareCertificateSocials,
    TCWLogo,
    TCWText,
    Twitter,
} from "./CertificateElements";
import { InvalidCertificate } from "../../CaptureTheFlag/CTFElements";
import { useParams } from "react-router-dom";
import html2canvas from "html2canvas";
import JsPDF from "jspdf";
import { AiFillFileImage } from "react-icons/ai";
import { VscFilePdf } from "react-icons/vsc";
import { Wrapper } from "../../Dashboard/Profile/ProfileElements";
import Logo from "../../../assets/images/Thecyberworld_logo_outlined.png";
import { CircleSpinner } from "react-spinners-kit";
import { getApiUrl } from "../../../features/apiUrl";
import { FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
// import {getCDNUrl} from "../../../features/apiUrl";
// const TCWlogo = `${getCDNUrl}/images/ThecyberworldLogo/Thecyberworld_logo_outlined.png`;

const CertificateCard = () => {
    const [certificate, setCertificate] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const { id } = useParams();
    const certificateId = id;

    useEffect(() => {
        setIsLoading(true);

        async function fetchCertificate() {
            try {
                const res = await axios.get(getApiUrl("api/ctfCertificate/getCtfCertificate/") + certificateId);
                const data = await res.data;
                setCertificate(data);
                setIsLoading(false);
            } catch (err) {
                // console.log(err);
                setIsLoading(false);
            }
        }

        fetchCertificate();
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
    const shareOnTwitter = () => {
        const tweet =
            "I just got my certificate for " +
            certificate?.ctf +
            " from @thecyberw0rld community. Check it out at https://thecyberhub.org/ctf/certificate/" +
            certificate?._id;
        window.open("https://twitter.com/intent/tweet?text=" + tweet);
    };

    const shareOnLinkedIn = () => {
        const text =
            "I just got my certificate for " +
            certificate?.ctf +
            " from @thecyberworld community. Check it out at https://thecyberhub.org/ctf/certificate/" +
            certificate?._id;
        const url = "https://www.linkedin.com/feed/?shareActive=true&text=" + text;
        window.open(url);
    };

    if (isLoading) {
        return (
            <Wrapper>
                <CircleSpinner size={30} color="#ff6b08" loading={isLoading} />
            </Wrapper>
        );
    }

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
                                    <span className="username">({certificate.username.toLowerCase()})</span>
                                </div>
                                <div className="ctf">
                                    for {getKindText(certificate.kind)} - {certificate.ctf}
                                </div>
                                <div className="description">{`Congratulations on successfully completing ${certificate.ctf} and demonstrating your skills in cybersecurity.`}</div>

                                <CertificateFooter>
                                    <div className="date-block">
                                        <div className="date">{certificate.issueDate.split("T")[0]}</div>
                                        <div className="date-word">Date</div>
                                    </div>
                                    <div className="certificate-id">
                                        <p>Id: {certificate._id}</p>
                                    </div>
                                    <div className="signature-block">
                                        <div className="signature">thecyberworld</div>
                                        <div className="signature-word">signature</div>
                                    </div>
                                </CertificateFooter>
                            </CertificateContent>
                        </CertificateComponent>
                        <ShareCertificateSection>
                            <p>Share your certificate with your friends</p>
                            <ShareCertificateSocials>
                                <Twitter href="#" onClick={shareOnTwitter}>
                                    <FaXTwitter size={40} />
                                </Twitter>
                                <Linkedin href="#" onClick={shareOnLinkedIn}>
                                    <FaLinkedin size={40} />
                                </Linkedin>
                            </ShareCertificateSocials>
                        </ShareCertificateSection>
                    </>
                ) : // )
                isLoading ? (
                    <CircleSpinner size={30} color="#686769" loading={isLoading} />
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
