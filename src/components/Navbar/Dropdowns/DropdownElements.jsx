import styled from "styled-components";
import {Link as LinkRouter} from "react-router-dom";


export const DropdownContainer = styled.div`
  border-radius: 0;
  background: transparent;
  width: 100%;
  height: auto;
  padding: 0 80px;
  position: absolute;
  top: 80px;
  left: 0;

  //background: #fff;
  transition: all .2s ease-in-out;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.1), rgba(255, 255, 255, 0));
  backdrop-filter: blur(100px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(3, 3, 3, 0.18);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);

  @media screen and (max-width: 1000px) {
    padding: 6px;
  }
`;

export const DropdownItemsContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  text-align: center;
  margin-left: 360px;
  width: 1100px;

  @media screen and (max-width: 1000px) {
    padding: 6px;
    width: 100%;
    margin: 0;
  }
`;

export const DropdownItemContainer = styled.div`
  color: black;
  position: relative;
  margin: 50px;
  width: 200px;

  &:hover {
    cursor: pointer;
  }
  @media screen and (max-width: 1000px) {
    padding: 15px;
    width: 40%;
    margin: 15px;
  }
`;

export const DropdownItem = styled.h2`
  text-align: start;
`;

export const DropdownDesc = styled.p`
  margin-top: 10px;
  text-align: start;
  color: #ababab;
`;


export const DropdownRouterLink = styled(LinkRouter)`
  text-decoration: none;
  color: white;
  margin-left: 50px;
`