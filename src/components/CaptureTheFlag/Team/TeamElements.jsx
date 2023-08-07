import styled from "styled-components";

export const TeamContainer = styled.div``;

export const TeamName = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    font-size: 25px;
    font-weight: bold;
    margin: 25px 0;
    padding: 15px 15px;
`;
export const TeamMembers = styled.ul`
    min-width: 350px;
    max-width: 500px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
`;
export const TeamMember = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 5px 10px;
    background: #0c0c0c;
    border-radius: 3px;
    gap: 10px;
`;
export const SearchPlayerContainer = styled.div`
    display: flex;
    flex-direction: column;
`;
export const SearchAddPlayer = styled.div`
    display: flex;
    gap: 10px;
`;

export const SearchPlayer = styled.input`
    width: 100%;
    padding: 5px 10px;
    margin: 10px 0;
    font: 16px "Poppins", sans-serif;
`;
export const ButtonAddPlayer = styled.button`
    background: #2a2a2a;
    white-space: nowrap;
    padding: 7px 10px;
    color: #fff;
    font-size: 14px;
    outline: none;
    border: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s ease-in-out;
    margin: 10px 0;

    &:hover {
        transition: all 0.2s ease-in-out;
        background: #212121;
        color: #fff;
    }
`;

export const SearchPlayerList = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    margin: 10px 0;
`;
export const SearchPlayerItem = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 5px 10px;
    background: #0c0c0c;
    border-radius: 3px;
    transition: all 0.2s ease-in-out;
    cursor: pointer;
    &:hover {
        background: #212121;
        color: #fff;
        scale: 1.03;
    }
`;

export const CreateTeam = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
`;
export const CreateTeamName = styled.input`
    width: 100%;
    padding: 5px 10px;
    font-size: 20px;
`;
