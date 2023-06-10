import styled from "styled-components";
import { getCDNUrl } from "../../../features/apiUrl";
const CybersecurityRegImage = `${getCDNUrl}/assets/images/Registeration/CybersecurityRegPage.png`;

export const Container = styled.div`
    display: flex;
    align-items: center;
    height: 100vh;
    width: 100%;
    background: black;
    overflow: auto;

    padding: 50px;

    @media screen and (max-width: 600px) {
        //padding: 10px;
        padding: 25px;
    }
`;

export const CenterCard = styled.div`
    //min-width: max-content;
    margin: auto;
    height: 100%;
    background: #1a1c20;
    //width: 1124px;
    box-shadow: rgb(0 0 0 / 11%) 1px 7px 16px 5px;
    border-radius: 7px;
    display: grid;
    grid-template-columns: 1fr 1.4fr;
    grid-template-rows: 1fr;
    grid-template-areas: "left right";

    background-image: url(${CybersecurityRegImage});
    background-size: cover;
    background-position: 45%;
    background-color: rgba(51, 51, 51, 0.19);
    background-blend-mode: soft-light;

    @media (max-width: 850px) {
        grid-template-columns: 1fr;
        grid-template-rows: 0.3fr 1fr;
        grid-template-areas: "left" "right";
        width: 100%;
    }
`;
