import styled from "styled-components";
import CybersecurityRegImage from "../../assets/images/Registeration/CybersecurityRegPage.png";

export const Learn2CodePromotion = styled.div`
  background-image: url(${CybersecurityRegImage});
  background-size: cover;
  background-position: 45%;
  background-color: #70cc7c30;
  background-blend-mode: soft-light;
  border-radius: 7px;

  & #reg-promo-content {
    width: 80%;
    margin: 0px auto;
    color: white;
    height: 100%;
    padding: 40px 0;
    display: flex;
    flex-direction: column;

    & .brand-logo {
      font-weight: 600;
    }

    & .leading-title {
      margin: 40px 0 20px;
      font-size: 50px;
      width: min-content;
    }

    & .nav-links {
      display: flex;
      list-style: none;
      margin-top: auto;
      justify-content: space-between;
      width: 64%;
    }
  }
`;
