import styled from "styled-components";
import { ButtonGreen } from "src/components/Other/MixComponents/Buttons/ButtonElements";
import bgImage from "src/assets/images/certificate-bg.png";

// const bgImage = `${getCDNUrl}/images/certificate-bg.png`;

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
    font-size: 12px;
    color: #999;
    word-break: break-all;
`;
export const TCWText = styled.p`
    margin: 0 10px;
    font-size: 1.5rem;
`;

export const CertificateContent = styled.div`
    padding: 0 5rem 1rem;
    font-family: Oswald, sans-serif;
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

    /* padding: 1rem 5rem; */
    font-family: Oswald, sans-serif;
    text-transform: uppercase;
    color: whitesmoke;

    /* background: #0e0e0e; */
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
        font-size: 3.5rem;
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
        padding: 0 2rem 0.5rem;
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

    .username {
        text-transform: initial;
        font-size: 1.5rem;
        margin: 0 0.5rem;
    }

    .ctf {
        margin-top: 1rem;
        font-size: 1.5rem;
    }

    .description {
        margin-top: 3rem;
        font-size: 1.2rem;
        max-width: 50vw;
        font-weight: 300;
        text-align: center;
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
            padding: 0.7rem 1rem 0.5rem;
            border-bottom: 2px solid #ccc;
        }

        .date-word {
            text-align: center;
            font-size: 1.5rem;
        }
    }

    .certificate-id {
        text-transform: initial;
        text-align: center;
        margin-left: 40px;
        margin-top: 40px;
    }

    .signature-block {
        .signature {
            padding: 1rem 1rem 0.2rem;
            border-bottom: 2px solid #ccc;
            font-family: Caveat, cursive;
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

export const DownloadButton = styled(ButtonGreen)`
    margin: 5px;
    padding: 7px 25px;
`;

export const ShareCertificateSection = styled.div`
    width: 100%;
    align-items: center;
    text-align: center;

    & > p {
        margin: 5px;
        font-size: 20px;
    }
`;
export const ShareCertificateSocials = styled.div`
    display: flex;
    gap: 10px;
    justify-content: center;
    align-items: center;
    text-align: center;
`;
export const Twitter = styled.a`
    color: #f5f5f5;
    text-decoration: none;
    margin-bottom: 0.5rem;
    font-size: 15px;

    &:hover {
        color: #1d9bf0;
        scale: 1.2;
        transition: 0.3s ease-out;
    }
`;
export const Linkedin = styled.a`
    color: #f5f5f5;
    text-decoration: none;
    margin-bottom: 0.5rem;
    font-size: 15px;

    &:hover {
        color: #0072b1;
        scale: 1.2;
        transition: 0.3s ease-out;
    }
`;
