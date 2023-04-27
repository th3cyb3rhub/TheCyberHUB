import styled from "styled-components";

export const ActivityGraphContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #0e0e0e;
    padding: 10px;
    border-radius: 5px;

    .react-calendar-heatmap text {
        font-size: 10px;
        fill: #aaa;
    }

    .react-calendar-heatmap {
        border-radius: 5px;
        color: #33e33c;
    }

    .react-calendar-heatmap .react-calendar-heatmap-small-text {
        font-size: 5px;
    }

    .react-calendar-heatmap rect:hover {
        stroke: #555;
        stroke-width: 1px;
    }

    .react-calendar-heatmap .color-empty {
        fill: #1a1a1a;
        width: 9px;
        height: 9px;
        outline: 1px solid #0e0e0e;
        border-radius: 2px;
    }

    .react-calendar-heatmap .color-filled {
        fill: #8cc665;
        width: 9px;
        height: 9px;
        outline: 1px solid #0e0e0e;
        border-radius: 2px;
    }

    .react-calendar-heatmap .color-github-0 {
        fill: #ababab;
    }

    .react-calendar-heatmap .color-github-1 {
        fill: #d6e685;
    }

    .react-calendar-heatmap .color-github-2 {
        fill: #8cc665;
    }

    .react-calendar-heatmap .color-github-3 {
        fill: #44a340;
    }

    .react-calendar-heatmap .color-github-4 {
        fill: #1e6823;
    }

    /*
* Gitlab color scale
*/

    .react-calendar-heatmap .color-gitlab-0 {
        fill: #ededed;
    }

    .react-calendar-heatmap .color-gitlab-1 {
        fill: #acd5f2;
    }

    .react-calendar-heatmap .color-gitlab-2 {
        fill: #7fa8d1;
    }

    .react-calendar-heatmap .color-gitlab-3 {
        fill: #49729b;
    }

    .react-calendar-heatmap .color-gitlab-4 {
        fill: #254e77;
    }
`;
