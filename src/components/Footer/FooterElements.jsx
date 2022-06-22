import styled from 'styled-components'; 
import { Link as RouterLink } from 'react-router-dom';
import {Link as ScrollLink} from "react-scroll";

export const FooterContainer = styled.footer`
  background: #101522;
`;

export const FooterWrap = styled.div`
  padding: 48px 24px; 
  display: flex;
  flex-direction: column; 
  justify-content: center;
  align-items: center;
  max-width: 1100px;
  margin: 0 auto;
`;

export const FooterLinksContainer = styled.div`
  display: flex;
  justify-content: center;

  @media screen and (max-width: 820px) {
    padding-top: 32px; 
  }
`; 

export const FooterLinksWrapper = styled.div`
  display: flex;

  @media screen and (max-width: 820px) {
    flex-direction: column; 
  }
`;

export const FooterLinkItems = styled.li`
  display: flex;
  flex-direction: column; 
  align-items: flex-start; 
  margin: 16px;
  text-align: left; 
  width: 160px;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;

  @media screen and (max-width: 420px) {
    margin: 0;
    padding: 10px; 
    width: 100%;
  }
`;

export const FooterLinkTitle = styled.h1`
  font-size: 14px;
  margin-bottom: 16px;
`; 

export const FooterLink = styled(RouterLink)`
  color: #fff;
  text-decoration: none; 
  margin-bottom: .5rem;
  font-size: 14px;

  &:hover {
    color: #01bf71;
    transition: .3s ease-out;
  }
`;

export const FooterLink2 = styled(ScrollLink)`
  color: #fff;
  text-decoration: none; 
  margin-bottom: .5rem;
  font-size: 14px;

  &:hover {
    color: #01bf71;
    transition: .3s ease-out;
  }
`;


export const SocialMedia = styled.div`
  max-width: 1000px;
  width: 100%;
  color: #fff;
`; 

export const SocialMediaWrap = styled.div`
  display: flex;
  justify-content: space-between; 
  align-items: center; 
  max-width: 1100px;
  margin: 40px auto 0 auto;

  @media screen and (max-width: 820px) {
    flex-direction: column;
  }
`; 

export const SocialLogo = styled(RouterLink)`
  color: #fff;
  justify-self: start;
  cursor: pointer; 
  text-decoration: none; 
  font-size: 1.5rem;
  display: flex;
  align-items: center; 
  margin-bottom: 16px;
  font-weight: bold;
`; 

export const WebsiteRights = styled.small`
  color: #fff;
  margin-bottom: 16px;
`; 

export const SocialIcons = styled.div`
  display: flex;
  justify-content: space-between; 
  align-items: center; 
  width: 240px;
`; 

export const SocialIconLink = styled.div`
  color: #fff;
  font-size: 24px;
`; 