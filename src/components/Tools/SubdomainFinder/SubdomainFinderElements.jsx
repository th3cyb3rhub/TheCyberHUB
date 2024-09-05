import styled from "styled-components";
import { CgSoftwareDownload } from "react-icons/cg";
import { MdContentCopy } from "react-icons/md";

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Title = styled.h1`
    background: transparent;
    display: flex;
    justify-content: center;
    margin: 0 0 25px;
    align-items: center;
    gap: 5px;

    @media (width <= 768px) {
        font-size: 1.5rem;
    }
`;

export const Form = styled.form`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
    align-items: center;
    width: 100%;
    margin-bottom: 25px;

    @media (width <= 768px) {
        flex-direction: column;
    }
`;

export const Input = styled.input`
    padding: 0.5rem;
    padding-left: 1.5rem;
    font-size: 1.3rem;
    min-width: 300px;
    flex: 1;
    color: #f5f5f5;
    background: #131313;
    border: 1px solid #212121;
    border-radius: 5px;

    @media (width <= 768px) {
        padding-left: 0.5rem;
        min-width: auto;
        width: 100%;
    }
`;

export const Button = styled.button`
    padding: 0.3rem 0.6rem;
    font-size: 1rem;
    font-weight: 525;
    background-color: orange;
    color: #131313;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    border-radius: 5px;
    text-align: center;
    border: 1px solid #212121;
    align-items: center;
    display: flex;
    justify-content: center;

    &:hover {
        background-color: #07b6f6;
        color: #131313;
        scale: 1.01;
        transition: all 0.2s ease-in-out;
    }

    @media (width <= 768px) {
        width: 100%;

        &:hover {
            background-color: #07b6f6;
            color: #363636;
            scale: 1.01;
            transition: all 0.2s ease-in-out;
        }
    }
`;

export const SubdomainList = styled.ul`
    border: 1px solid #212121;
    list-style: none;
    padding: 15px 30px;
    margin-top: 2rem;
    background: #0e0e0e;
    border-radius: 10px;

    @media (width <= 768px) {
        padding: 15px 10px;
    }
`;

export const SubdomainItem = styled.ul`
    font-size: 12px;
`;

export const SubdomainLink = styled.a`
    font-size: 12px;
    line-height: 1.5;
    word-wrap: normal;
    word-break: break-all;

    /* color: #f5f5f5; */
    color: #f5f5f5;

    @media (width <= 768px) {
        font-size: 20px;
    }

    text-decoration: none;
    transition: all 0.2s ease-in-out;

    &:hover {
        transition: all 0.2s ease-in-out;
        scale: 1.1;
        color: #07b6f6;
        text-decoration: underline;
    }
`;

export const CopyButtonSection = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 10px;
`;
export const CopyButton = styled(MdContentCopy)`
    cursor: pointer;
    color: #ff8000;
    font-size: 1.5rem;
    transition: all 0.2s ease-in-out;

    &:hover {
        color: #07b6f6;
        transition: all 0.2s ease-in-out;
        scale: 1.1;
    }
`;

export const DownloadButton = styled(CgSoftwareDownload)`
    cursor: pointer;
    color: #ff8000;
    font-size: 1.8rem;
    transition: all 0.2s ease-in-out;

    &:hover {
        color: #07b6f6;
        transition: all 0.2s ease-in-out;
        scale: 1.1;
    }
`;

export const SubdomainFinderSpinner = styled.div`
    margin: 50px;
    padding: 50px;
    width: 100%;
    justify-content: center;
    align-items: center;
    position: relative;
    background: #090909;
    color: antiquewhite;
    border: 1px solid #1a1c1d;
    box-shadow: 0 0 100px 0 rgb(40 110 157 / 20%);
    backdrop-filter: blur(4px);
    border-radius: 10px;

    @media (width <= 768px) {
        padding: 20px;
    }
`;
