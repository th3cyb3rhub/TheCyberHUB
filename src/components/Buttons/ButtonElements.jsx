import styled from "styled-components";
import {Link as ScrollLink} from "react-scroll";
import {Link as RouterLink} from 'react-router-dom';

export const IconsSpacing = styled.span`
  margin: 5px 5px 0 0;
  display: inline;
  flex-direction: row;
`
export const IconsSpacing2 = styled.span`
  margin: 7px 0 0 3px;
  display: inline;
  flex-direction: row;
`
export const Button = styled(ScrollLink)`
  border-radius: 5px;
  border-width: 1px;
  border-style: solid;
  border-color: #343434;
  background: transparent;
  margin-right: 20px; //border-radius: 50px;
  white-space: nowrap;
  padding: ${({big}) => (big ? '14px 48px' : '12px 30px')};
  //color: ${({dark}) => dark ? '#ffffff' : '#0e0e0e'};
  font-size: ${({fontBig}) => (fontBig ? '20px' : '16px')};
  outline: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease-in-out;
    color: #47cf73;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: transparent;
    border-color: #343434;
    font-size: 18px;
  }
`

export const RouterButton = styled(RouterLink)`
  text-decoration: none;
  border-radius: 5px;
  border-width: 1px;
  border-style: solid;
  border-color: #343434;
  background: transparent;
  margin-right: 20px; //border-radius: 50px;
  white-space: nowrap;
  padding: ${({big}) => (big ? '14px 48px' : '12px 30px')};
    //color: ${({dark}) => dark ? '#ffffff' : '#0e0e0e'};
  font-size: ${({fontBig}) => (fontBig ? '20px' : '16px')};
  outline: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease-in-out;
  color: #47cf73;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: transparent;
    border-color: #343434;
    font-size: 18px;
  }
`

export const ButtonLink = styled.a`
  border-width: 1px;
  border-style: solid;
  border-color: #343434;
  background: transparent;
  margin-right: 20px;
  white-space: nowrap;
  padding: ${({big}) => (big ? '14px 48px' : '12px 30px')};
  color: ${({dark}) => dark ? '#ffffff' : '#0e0e0e'};
  font-size: ${({fontBig}) => (fontBig ? '20px' : '16px')};
  outline: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease-in-out;
  text-decoration: none;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: transparent;
    color: #47cf73;
    border-color: #343434;
    font-size: 18px;
  }
`

export const ButtonRouterLink = styled(RouterLink)`
  border-width: 1px;
  border-style: solid;
  border-color: #343434;
  background: transparent;
  margin-right: 20px;
  white-space: nowrap;
  padding: ${({big}) => (big ? '14px 48px' : '12px 30px')};
  color: ${({dark}) => dark ? '#ffffff' : '#0e0e0e'};
  font-size: ${({fontBig}) => (fontBig ? '20px' : '16px')};
  outline: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease-in-out;
  text-decoration: none;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: transparent;
    color: #47cf73;
    border-color: #343434;
    font-size: 18px;
  }
`