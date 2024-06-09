import styled from "styled-components";
import { BsDot } from "react-icons/bs";

export const FollowContainer = styled.div`
    /* display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center; */
    gap: 10px;
`;

export const FollowCount = styled.p`
    font-size: 1rem;
    margin-top: 10px;
    display: flex;
    padding: 0 10px;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    gap: 5px;
    color: #adadad;

    @media screen and (width <= 768px) {
        font-size: 0.8rem;
        justify-content: start;
    }
`;
export const DotIcon = styled(BsDot)`
    font-size: 20px;
    color: #d9d9d9;
`;
export const FollowButton = styled.button`
    padding: 5px 45px;
    margin: 15px 0;
    width: 100%;
    border-radius: 50px;
    background: #0e0e0e;
    color: #e0e0e0;
    border: 1px solid #3a3a3a;
    cursor: pointer;
    display: flex;
    justify-content: center;
    transition: all 0.3s ease-in-out;

    &:hover {
        background: #3a3a3a;
        transition: all 0.3s ease-in-out;
        scale: 1.1;
    }
`;
