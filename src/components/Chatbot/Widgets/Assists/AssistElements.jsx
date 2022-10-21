import styled from "styled-components";

export const OptionButton = styled.button`
  background: transparent;
  border-radius: 0.3rem;
  color: #cecac3;
  cursor: pointer;
  font-weight: 700;
  letter-spacing: 0.08rem;
  outline: 1px solid rgba(32, 194, 14, 0.4);
  padding: 0.5rem;
  transition: 260ms all;

  :hover {
    background: rgba(32, 194, 14, 0.2);
    color: white;
    outline-color: #545454;
    outline-offset: 1px;
  }
`;

export const OptionCont = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: flex-start;
  flex-wrap: wrap;
`;

export const LinkList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  row-gap: 1.5rem;

  li {
    a {
      text-decoration: none;
      background: rgba(32, 194, 14, 0.2);
      border-radius: 0.3rem;
      color: white;
      font-weight: 500;
      font-style: italic;
      letter-spacing: 0.08rem;
      outline: 1px solid #545454;
      padding: 0.5rem;
      transition: 260ms all;

      :hover {
        background: transparent;
        color: #cecac3;
        outline-color: rgba(32, 194, 14, 0.4);
        outline-offset: 1px;
      }
    }
  }
`;
