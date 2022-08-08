import styled from "styled-components";
import { Link as RouterLink} from "react-router-dom";
// @import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@300..700&display=swap");

export const Link = styled(RouterLink)`
    text-decoration: none;
    color: #e8e6e3;

`
export const VideoHeading = styled.h3`
  text-decoration: none;
  color: #e8e6e3;
`
export const ChannelHeading = styled.h5`
  text-decoration: none;
  color: #e8e6e3;
`
//
// .ChannelHeading{
//     text-decoration:none;
//     color: #e8e6e3;
// }
//
// .paddingTop{
//     padding: 150px 0 60px 0;
//     background: #010606;
// }
//
// .h1_Courses{
//     font-size: 2.5rem;
//     color: #fff;
//     margin-bottom: 10px;
//
// }
// .card__section {
//     font-family: "Quicksand", sans-serif;
//     height: auto;
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     align-items: center;
//     background: #010606;
// }
//
// .container {
//     display: flex;
//     flex-wrap: wrap;
//     justify-content: center;
//     max-width: 1200px;
//     margin-block: 2rem;
//     gap: 2rem;
// }
//
export const Img = styled.img`
  max-width: 100%;
  display: block;
  object-fit: cover;
`
export const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: clamp(20rem, calc(20rem + 2vw), 22rem);
  overflow: hidden;
  box-shadow: 0 .1rem 1rem rgba(0, 0, 0, 0.1);
  border-radius: 1em;
  background: #1a1c1d;
`

export const CardBody = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: .5rem;
`

export const Tag = styled.div`
  align-self: flex-start;
  padding: .25em .75em;
  border-radius: 1em;
  font-size: .75rem;
`
// .tag + .tag {
//     margin-left: .5em;
// }
//
// .tag-blue {
//     background: #56CCF2;
//     background: linear-gradient(to bottom, #2F80ED, #56CCF2);
//     color: #fafafa;
// }
//
// .tag-brown {
//     background: #D1913C;
//     background: linear-gradient(to right, #0e0e0e, #2a2a2a);
//     color: #fafafa;
// }
//
// .tag-red {
//     background: #cb2d3e;
//     background: linear-gradient(to bottom, #ef473a, #cb2d3e);
//     color: #fafafa;
// }
//
// .card__body h4 {
//     font-size: 1.5rem;
//     text-transform: capitalize;
// }
//
export const CardFooter = styled.div`
  display: flex;
  padding: 1rem;
  margin-top: auto;
`

export const User = styled.div`
  display: flex;
  gap: .5rem;
`
export const Channel_Img = styled.img`
  border-radius: 50%;
  width: 2.5rem;
`

export const UserInfo = styled.div`
  color: #666;
`