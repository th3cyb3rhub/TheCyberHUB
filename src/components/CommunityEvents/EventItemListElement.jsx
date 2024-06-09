import styled from "styled-components";

export const EventItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.5rem;
    border: 1px solid #f0f0f0;
    border-radius: 8px;
    background: ${(props) =>
        props.isRequestedEvent
            ? "linear-gradient(135deg, #111 25%, transparent 25%, transparent 50%, #111 50%, #111 75%, transparent 75%, transparent);"
            : "transparent"};
    background-size: 60px 60px;
    margin-bottom: 1rem;
    position: relative;

    .details {
        flex-basis: 55%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-weight: 600;
        position: relative;
        width: 50%;

        .details-request {
            margin-right: 1rem;
            background-color: #fae4de;
            color: #9b3d1e;
            padding: 0.125rem 0.5rem;
            border-radius: 2rem;
            font-size: 0.75rem;
            font-weight: 600;
        }
    }

    .container-action-and-text {
        color: #5ca35c;
        text-transform: capitalize;
        position: relative;

        .details {
            display: flex;
            flex-direction: column;
            width: 100%;
            position: absolute;
            align-items: center;
        }
    }

    .container-action {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 250px;
        margin-bottom: 10px;
    }

    .action {
        flex-basis: 10%;
        display: flex;
        justify-content: end;
        cursor: pointer;
        position: relative;
        width: 100px;

        .action-edit {
            background-color: #f8f8f8;
            display: flex;
            justify-content: center;
            align-items: center;
            width: fit-content;
            color: #000;
            padding: 0.75rem 1.25rem;
            border-radius: 8px;
        }

        p {
            margin-right: 0.75rem;
        }

        .without-dropdown {
            width: 100px;

            p {
                margin-right: 0;
            }
        }

        .enable-button {
            background-color: #10f010;

            p {
                color: white;
            }
        }

        .disable-button {
            background-color: green;

            p {
                color: white;
            }
        }

        .uniqe-state-button {
            background-color: #002300;

            p {
                color: white;
            }
        }

        .time-line {
            flex-basis: 25%;
            padding-left: 2rem;

            .time-line-detail {
                display: flex;
                align-items: center;
                margin-bottom: 0.75rem;

                &:last-child {
                    margin-bottom: 0;
                }

                p {
                    margin: 0 0.75rem;
                }

                .text-over-flow {
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    width: 158px;
                }
            }

            .time-line-request {
                color: #e24612;
            }
        }

        .action-dropdown {
            width: 260px;
            border: 1px solid #ccc;
            box-shadow: 0 4px 8px rgb(0 0 0 / 10%);
            border-radius: 4px;
            padding: 0.5rem;
            background-color: #f0f0f0;
            position: absolute;
            top: 90%;
            z-index: 1;
            color: #707272;

            .action-dropdown-list {
                display: flex;
                align-items: center;
                height: 3.5rem;
                padding: 0 1rem;

                &:last-child {
                    padding-top: 0.5rem;
                    margin-bottom: 0;
                    border-top: 1px solid lightgray;
                }

                &:first-child {
                    border-top: none;
                }

                p {
                    margin-left: 0.75rem;
                }

                &:hover {
                    background-color: #ddd;
                    border-radius: 8px;
                    font-weight: 600;
                    color: #000;
                }
            }
        }
    }
`;
