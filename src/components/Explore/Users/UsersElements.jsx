import styled from "styled-components";
import { ExploreContentContainer } from "src/components/Explore/ExploreElements";
import { PiSealCheckDuotone } from "react-icons/pi";
export const UsersContainer = styled(ExploreContentContainer)`
    grid-auto-rows: ${(props) => (props.$displayAt === "explore" ? "2fr" : "0fr")};
    gap: 15px;

    @media (width <= 800px) {
        grid-auto-rows: 0fr;
        padding: 15px;
    }
`;

export const IconVerified = styled(PiSealCheckDuotone)`
    /* color: #1da1f2; */
    color: #ff6b08;
    font-size: 1.2rem;
`;

export const UserContainer = styled.div`
    background: #000;
    border: #2f2f2f 1px solid;
    display: flex;
    flex-direction: row;
    gap: 25px;
    width: 100%;
    border-radius: 15px;
    padding: 15px;
    min-height: 75px;
`;

export const UserPicture = styled.img`
    width: 55px;
    height: 55px;
    border-radius: 50%;
    object-fit: cover;
    object-position: center;
    margin: 0 auto;
    border: #222 1px solid;
    font-size: 12px;
    color: #999;
    word-break: break-all;
`;

// const EditButton = styled.button`
//   position: absolute;
//   bottom: 5px;
//   right: 5px;
//   background-color: #f5f5f5;
//   border: 1px solid #222222;
//   border-radius: 50%;
//   padding: 5px;
//   cursor: pointer;
// `;

export const UserDetail = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
`;

export const Header = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
    width: 100%;
`;

export const Name = styled.p`
    font-size: 1.1rem;
    font-weight: 600;
`;
export const Username = styled.p`
    color: #808080;

    &:hover {
        color: #eee;
        text-decoration: underline;
    }
`;
