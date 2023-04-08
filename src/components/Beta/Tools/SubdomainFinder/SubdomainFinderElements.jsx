import styled from "styled-components";
import { CgSoftwareDownload, MdContentCopy } from "react-icons/all";

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Title = styled.h1`
    margin-top: 0;
    margin-bottom: 1rem;
    background: transparent;
    display: flex;
    justify-content: center;

    @media (max-width: 768px) {
        font-size: 1.5rem;
    }
`;

export const Form = styled.form`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
    align-items: center;

    @media (max-width: 768px) {
        flex-direction: column;
    }
`;

export const Input = styled.input`
    padding: 0.5rem;
    padding-left: 1.7rem;
    font-size: 1.3rem;
    min-width: 300px;
    flex: 1;
    @media (max-width: 768px) {
        padding-left: 0.5rem;
        min-width: auto;
        width: 100%;
    }
`;

export const Button = styled.button`
    padding: 0.5rem 1rem;
    font-size: 1.3rem;
    background-color: #ff8000;
    color: #fff;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    border-radius: 2px;

    &:hover {
        background-color: greenyellow;
        color: #363636;
        scale: 1.1;
        transition: all 0.2s ease-in-out;
    }
    @media (max-width: 768px) {
        width: 100%;

        &:hover {
            background-color: greenyellow;
            color: #363636;
            scale: 1.01;
            transition: all 0.2s ease-in-out;
        }
    }
`;

export const SubdomainList = styled.ul`
  list-style: none;
  padding: 15px 30px;
  margin-top: 2rem;
  background: #0e0e0e;
  border-radius: 10px;
  @media (max-width: 768px) {
    padding: 15px 10px;
`;

export const SubdomainItem = styled.li`
    font-size: 1rem;
    line-height: 1.5;
    word-wrap: normal;
    word-break: break-all;

    @media (max-width: 768px) {
        font-size: 0.8rem;
    }
`;

export const CopyButtonSection = styled.div`
    display: flex;
    justify-content: flex-end;
`;
export const CopyButton = styled(MdContentCopy)`
    margin-left: 1rem;
    cursor: pointer;
    color: #ff8000;
    font-size: 1.5rem;
`;

export const DownloadButton = styled(CgSoftwareDownload)`
    margin-left: 1rem;
    cursor: pointer;
    color: #ff8000;
    font-size: 1.5rem;
`;

export const SubdomainFinderSpinner = styled.div`
    margin: 100px 0;
    width: 100%;
    max-width: 1000px;
    justify-content: center;
    align-items: center;
    position: relative;
    background: transparent;
    box-shadow: 0 0 100px 0 rgba(40, 110, 157, 0.2);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    border-radius: 10px;
    padding: 50px;

    @media (max-width: 768px) {
        padding: 20px;
    }
`;
