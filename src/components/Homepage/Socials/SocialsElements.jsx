import styled from "styled-components";

export const SocialIconDiscord = styled.a`
  color: #fff;

  &:hover {
    color: #5865f2;
    transition: 0.3s ease-out;
  }
`;

export const SocialIconGithub = styled.a`
  color: #fff;

  &:hover {
    color: #969696;
    transition: 0.3s ease-out;
  }
`;

export const SocialIconTwitter = styled.a`
  color: #fff;

  &:hover {
    color: #1d9bf0;
    transition: 0.3s ease-out;
  }
`;

export const SocialIconYoutube = styled.a`
  color: #fff;

  &:hover {
    color: #ff0000;
    transition: 0.3s ease-out;
  }
`;

export const SocialIconTelegram = styled.a`
  color: #fff;

  &:hover {
    color: #1d9bf0;
    transition: 0.3s ease-out;
  }
`;

export const SocialIconInstagram = styled.a`
  color: #fff;

  &:hover {
    color: #b83993;
    transition: 0.3s ease-out;
  }
`;

export const SocialIconLinkedin = styled.a`
  color: #fff;

  &:hover {
    color: #1d9bf0;
    transition: 0.3s ease-out;
  }
`;

export const SocialIconFacebook = styled.a`
  color: #fff;

  &:hover {
    color: #1d9bf0;
    transition: 0.3s ease-out;
  }
`;

export const SocialsContainer = styled.div`
  height: 800px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #010606;

  @media screen and (max-width: 768px) {
    height: 1100px;
  }

  @media screen and (max-width: 480px) {
    height: 1300px;
  }
`;

export const SocialsWrapper = styled.div`
  font-size: 80px;
  max-width: 1000px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  align-items: flex-start;
  grid-gap: 30px;
  padding: 0 50px;

  @media screen and (max-width: 1000px) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
    padding: 0 20px;
    font-size: 50px;
  }
`;

export const SocialsCard = styled.div`
  color: white;
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 20px 20px 10px 20px;
  transition: all 0.2s ease-in-out;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0));
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);

  &:hover {
    transform: scale(1.02);
    transition: all 0.2s ease-in-out;
    cursor: pointer;
  }
`;

export const SocialsH1 = styled.h1`
  font-size: 50px;
  color: #fff;
  margin-bottom: 64px;

  &:hover {
    color: #20c20e;
    transition: all 0.2s ease-in-out;
    font-size: 55px;
    margin-bottom: 57px;
  }

  @media screen and (max-width: 480px) {
    font-size: 2rem;
  }
`;
