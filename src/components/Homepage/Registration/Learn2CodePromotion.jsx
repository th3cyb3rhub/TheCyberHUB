import styled from "styled-components";
// import { getCDNUrl } from "../../../features/apiUrl";

// const CybersecurityRegImage = `${getCDNUrl}/assets/images/Registeration/CybersecurityRegPage.png`;

export const Learn2CodePromotion = styled.div`
    width: 100%;

    border-radius: 10px;
    background: rgba(0, 0, 0, 0.22);
    box-shadow: 0 0 100px 0 rgba(47, 47, 47, 0.2);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);

    & #reg-promo-content {
        width: 100%;
        margin: 0 auto;
        color: white;
        height: 100%;
        display: flex;
        flex-direction: column;
        padding: 35px 10% 20px;

        @media screen and (max-width: 1200px) {
            padding: 50px 10% 0;
        }
        @media screen and (max-width: 500px) {
            padding: 25px;
        }

        & .brand-logo {
            font-weight: 600;
            color: #33e33c;
            font-size: 25px;
            @media screen and (max-width: 850px) {
                font-size: 20px;
            }

            transition: all 0.3s ease-in-out;

            &:hover {
                color: #00ff0c;
                transform: scale(1.01);
                transition: all 0.3s ease-in-out;
            }
        }

        & .leading-title {
            margin: 25px 0 20px;
            font-size: 40px;
            width: min-content;

            @media screen and (max-width: 900px) {
                font-size: 30px;
            }

            @media screen and (max-width: 500px) {
                font-size: 20px;
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
