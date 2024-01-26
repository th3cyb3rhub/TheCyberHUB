import styled from "styled-components";
import { Link as RouterLink } from "react-router-dom";

export const Link = styled.a`
    text-decoration: none;
    color: #e8e6e3;
`;
export const VideoHeading = styled.h3`
    text-decoration: none;
    color: #e8e6e3;
`;
export const ChannelHeading = styled.h5`
    text-decoration: none;
    color: #e8e6e3;
`;
//
// .ChannelHeading{
//     text-decoration:none;
//     color: #e8e6e3;
// }
//
// .paddingTop{
//     padding: 150px 0 60px 0;
//     background: #000000;
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
//     background: #000000;
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
    font-size: 12px;
    color: #999;
    word-break: break-all;
`;
export const Card = styled.div`
    display: flex;
    flex-direction: column;
    width: clamp(20rem, calc(20rem + 2vw), 22rem);
    overflow: hidden;
    box-shadow: 0 0.1rem 1rem rgba(0, 0, 0, 0.1);
    border-radius: 1em;
    background: #1a1c1d;
    margin-bottom: 30px;
`;

export const CardBody = styled.div`
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

export const Tag = styled.div`
    align-self: flex-start;
    padding: 0.25em 0.75em;
    border-radius: 1em;
    font-size: 0.75rem;
`;
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
`;

export const User = styled.div`
    display: flex;
    gap: 0.5rem;
`;
export const ChannelImg = styled.img`
    border-radius: 50%;
    width: 2.5rem;
    font-size: 12px;
    color: #999;
    word-break: break-all;
`;

export const UserInfo = styled.div`
    color: #666;
`;

export const Button = styled(RouterLink)`
    background: #1a1c1d;
    color: #fff;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    font-size: 0.75rem;
    font-weight: 500;
    text-transform: uppercase;
    transition: 0.3s;
    border: 1px solid #1a1c1d;
    &:hover {
        background: #fff;
        color: #1a1c1d;
        border: 1px solid #fff;
    }
`;
