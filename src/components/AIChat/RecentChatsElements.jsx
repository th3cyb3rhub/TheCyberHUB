import styled from "styled-components";

export const RecentChatsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start;
    gap: 25px;
    width: 100%;
    max-width: 400px;
    min-width: 400px;
    padding: 10px 25px;
    background: #111; /* Adjusted background color */
    color: #fff;
    border: 1px solid rgb(70 70 70 / 55%);

    /* border: 1px solid #464646; */

    /* border-radius: 10px; Increased border-radius for a softer look */
    border-radius: 10px 0 0 10px;
    font-size: 18px;

    .chat-title {
        padding: 5px 15px;
        background: #252525;
        color: #fff;
        border-radius: 10px;
        cursor: pointer;
        transition: background 0.3s ease;

        &:hover {
            background: #464646;
        }
    }

    p {
        text-align: center;
    }

    @media (width <= 48rem) {
        position: absolute;
        max-width: 1000px;
        min-width: 0;
        height: 100%;
    }
`;

export const RecentChatsHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    max-height: 100px;
    border-bottom: 1px solid rgb(70 70 70 / 75%);

    p {
        background: #ff6b08;
        color: #151515;
        border-radius: 10px;
        padding: 10px 15px;
        font-size: 23px;
        font-weight: bold;
    }

    .new-chat-button {
        padding: 4px 7px;
        font-size: 25px;
        font-weight: bold;
        background-color: #ff6b08; /* Green color for the new chat button */
        color: #151515;
        border-radius: 10px;
        cursor: pointer;
        text-align: center;
        transition: background 0.3s ease;

        &:hover {
            color: #151515;
            background: #f38236; /* Darker green on hover */
        }
    }
`;

export const RecentChatsList = styled.ul`
    display: flex;
    flex-direction: column;
    list-style: none;
    padding: 0;
    margin: 0;
    gap: 15px;
    overflow-y: auto;
    height: 100%;

    li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 5px 15px;
        background: #252525;
        color: #fff;
        border-radius: 10px;
        cursor: pointer;
        transition: background 0.3s ease;

        &:hover {
            background: #464646;
        }
    }

    span {
        display: flex;
        justify-content: center;
        align-items: center;
        background: #363535;
        color: #a1a1a1;
        border: #38393a solid 1px;
        padding: 5px;
        border-radius: 5px;
        cursor: pointer;
        transition: all 0.3s ease;

        &:hover {
            transform: scale3d(1.1, 1.1, 1.1);
        }
    }
`;

export const ToggleSection = styled.p`
    z-index: -1;
`;
