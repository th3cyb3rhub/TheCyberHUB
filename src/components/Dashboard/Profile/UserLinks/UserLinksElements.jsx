import styled from "styled-components";
export const UserLinksContainer = styled.div`
    border: 2px solid #0e0e0e;
    background: #090909;
    border-radius: 5px;
    padding: 15px;
    min-width: 280px;
    max-width: 280px;
    @media screen and (max-width: 760px) {
        width: 100%;
        min-width: initial;
        max-width: initial;
    }
`;

export const UserInfo = styled.div`
    display: flex;
    flex-direction: column;

    .name {
        height: 35px;
        font-size: 1.7rem;
    }

    .username {
        font-size: 1.3rem;
        color: #777;
    }
`;

export const UserFollowersAndFollowing = styled.div`
    margin: 10px 0;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: start;
    text-align: center;

    .count {
        padding: 5px;
        font-size: 1rem;
    }

    .followers {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        color: #777;
    }

    .following {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        color: #777;
    }
`;

export const UserBio = styled.div`
    margin: 10px 0;
    background: #0e0e0e;
    padding: 10px;
    border-radius: 5px;
    font-size: 13px;
    .bio {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
    }
`;

export const EditUserBioTextarea = styled.textarea`
    width: 100%;
    height: 150px;
    border: none;
    border-radius: 5px;
    resize: none;
    font-size: 18px;
    font-family: "Arial", sans-serif;
    color: #a2a2a2;
    background: #0c0c0c;
    padding: 10px;
    /* Additional styles for the textarea when in edit mode */
    //background-color: ${({ isEdit }) => (isEdit ? "#c2c2c2" : "transparent")};
    outline: none;
    box-shadow: ${({ isEdit }) => (isEdit ? "0 2px 4px rgba(0, 0, 0, 0.1)" : "none")};

    /* Placeholder text color */

    &::placeholder {
        color: #d0d0d0;
    }
`;

export const LookingForJob = styled.div``;
