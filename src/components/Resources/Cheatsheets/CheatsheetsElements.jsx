import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    padding: 30px;
    font-family: Roboto, sans-serif;
    background-color: #1a1a1a;
    color: #f0f0f0;
    border-radius: 8px;
    width: 100%;
    max-width: 1600px;
    margin: 0 auto;
    box-shadow: 0 4px 6px rgb(0 0 0 / 10%);
`;

export const Sidebar = styled.div`
    width: 280px;
    background-color: #2a2a2a;
    padding: 20px;
    border-radius: 8px;
    margin-right: 30px;
    box-shadow: 2px 0 5px rgb(0 0 0 / 10%);
`;

export const SidebarItem = styled.div`
    padding: 12px 15px;
    margin-bottom: 10px;
    cursor: pointer;
    border-radius: 6px;
    background-color: ${(props) => (props.active ? "#3a3a3a" : "transparent")};
    color: ${(props) => (props.active ? "#ff7e16" : "#d0d0d0")};
    transition: all 0.3s ease;

    &:hover {
        background-color: ${(props) => (props.active ? "#3a3a3a" : "#2f2f2f")};
        color: ${(props) => (props.active ? "#ff7e16" : "#fff")};
    }
`;

export const MainContent = styled.div`
    flex: 1;
    padding: 0 20px;
`;

export const CommandCode = styled.code`
    background-color: #2a2a2a;
    color: #ff7e16;
    padding: 8px 12px;
    border-radius: 6px;
    flex-wrap: wrap;
    white-space: pre-wrap;
    overflow-wrap: break-word;
    font-size: 14px;
    font-family: "Fira Code", Consolas, monospace;
    font-weight: 500;
    letter-spacing: 0.5px;
`;

export const CommandHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
`;

export const CommandItem = styled.li`
    margin-bottom: 20px;
    padding: 15px;
    border: 1px solid #3a3a3a;
    border-radius: 8px;
    background-color: #2a2a2a;
    display: flex;
    flex-direction: column;
    gap: 12px;
    transition: all 0.3s ease;

    &:hover {
        box-shadow: 0 2px 10px rgb(0 0 0 / 10%);
        transform: translateY(-2px);
    }
`;

export const CommandList = styled.ul`
    list-style-type: none;
    padding: 0;
`;

export const CopyButton = styled.button`
    padding: 6px 12px;
    border: none;
    background-color: #4a4a4a;
    color: #f0f0f0;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 12px;
    font-weight: 500;

    &:hover {
        background-color: #ff7e16;
        color: #1a1a1a;
    }
`;

export const Description = styled.p`
    margin: 0;
    font-size: 14px;
    line-height: 1.6;
    color: #d0d0d0;
`;

export const Section = styled.div`
    margin-bottom: 40px;
`;

export const SectionHeader = styled.h2`
    color: #ff7e16;
    border-bottom: 2px solid #3a3a3a;
    padding-bottom: 10px;
    margin-bottom: 25px;
    font-size: 24px;
    font-weight: 600;
`;
