import React from "react";
import { crackmeLabData } from "./CrackMeData";
import Room from "src/components/WebSecurity/Common/LabsRoom/LabsRoom";

const CrackMeRoom = () => {
    return <Room roomData={crackmeLabData} />;
};

export default CrackMeRoom;
