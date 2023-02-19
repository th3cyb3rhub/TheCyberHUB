import styled from "styled-components";
import { GlowingButton } from "../MixComponents/Buttons/ButtonElements";
import { getCDNUrl } from "../../../features/apiUrl";
const bgImage = `${getCDNUrl}/assets/images/certificate-bg.png`;

export const CertificateContainer = styled.div`
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #fff;
`;
export const LogoSection = styled.div`
    padding: 25px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;
`;
export const TCWLogo = styled.img`
    width: 50px;
    height: 50px;
`;
export const TCWText = styled.p`
    margin: 0 10px;
    font-size: 1.5rem;
`;

export const CertificateContent = styled.div`
    padding: 0 5rem 1rem;
    font-family: "Oswald", sans-serif;
    text-transform: uppercase;
    color: whitesmoke;
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

export const CertificateComponent = styled.div`
    margin: 50px;
    width: 70em;
    //padding: 1rem 5rem;
    font-family: "Oswald", sans-serif;
    text-transform: uppercase;
    color: whitesmoke;
    background-image: url(${bgImage});
    background-repeat: no-repeat;
    background-size: cover;
    border: 0.3rem solid #222;
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .certificate-word {
        margin: 2rem 0;
        font-weight: 500;
        font-size: 4rem;
    }

    .achievement-word {
        margin-top: 1rem;
        font-weight: 400;
        font-size: 2rem;
    }

    .presented-word {
        margin-top: 1.5rem;
        font-weight: 300;
        font-size: 1.5rem;
    }

    .full-name {
        padding: 0 2rem 0.5rem 2rem;
        margin-top: 3rem;
        font-weight: 300;
        font-size: 2rem;
        border-bottom: 2px solid #ccc;
        display: flex;
        align-items: center;
    }
    .small-text {
        font-size: 1.5rem;
        margin: 0 0.5rem;
    }
    .ctf {
        margin-top: 1rem;
        font-size: 1.5rem;
    }

    .description {
        margin-top: 3rem;
        font-size: 1.5rem;
        max-width: 50vw;
        font-weight: 300;
    }
`;

export const CertificateFooter = styled.div`
    min-width: 60em;
    max-width: 60em;
    padding: 0 50px;
    margin-top: 4rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 50vw;

    .date-block {
        .date {
            padding: 0.7rem 1rem 0.5rem 1rem;
            border-bottom: 2px solid #ccc;
        }

        .date-word {
            text-align: center;
            font-size: 1.5rem;
        }
    }

    .certificate-id {
        text-align: center;
        margin-left: 40px;
        margin-top: 40px;
    }

    .signature-block {
        .signature {
            padding: 1rem 1rem 0.2rem 1rem;
            border-bottom: 2px solid #ccc;
            font-family: "Caveat", cursive;
        }

        .signature-word {
            text-align: center;
            font-size: 1.5rem;
        }
    }
`;

export const DownloadCertificateSection = styled.div`
    width: 100%;
    align-items: center;
    text-align: center;
    & > p {
        margin: 5px;
        font-size: 20px;
    }
`;

export const DownloadCertificateAs = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
`;

export const DownloadButton = styled(GlowingButton)`
    margin: 5px;
    padding: 7px 25px;
`;
