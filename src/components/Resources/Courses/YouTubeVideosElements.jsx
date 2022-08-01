import styled from 'styled-components';
export const Section = styled.div`
  text-align: center;
  margin: 200px 100px 0;
  color: #cecac3;  
`

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
`

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
`

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
  box-shadow: 0 1px 3px rgba(0,0,0,.2);
  transition: all .2s ease-in-out;

  &:hover {
    transform: scale(1.02);
    transition: all .2s ease-in-out;
    cursor: pointer;
  }
`

export const FreeCoursesIcon = styled.img`
  height: auto;
  width: 300px;
  margin-bottom: 10px;
`

export const FreeCoursesH1 = styled.h1`
  font-size: 2.5rem;
  color: #fff;
  margin-bottom: 64px;

  @media screen and (max-width: 480px) {
    font-size: 2rem;
  }
`

export const FreeCoursesH2 = styled.h2`
  font-size: 1rem;
  margin-bottom: 10px;
`

export const FreeCoursesP = styled.p`
  font-size: 1rem;
  text-align: center;
`