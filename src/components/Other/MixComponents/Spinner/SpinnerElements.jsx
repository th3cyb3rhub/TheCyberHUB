import styled, { keyframes } from "styled-components";
export const SpinnerSection = styled.div`
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
`;

// Define the keyframes for the spinning animation
const spinAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const SpinnerImage = styled.img`
    animation: ${spinAnimation} 10s linear infinite;
    width: 15px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    color: #999;
    word-break: break-all;
`;
