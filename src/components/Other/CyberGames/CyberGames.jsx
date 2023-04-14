import React from "react";
import { CTFGame, CyberGamesContainer, OSINTGame, CyberGamesImage } from "./CyberGamesElements";
import { getCDNUrl } from "../../../features/apiUrl";
const OSINTImage = `${getCDNUrl}/images/assets/images/CyberGames/OSINT.png`;
const CTFImage = `${getCDNUrl}/images/assets/images/CyberGames/CTF.png`;
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
