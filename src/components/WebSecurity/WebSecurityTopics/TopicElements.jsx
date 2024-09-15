import styled from "styled-components";

// export const Container = styled.div`
//     background: #090909; /* Dark background color */
//     color: #fff; /* White text color */
//     padding: 20px; /* Padding for content */
//     border-radius: 8px; /* Rounded corners for the container */
//     box-shadow: 0 4px 8px rgb(0 0 0 / 10%); /* Box shadow for a subtle lift */
// `;

export const Tag = styled.span`
    display: inline-block;
    background: #404040; /* Darker background for tags */
    color: #fff;
    padding: 5px 10px;
    margin: 0 5px;
    border-radius: 4px;
`;

export const TopicsContainer = styled.div`
    width: 100%;
    max-width: 1500px;
    height: 100%;

    /* background-color: #090909; */
    display: flex;
    flex-direction: row;
    gap: 15px;
    margin: 5px auto;
`;

export const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 15px;

    .header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        gap: 20px;
        padding: 0;
        margin: 0;
    }

    .room-cards-container {
        /* display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
        gap: 20px; */
        padding: 0;
        margin: 0;
    }
`;

export const TopicCards = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 15px;
    width: 100%;
    justify-content: center;
`;

export const TopicCard = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    height: 100%;
    padding: 20px;
    border-radius: 10px;
    border: 1px solid rgb(255 255 255 / 18%);
    transition: all 0.3s ease-in-out;
    background: #090909;

    &:hover {
        transform: translateY(-1px);
        background: #232323;
    }
`;

export const Tags = styled.div`
    display: flex;
    flex-wrap: wrap;
`;
