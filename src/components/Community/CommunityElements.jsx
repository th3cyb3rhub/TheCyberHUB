import styled from "styled-components";
import bgImage from "../../assets/thecyberworld-green01.png";

export const Header = styled.header`
  color: #cecac3;
  background: url(${bgImage}) no-repeat;
  background-size: 25%;
  background-position: 50% 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  position: relative;
`;

export const Overlay = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background: #010606;
  opacity: 0.8;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1;

  & > a {
    text-decoration: none;
  }
`;

export const Heading = styled.h1`
  color: white;
  font-size: 3rem;
  font-weight: 300;
  margin: 0.5rem 0;
  text-align: center;
`;

export const Paragraph = styled.p`
  font-size: 1.2rem;
  font-weight: 300;
  margin: 0.5rem 0 2rem;
  text-align: center;
`;

export const Button = styled.button`
  background-color: #364eb0;
  border: none;
  border-radius: 0.3rem;
  color: white;
  cursor: pointer;
  font-weight: bold;
  display: flex;
  align-items: center;
  padding: 0.5rem;

  & > span {
    margin: 0 0.2rem;
  }

  &:hover {
    background-color: hsl(235, calc(3 * 85.6%), 64.7%);
  }
`;
