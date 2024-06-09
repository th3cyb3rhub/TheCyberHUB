import styled from "styled-components";

export const MyCtfCertificatesContainer = styled.div`
    width: 100%;
    background: #090909;
    padding: 10px;
    border-radius: 5px;
`;

export const TheCyberCTFCertificates = styled.h3`
    padding: 25px;
    font-size: 35px;
    align-items: center;
    text-align: center;

    @media screen and (width <= 1000px) {
        font-size: 25px;
    }

    @media screen and (width <= 500px) {
        padding: 15px;
        font-size: 20px;
    }
`;

export const CtfCertificateCards = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(325px, 1fr));
    gap: 10px;
`;
export const CtfCertificateCard = styled.div`
    background: #131313;
    padding: 25px;
    border-radius: 5px;
    color: #eaeaea;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
        transition: all 0.2s ease-in-out;
        scale: 1.02;
    }
`;

export const CtfName = styled.h1`
    overflow-wrap: break-word;
    word-wrap: break-word;
    font-size: 25px;
`;
export const CtfKind = styled.div`
    font-size: 15px;
`;
export const CtfDate = styled.span`
    color: #afafaf;
`;
