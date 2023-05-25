import styled from "styled-components";
import { Link } from "react-router-dom";
import { FcSearch } from "react-icons/all";

export const CTFContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    width: 100%;
    max-width: 1500px;
`;

export const CTFHeader = styled.div`
    background: #090909;
    width: 100%;
    height: 100%;
    min-height: 300px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;

    @media screen and (max-width: 768px) {
        padding: 10px;
        min-height: 200px;
    }
    @media screen and (max-width: 520px) {
        padding: 10px;
        min-height: 100px;
    }
`;

export const CTFHeading = styled.h1`
    font-size: 5rem;
    font-style: oblique;
    @media screen and (max-width: 768px) {
        font-size: 3rem;
    }
    @media screen and (max-width: 520px) {
        font-size: 2rem;
    }
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

export const CTFCards = styled.div`
    background: #090909;
    width: 100%;
    height: 100%;
    //min-height: 500px;
    border-radius: 0.6rem;
    color: #d7d7d7;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    grid-gap: 20px;
    padding: 20px;
    box-sizing: border-box;

    @media screen and (max-width: 768px) {
        grid-template-columns: 1fr;
    }
    @media screen and (max-width: 500px) {
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    }
`;
export const CTFCardContainer = styled.div`
    background: #131313;
    border-radius: 0.6rem;
    border: 2px solid #1c1c1c;
    color: #d7d7d7;
    text-decoration: none;
    font-size: 1.5rem;
    box-sizing: border-box;
    width: 100%;
    text-align: left;

    transition: 0.2s ease-in-out;

    &:hover {
        transition: 0.2s ease-in-out;
        scale: 1.02;
        color: #d7d7d7;
    }
`;

export const CTFCardHeader = styled.div`
    padding: 15px 15px 5px 15px;
    display: flex;
    justify-content: space-between;
`;

export const CTFCardBody = styled.div`
    padding: 5px 15px;
`;
export const CTFCardFooter = styled.div`
    padding: 5px 15px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    background: #101010;
`;

export const CTFCardTitle = styled.h2`
    font-size: 2rem;
    font-weight: 600;
    margin: 0;
    padding: 0;
`;

export const CTFCardSubtitle = styled.p`
    font-size: 1rem;
`;

export const CTFTags = styled.div`
    padding: 10px 0;
    display: flex;
    font-size: 150%;
    flex-wrap: wrap;
    word-wrap: break-word;
    //max-width: 1000px;
    gap: 10px;

    @media screen and (max-width: 600px) {
        flex-wrap: wrap;
        padding: 15px 0;
        width: 100%;
        font-size: 10px;
    }
`;

export const CTFType = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    //max-width: 400px;
    font-size: 16px;
    background: #0c1921;
    border: #1a1c1d 1px solid;
    border-radius: 5px;
    cursor: pointer;
    flex-wrap: wrap;
    word-wrap: break-word;
    padding: 0 10px;
    transition: transform 0.3s;

    &:hover {
        transform: scale(1.03);
    }
`;

export const CTFTag = styled.div`
    background: #142638;
    padding: 0 10px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: transform 0.3s;
    flex-wrap: wrap;
    word-wrap: break-word;
    max-width: 400px;

    &:hover {
        transform: scale(1.03);
    }
`;

export const CTFLink = styled(Link)`
    width: 100%;
`;

export const SearchContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
    width: 100%;
    //margin: 10px 0;
    background: #090909;
    border-radius: 4px;
    padding: 25px 25px 25px;
`;

export const SearchDifficulty = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    margin: 10px 0;
    background: #131313;
    border-radius: 4px;
    padding: 0 0 0 10px;

    @media screen and (max-width: 380px) {
        width: 100%;
    }
`;
export const Select = styled.select`
    border: 1px solid gray;
    padding: 8px;
    font-size: 16px;
    width: 200px;
    border-radius: 4px;

    @media screen and (max-width: 380px) {
        width: 100%;
    }
`;

// Option Component
export const Option = styled.option`
    font-size: 16px;
`;

// SearchInput Component
export const SearchInput = styled.input`
    border: 1px solid gray;
    padding: 8px;
    font-size: 16px;
    width: 200px;
    border-radius: 4px;
    @media screen and (max-width: 380px) {
        width: 100%;
    }
`;
export const SearchBox = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    margin: 10px 0;
    background: #131313;
    border-radius: 4px;
    padding: 0 0 0 10px;
    @media screen and (max-width: 380px) {
        width: 100%;
    }
`;

export const SearchIcon = styled(FcSearch)`
    font-size: 2rem;
    color: #d7d7d7;
    cursor: pointer;
    transition: 0.2s ease-in-out;
`;
