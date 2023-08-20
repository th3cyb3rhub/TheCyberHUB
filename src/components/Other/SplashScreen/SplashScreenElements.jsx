import styled from "styled-components";

export const SplashScreenContainer = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    text-align: center;
    flex-direction: column;
`;

export const SplashImageContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const SplashImage = styled.img`
    width: 150px;
    height: 150px;
    object-fit: cover;
    font-size: 12px;
    color: #999;
    word-break: break-all;
`;

export const SplashImageNeon = styled.img`
    width: 150px;
    height: 150px;
    object-fit: cover;
    animation: fade-in 1s forwards, neon-effect 2s ease-in-out infinite;
    font-size: 12px;
    color: #999;
    word-break: break-all;
    @keyframes neon-effect {
        0% {
            opacity: 0;
        }
        50% {
            opacity: 1;
            transition: opacity 0.5s ease-in-out;
        }
        100% {
            opacity: 0;
            transition: opacity 0.5s ease-in-out;
        }
    }
`;

export const SplashImageNeon2 = styled.img`
    width: 150px;
    height: 150px;
    object-fit: cover;
    animation: fade-in 1s forwards, neon-effect 0.5s ease-in-out infinite;
    font-size: 12px;
    color: #999;
    word-break: break-all;
    @keyframes neon-effect {
        0% {
            opacity: 0;
        }
        50% {
            opacity: 1;
            transition: opacity 0.5s ease-in-out;
        }
        100% {
            opacity: 0;
            transition: opacity 0.5s ease-in-out;
        }
    }
`;

export const SplashScreenTextContainer = styled.div`
    height: 50px;

    & > p {
        color: #666666;
        font-size: 20px;
    }
`;
