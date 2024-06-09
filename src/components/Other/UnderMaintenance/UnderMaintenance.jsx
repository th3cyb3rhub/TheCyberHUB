import React from "react";
import { UnderMaintenanceContainer, UnderMaintenanceLogo } from "./UnderMaintenanceElements";

import UnderMaintenancePNG from "src/assets/underMaintenance.png";
const UnderMaintenance = () => {
    return (
        <UnderMaintenanceContainer>
            <UnderMaintenanceLogo src={UnderMaintenancePNG} alt="" />
            <h1> Under Maintenance </h1>
        </UnderMaintenanceContainer>
    );
};

export default UnderMaintenance;
