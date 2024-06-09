import styled from "styled-components";
import { getCdnAssets } from "src/features/apiUrl";
const CybersecurityRegImage = `${getCdnAssets}/images/Registration/CybersecurityRegPage.png`;

export const Container = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    background: black;
    overflow: auto;
    padding: 50px;

    @media screen and (width <= 600px) {
        /* padding: 10px; */
        padding: 25px;
    }

    ${(props) =>
        props.$authPopup
            ? `

    `
            : `
    height: 100vh;
  `};
`;

export const CenterCard = styled.div`
    /* min-width: max-content; */
    margin: auto;
    height: 100%;
    background: #1a1c20;

    /* width: 1124px; */
    box-shadow: rgb(0 0 0 / 11%) 1px 7px 16px 5px;
    border-radius: 7px;
    background-image: url(${CybersecurityRegImage});
    background-size: cover;
    background-position: 45%;
    background-color: rgb(51 51 51 / 19%);
    background-blend-mode: soft-light;

    ${(props) =>
        props.$authPopup
            ? `

    `
            : `
    display: grid;
    grid-template-columns: 1fr 1.4fr;
    grid-template-rows: 1fr;
    grid-template-areas: "left right";

    @media (max-width: 850px) {
        grid-template-columns: 1fr;
        grid-template-rows: 0.3fr 1fr;
        grid-template-areas: "left" "right";
        width: 100%;
    }
  `};
`;
