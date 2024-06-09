import styled from "styled-components";

export const RegistrationFormContainer = styled.form`
    width: 100%;
    height: 100%;
    max-width: fit-content;
    display: flex;
    flex-direction: column;
    justify-content: center;

    /* background: transparent; */
    background: rgb(0 0 0 / 44%);
    box-shadow: 0 0 100px 0 rgb(47 47 47 / 20%);
    backdrop-filter: blur(4px);
    padding: 50px 10%;

    @media screen and (width <= 1200px) {
        padding: 50px 10%;
    }

    @media screen and (width <= 500px) {
        padding: 25px;
    }

    & .registration-promotion-h1 {
        color: #f5f5f5;
        font-size: 25px;
        margin-bottom: 13px;
        line-height: 1.2;
    }

    & .registration-promotion-p {
        color: gray;
        font-size: 14px;
        margin-bottom: 26px;
        line-height: 1.4;
    }

    & .registration-inputfields {
        display: grid;
        row-gap: 20px;
    }

    & .forgot-register {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
    }

    & .registration-ctas {
        /* margin-top: 20px; */
        display: grid;
        row-gap: 10px;

        & .registration-tandc {
            display: flex;
            flex-direction: row;
            align-items: start;
            font-size: 12px;
            color: #f5f5f5;

            & input {
                margin-top: 2px;
            }

            & span {
                color: #ff6b08;
                text-decoration: underline;
                margin-left: 5px;
                cursor: pointer;
            }

            & > div {
                margin-left: 12px;
            }
        }
    }
`;
