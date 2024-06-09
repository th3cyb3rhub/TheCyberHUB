import React from "react";
import Labs from "src/components/WebSecurity/Common/Labs/Labs";
import { LabData } from "src/components/WebSecurity/Common/Labs/LabsData";

const WebSecurityLabs = () => {
    return <Labs LabData={LabData} heading={"Labs"} />;
};

export default WebSecurityLabs;
