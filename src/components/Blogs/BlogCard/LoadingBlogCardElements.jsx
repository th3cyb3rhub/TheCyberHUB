import styled, { keyframes } from "styled-components";
export const lineLoading = keyframes`
  0% {
    width: 0;
  }
  100% {
    width: 100%;
  }
`;
export const LoadingBlogContainer = styled.div`
    height: 250px;
`;

export const animate = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
`;

export const LoadingContainer = styled.div`
    background: #232323;
    width: 100%;
    margin: 0 0 10px 0;
    overflow: hidden;
    border-radius: 5px;
`;

export const LoadingLine = styled.div`
    overflow: hidden;
    height: ${(props) => props.height}px;
    border-radius: 5px;
    background-color: #414141;
    animation: ${animate} 2s ease-in-out infinite;
`;

export const LoadingImage = styled.div`
    overflow: hidden;
    height: ${(props) => props.height || props.width * 0.6}px;
    background-color: #414141;
    animation: ${animate} 2s ease-in-out infinite;
`;
