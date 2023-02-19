import styled from "styled-components";

export const RegistrationFormContainer = styled.form`
    width: 100%;
    height: 100%;
    padding: 43px 10%;
    max-width: fit-content;
    display: flex;
    flex-direction: column;
    justify-content: center;
    @media screen and (max-width: 1200px) {
        padding: 50px 10%;
    }
    @media screen and (max-width: 500px) {
        padding: 25px;
    }
    & .registration__promotion__h1 {
        color: white;
        font-size: 25px;
        margin-bottom: 13px;
        line-height: 1.2;
    }

    & .registration__promotion__p {
        color: gray;
        font-size: 14px;
        margin-bottom: 26px;
        line-height: 1.4;
    }

    & .registration__inputfields {
        display: grid;
        row-gap: 20px;
    }

    & .registration__ctas {
        margin-top: 20px;
        display: grid;
        row-gap: 20px;

        & .registration__tandc {
            display: flex;
            font-size: 12px;
            color: white;

            & span {
                color: green;
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
