import styled, { css } from "styled-components";
import { Link as RouterLink } from "react-router-dom";
import { AiFillCaretDown } from "react-icons/ai";

export const Section = styled.div`
  text-align: center;
  margin: 200px 100px 0;
  color: #cecac3;
`;

export const FreeCoursesContainer = styled.div`
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

export const FreeCoursesWrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: flex-start;
  grid-gap: 16px;
  padding: 0 50px;

  @media screen and (max-width: 1000px) {
    grid-template-columns: 1fr 1fr;
  }

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 0 20px;
  }
`;

export const FreeCoursesCard = styled.a`
  text-decoration: none;
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-radius: 10px;
  max-height: 340px;
  padding: 30px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.02);
    transition: all 0.2s ease-in-out;
    cursor: pointer;
  }
`;

export const FreeCoursesIcon = styled.img`
  height: auto;
  width: 300px;
  margin-bottom: 10px;
`;

export const FreeCoursesH1 = styled.h1`
  font-size: 2.5rem;
  color: #fff;
  margin-bottom: 64px;

  @media screen and (max-width: 480px) {
    font-size: 2rem;
  }
`;

export const FreeCoursesH2 = styled.h2`
  font-size: 1rem;
  margin-bottom: 10px;
`;

export const FreeCoursesP = styled.p`
  font-size: 1rem;
  text-align: center;
`;

export const Container = styled.div`
  display: flex;
  padding-top: 150px;

  @media screen and (max-width: 768px) {
    flex-direction: column-reverse;
  }
`;

export const MainContent = styled.div`
  flex: 0.8;

  @media screen and (max-width: 768px) {
    flex: 1;
    margin-top: 40px;
  }
`;

export const SideBar = styled.div`
  background: #080a10;
  flex: 0.2;
  height: fit-content;
  margin: 0 16px;
  position: sticky;
  top: 150px;

  @media screen and (max-width: 768px) {
    flex: 1;
    position: unset;
  }
`;

export const HeadingContainer = styled.div`
  align-items: center;
  display: flex;
  padding: 16px;
  pointer-events: none;

  @media screen and (max-width: 768px) {
    box-shadow: 0 0 4px rgb(255 255 255 / 15%);
    cursor: pointer;
    pointer-events: unset;
  }
`;

export const IconContainer = styled.div`
  color: white;
  display: none;

  @media screen and (max-width: 768px) {
    display: flex;
  }

  svg {
    height: 24px;
    margin-right: 2px;
    width: 24px;
  }
`;

export const CaretDownIcon = styled(AiFillCaretDown)`
  margin-bottom: 3px;
`;

export const SideBarHeading = styled.h1`
  color: #fff;
  font-size: 24px;
  white-space: nowrap;
`;

export const Content = styled.div`
  list-style: none;
  height: ${({ visible }) => (visible ? "215px" : 0)};
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  overflow: hidden;
  padding: ${({ visible }) => (visible ? "10px 0" : 0)};
  transition: all 0.35s ease;
`;

export const ListContent = styled.li`
  padding: 10px 16px;
  text-align: start;

  ${({ isActive }) => isActive && css`
    box-shadow: inset 10px 0 0 -7px #20c20e;
  `}
`;

export const Link = styled(RouterLink)`
  color: #fff;
  text-decoration: none;

  ${({ isActive }) => isActive && css`
    color: #20c20e;
  `}

  &:hover {
    color: #20c20e;
  }
`;
