import styled from "styled-components";

export const ThecyberhubBot = styled.div`
  background-color: #0b0b0b;
  color: #cecac3;
  outline: 1px solid rgb(42, 42, 42);
  display: ${({ callBot }) => (callBot ? "block" : "none")};
  height: 100vh;
  width: 40vw;
  transition: 260ms all;
  padding: 2rem 2rem 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 11;

  @media screen and (max-width: 1024px) {
    width: 50vw;
  }
  @media screen and (max-width: 768px) {
    width: 70vw;
  }
  @media screen and (max-width: 640px) {
    width: 100vw;
  }

  .react-chatbot-kit-chat-container {
    border-radius: 0.5rem;
    outline: 1px solid #2a2a2a;
    transition: 260ms all;
    width: 100%;

    :hover {
      outline-color: #545454;
      outline-offset: 2px;
    }

    .react-chatbot-kit-chat-inner-container {
      .react-chatbot-kit-chat-header {
        background: rgba(32, 194, 14, 0.04);
        background: linear-gradient(to right, #b1faa9, #f6dbaa);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        border-bottom: 1px solid #363636;
        border-radius: 0.5rem 0.5rem 0 0;
        font-weight: 500;
        padding: 1rem;
      }

      .react-chatbot-kit-chat-message-container {
        display: flex;
        flex-direction: column;
        justify-content: start;
        row-gap: 1.3rem;
        height: 60vh;
        overflow: auto;
        padding: 1.5rem;

        .react-chatbot-kit-chat-bot-message-container {
          display: flex;
          column-gap: 0.5rem;
          .react-chatbot-kit-chat-bot-avatar {
            div {
              width: 2.5rem;
            }
            img {
              object-fit: fill;
              width: 100%;
            }
          }
          .react-chatbot-kit-chat-bot-message {
            background: #1a1c1d;
            border-radius: 0 0.5rem 0.5rem;
            outline: 2px solid #2a2a2a;
            overflow-wrap: break-word;
            padding: 0.5rem;
            /* width: fit-content; */

            span {
              font-weight: 400;
              letter-spacing: 0.08rem;
            }
          }
        }

        .react-chatbot-kit-user-chat-message-container {
          display: flex;
          justify-content: end;
          column-gap: 0.5rem;
          .react-chatbot-kit-user-chat-message {
            background: rgba(32, 194, 14, 0.2);
            border-radius: 0.5rem 0 0.5rem 0.5rem;
            font-weight: 300;
            letter-spacing: 0.08rem;
            outline: 2px solid #2a2a2a;
            overflow-wrap: break-word;
            padding: 0.5rem;
          }
          .react-chatbot-kit-user-avatar {
            div {
              height: 2rem;
              width: 2rem;
              background: linear-gradient(to right, #b1faa9, #f6dbaa);
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            svg {
              fill: rgb(32, 194, 14);
              width: 50%;
            }
          }
        }
      }

      .react-chatbot-kit-chat-input-container {
        border-top: 1px solid #363636;
        height: 3rem;
        width: 100%;

        form {
          display: flex;
          align-items: center;
          justify-content: start;
          height: 100%;
          width: 100%;
        }
        input {
          background: rgba(32, 194, 14, 0.04);
          border: none;
          border-radius: 0 0 0 0.5rem;
          caret-color: white;
          color: #cecac3;
          height: 100%;
          width: 100%;
          text-indent: 1rem;

          :focus {
            outline: none;
          }
          ::placeholder {
            color: #cecac3;
            font-weight: 100;
            letter-spacing: 0.1rem;
          }
        }
        button {
          background: rgba(32, 194, 14, 0.04);
          border: none;
          border-radius: 0 0 0.5rem 0;
          cursor: pointer;
          height: 100%;
          width: 3rem;
          transition: 260ms all;

          :hover {
            background: rgba(32, 194, 14, 0.2);
          }
        }
        svg {
          fill: #cecac3;
          width: 1rem;
        }
      }
    }
  }
`;

export const BotButtonCont = styled.div`
  position: fixed;
  right: 2rem;
  bottom: 1rem;
  z-index: 11;

  button {
    background: rgba(32, 194, 14, 0.5);
    border-radius: 50%;
    cursor: pointer;
    outline: 2px solid #363636;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 3.5rem;
    height: 3.5rem;
    transition: 260ms all;

    :hover {
      background: rgba(32, 194, 14, 0.8);
      outline-color: #545454;
      outline-offset: 1px;
    }
  }
`;
