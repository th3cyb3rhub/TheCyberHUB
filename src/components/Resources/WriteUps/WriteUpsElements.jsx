import styled from "styled-components";

export const Section = styled.div`
  text-align: center;
  margin: 200px 20px;
  color: #cecac3;

  @media screen and (max-width: 760px) {
    text-align: center;
  }
`

export const WriteUpSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 200px auto;
  color: #cecac3;
  width: 45rem;

  @media screen and (max-width: 1080px) {
  }

  @media screen and (max-width: 760px) {
  }

  @media screen and (max-width: 600px) {
    width: 27rem;
  }
  
`

export const AuthorSection = styled.div`
  display: flex;
`

export const AuthorImage = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 50%;
`

export const AuthorUsername = styled.div`
  margin: 3px 0 0 10px;
  font-size: 13px;
`

export const Date = styled.div`
  margin: 3px 0 0 10px;
  font-size: 13px;
`

export const ContentBody = styled.div`
  display: flex;
  justify-content: space-between;

`

export const Content = styled.div`
  margin: 0 20px 0 0;
`

export const Heading = styled.h2`
  @media screen and (max-width: 600px) {
    font-size: 15px;
  }
`

export const Paragraph = styled.p`
  @media screen and (max-width: 600px) {
    font-size: 13px;
  }
`

export const ImageSection = styled.div`

`

export const Image = styled.img`
  border-radius: 5px;
`

export const ContentFooter = styled.div`
  display: flex;
`

export const Tag = styled.button`
  margin: 5px 0 0 0;
  padding: 5px;
  border-radius: 10px;
  border-color: #1a1c1d;
  border-style: solid;
  font-size: 10px;
  background: #1a1c1d;
  color: #cecac3;
  border-width: 1px;
`

export const MinRead = styled.div`
  font-size: 13px;
  margin: 5px 0 0 10px;
`

export const Bookmark = styled.div`
  display: flex;
  justify-content: end;
  margin: 5px 0 0 10px;
`

export const MarginTop = styled.div`
  margin-top: 10px;
`

export const MarginBottom = styled.div`
  margin-bottom: 10px;
`

export const HR = styled.hr`
  color: #2a2a2a;

`

export class ResourcesListSection {
}