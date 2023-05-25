import styled from "styled-components";
import { getCDNUrl } from "../../../features/apiUrl";
const CybersecurityRegImage = `${getCDNUrl}/assets/images/Registeration/CybersecurityRegPage.png`;

export const Learn2CodePromotion = styled.div`
    width: 100%;
    background-image: url(${CybersecurityRegImage});
    background-size: cover;
    background-position: 45%;
    background-color: rgba(51, 51, 51, 0.19);
    background-blend-mode: soft-light;
    border-radius: 7px;

    & #reg-promo-content {
        width: 80%;
        margin: 0px auto;
        color: white;
        height: 100%;
        padding: 40px 0;
        display: flex;
        flex-direction: column;

        & .brand-logo {
            font-weight: 600;
            color: #33e33c;
            font-size: 30px;
        }

        & .leading-title {
            margin: 40px 0 20px;
            font-size: 50px;
            width: min-content;

            @media screen and (max-width: 500px) {
                font-size: 40px;
            }

            & .nav-links {
                display: flex;
                list-style: none;
                margin-top: auto;
                justify-content: space-between;
                width: 64%;
            }
        }
    }
`;
