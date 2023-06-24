import styled from "styled-components";

export const OpenSecProjectsContainer = styled.div`
    .card {
        background-color: #0c0c0c;
        border-radius: 6px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        padding: 16px;
        margin-bottom: 16px;
    }

    .card-header {
        display: flex;
        align-items: center;
        margin-bottom: 12px;
    }

    .card-header h2 {
        font-size: 20px;
        margin: 0;
        margin-right: 8px;
    }

    .card-header .star-count,
    .card-header .fork-count {
        display: flex;
        align-items: center;
        margin-right: 12px;
        font-size: 14px;
        color: #586069;
    }

    .card-header .star-count svg,
    .card-header .fork-count svg {
        margin-right: 4px;
        fill: #586069;
        width: 16px;
        height: 16px;
    }

    .card-body {
        color: #333333;
    }

    .card-body p {
        margin-bottom: 12px;
    }

    .card-body a {
        color: #0366d6;
        text-decoration: none;
    }

    .card-body a:hover {
        text-decoration: underline;
    }
`;
