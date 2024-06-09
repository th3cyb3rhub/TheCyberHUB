import styled from "styled-components";

export const InternshipHeader = styled.div`
    background: #090909;
    width: 100%;
    height: 100%;
    min-height: 100px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;

    @media screen and (width <= 768px) {
        padding: 10px;
    }
`;

export const InternshipHeading = styled.h1`
    font-size: 5rem;

    /* font-style: oblique; */
    font-family: "Cascadia Code", monospace;

    @media screen and (width <= 768px) {
        transition: 0.2s ease-in-out;
        font-size: 3rem;
    }

    transition: 0.2s ease-in-out;

    @media screen and (width <= 500px) {
        transition: 0.2s ease-in-out;
        font-size: 2rem;
    }
`;
