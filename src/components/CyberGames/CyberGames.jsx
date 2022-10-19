import React from "react";
import { CTFGame, CyberGamesContainer, OSINTGame, CyberGamesImage } from "./CyberGamesElements";
import OSINTImage from "../../assets/CyberGames/OSINT.png";
import CTFImage from "../../assets/CyberGames/CTF.png";
const CyberGames = () => {
  return (
    <CyberGamesContainer>
      <CTFGame to={"CTF"}>
        <CyberGamesImage src={CTFImage} alt="CTFGameImage" />
      </CTFGame>
      <OSINTGame to={"OSINTGame"}>
        <CyberGamesImage src={OSINTImage} alt="OSINTGameImage" />
      </OSINTGame>
    </CyberGamesContainer>
  );
};

export default CyberGames;
