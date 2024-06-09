import React from "react";
import Room from "src/components/WebSecurity/Common/LabsRoom/LabsRoom";
import { LabData } from "src/components/WebSecurity/Common/Labs/LabsData";

const WebSecurityRoom = () => {
    return <Room roomData={LabData} />;
};

export default WebSecurityRoom;
