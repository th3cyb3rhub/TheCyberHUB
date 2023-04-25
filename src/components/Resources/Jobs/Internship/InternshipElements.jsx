import styled from "styled-components";

export const InternshipContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    width: 100%;
    max-width: 1500px;
`;

export const InternshipProgramContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 20px;
    width: 100%;
    max-width: 1500px;

    @media screen and (max-width: 1300px) {
        grid-template-columns: 1fr 1fr;
    }
    @media screen and (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

export const ApplicationOpenTextSection = styled.div``;

export const ApplicationOpenText = styled.p`
    font-size: 1rem;
    font-family: "Fira Code", monospace;
    color: #ff8100;
    text-align: center;
    margin: 15px 0 10px 0;
`;
export const ApplicationHeading = styled.h3`
    font-size: 1.3rem;
    font-family: "Fira Code", monospace;
    color: greenyellow;
    text-align: center;
    @media screen and (max-width: 768px) {
        font-size: 1.1rem;
    }
`;

export const InternshipCard = styled.div`
    background: #090909;
    color: #d2d2d2;
    width: 100%;
    height: 100%;
    padding: 25px 25px 25px 25px;
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: start;
    text-align: start;
    border-radius: 10px;
    transition: 0.2s ease-in-out;

    &:hover {
        transform: scale(1.02);
        transition: 0.2s ease-in-out;
        cursor: pointer;
    }

    font-family: "Fira Code", monospace;
    font-size: 1.1rem;

    @media screen and (max-width: 768px) {
        padding: 15px;
        font-size: 1rem;
    }

    ${(props) =>
        props.isBetweenDates || props.appClosed
            ? `
  padding: 0 25px 20px 25px;
  font-family: "Fira Code", monospace;
  font-size: 1.1rem;
  position: relative;
  //background: transparent;
  box-shadow: 0 0 100px 0 rgba(63, 255, 0, 0.2);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border: 1px solid rgba(145, 145, 145, 0.18);
  `
            : null}
`;

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

    @media screen and (max-width: 768px) {
        padding: 10px;
    }
`;

export const InternshipHeading = styled.h1`
    font-size: 5rem;
    font-style: oblique;
    @media screen and (max-width: 768px) {
        font-size: 3rem;
    }
`;
