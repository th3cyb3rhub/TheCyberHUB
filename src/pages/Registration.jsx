import React from "react";
import { Container } from "../components/Registration";
import { CenterCard } from "../components/Registration/CenterCard";
import { Learn2CodePromotion } from "../components/Registration/Learn2CodePromotion";

const Registration = () => {
  return (
    <Container>
      <CenterCard>
        <Learn2CodePromotion>
          <div id="reg-promo-content">
            <span className="brand-logo">Thecyberworld</span>
            <h1 className="leading-title">Learn to Code Interactively For Free</h1>
            <span>Watch Demo</span>
            <ul className="nav-links">
              <li>Home</li>
              <li>Tour</li>
              <li>Courses</li>
              <li>Articles</li>
              <li>Blog</li>
            </ul>
          </div>
        </Learn2CodePromotion>
        <div></div>
      </CenterCard>
    </Container>
  );
};

export default Registration;
