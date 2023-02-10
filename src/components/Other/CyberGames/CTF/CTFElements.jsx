import styled from "styled-components";

export const CTFContainer = styled.div`
    margin-top: 150px;
`;

export const GetCertificateContainer = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    justify-content: center;
`;

export const Heading = styled.h2`
    font-size: 1.5rem;
    background: transparent;
    color: whitesmoke;
    margin: 5px;
    padding: 5px 10px;
`;

export const InvalidCertificate = styled.div`
    width: 37vw;
    padding: 1rem 5rem;
    font-family: "Oswald", sans-serif;
    text-transform: uppercase;
    color: whitesmoke;
    background-repeat: no-repeat;
    background-size: cover;
    border: 2px solid #222;
    align-items: center;
    border-radius: 0.6rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 50px auto;
`;

export const InputBox = styled.input`
    text-align: center;
    align-items: center;
    font-size: 1.5rem;
    background: transparent;
    border: #3f3f3f 1px solid;
    border-radius: 0.5rem;
    color: whitesmoke;
    padding: 5px 5px;
`;

export const CertificateContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
`;
