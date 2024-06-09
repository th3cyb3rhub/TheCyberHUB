import styled from "styled-components";

export const NotesContainer = styled.div`
    display: flex;
    width: 100%;
    height: 100vh;
`;

export const NotesSidebarContainer = styled.div`
    display: flex;
    margin-left: -2px;
    flex-direction: column;
    height: 100vh;
    width: 100%;
    min-width: 200px;
    max-width: 250px;

    @media screen and (width <= 800px) {
        width: 35%;
    }
`;
export const NotesSidebarHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 10px;
    border: 2px solid #111;
    border-left: none;
    height: 3rem;
`;

export const NotesSidebarHeaderTitle = styled.h3`
    color: #fff;
    text-align: center;
    margin-bottom: 0;
    font-family: "Roboto Mono", monospace;
    text-transform: capitalize;
`;
export const NotesListNoFound = styled.h4`
    color: #787878;
    text-align: center;
    margin-bottom: 0;
    font-family: "Roboto Mono", monospace;
`;
export const SearchContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 2px solid #111;
    background-color: #111;
    border-top: none;
    height: 3rem;
`;

export const NotesListContainer = styled.ul`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 5px;
    border: 2px solid #111;
    border-top: 0;
    padding: 5px;
    overflow-y: auto;
`;
export const NoteItemPinningContainer = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
    display: ${(props) => (props?.isPinned ? "block" : "none")};
`;
export const NoteItemElementContainer = styled.div`
    position: relative;

    &:hover ${NoteItemPinningContainer} {
        display: block;
    }
`;
export const NoteItemElement = styled.li`
    display: flex;
    position: relative;
    flex-direction: column;
    justify-content: start;
    align-items: start;
    width: 100%;
    padding: 10px;
    gap: 5px;
    background-color: ${(props) => (props.$isPicked ? "#2a2a2a" : "#090909")};
    border: ${(props) => (props.$isPinned ? "1px solid #2a2a2a" : "none")};
    border: 1px solid #111;
    border-radius: 5px;
    color: #f5f5f5;

    &:hover {
        background-color: #383838;
        cursor: pointer;
    }

    @media screen and (width <= 500px) {
        font-size: 1.5rem;
        padding: 25px;
    }
`;

export const NoteItemShortTitle = styled.p`
    text-transform: capitalize;
    font:
        15px "Roboto Mono",
        monospace;
    font-weight: 600;
`;

export const NoteItemShortDescription = styled.p`
    font-family: Roboto, sans-serif;
    font-weight: 100;
    width: 100%;
    overflow-wrap: break-word;
    font-style: ${(props) => (props?.empty ? "italic" : "")};
    opacity: ${(props) => (props.empty ? "0.7" : "")};
`;

export const NotesDescriptionContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    flex: 1;
    height: 100vh;
`;

export const NotesDescriptionHeader = styled.div`
    border: 2px solid #111;
    border-left: 0;
    padding: 0 20px;
    height: 3rem;
    display: flex;
    justify-content: end;
    align-items: center;
`;
export const NotesDescriptionIconsContainer = styled.div`
    width: ${(props) => props.icons * 50}px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
export const NotesDescription = styled.div`
    position: absolute;
    top: 3rem;
    left: 0;
    width: 100%;
    max-height: calc(100vh - 3rem);
    display: flex;
    flex-direction: column;
    color: #f5f5f5;
    padding: 10px;
    overflow-y: auto;
    gap: 10px;
`;

export const DescriptionTitle = styled.div`
    width: 100%;
    overflow-wrap: break-word;
    background: ${(props) => props.title && "#252525"};
`;

export const DescriptionDisplayTitle = styled.p`
    text-transform: capitalize;
    width: 100%;
    font-size: 18px;
    font-weight: 550;
    padding: 5px 10px;

    /* font-family: "Roboto Mono", monospace; */
`;
