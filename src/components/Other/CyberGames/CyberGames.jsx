import React from "react";
import { CTFGame, CyberGamesContainer, OSINTGame, CyberGamesImage } from "./CyberGamesElements";
import { getCdnAssets } from "../../../features/apiUrl";
const OSINTImage = `${getCdnAssets}/images/CyberGames/OSINT.png`;
const CTFImage = `${getCdnAssets}/images/CyberGames/CTF.png`;
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
