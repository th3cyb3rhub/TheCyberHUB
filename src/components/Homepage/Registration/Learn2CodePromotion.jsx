import styled from "styled-components";

export const Learn2CodePromotion = styled.div`
    width: 100%;
    border-radius: 10px;
    background: rgb(0 0 0 / 22%);
    box-shadow: 0 0 100px 0 rgb(47 47 47 / 20%);
    backdrop-filter: blur(4px);

    & #reg-promo-content {
        width: 100%;
        margin: 0 auto;
        color: #f5f5f5;
        height: 100%;
        display: flex;
        flex-direction: column;
        padding: 35px 10% 20px;

        @media screen and (width <= 1200px) {
            padding: 50px 10% 0;
        }

        @media screen and (width <= 500px) {
            padding: 25px;
        }

        & .brand-logo {
            font-weight: 600;
            color: #ff6b08;
            font-size: 25px;

            @media screen and (width <= 850px) {
                font-size: 20px;
            }

            transition: all 0.3s ease-in-out;

            &:hover {
                color: #ff771f;
                transform: scale(1.01);
                transition: all 0.3s ease-in-out;
            }
        }

        & .leading-title {
            margin: 25px 0 20px;
            font-size: 40px;
            width: min-content;

            @media screen and (width <= 900px) {
                font-size: 30px;
            }

            @media screen and (width <= 500px) {
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
