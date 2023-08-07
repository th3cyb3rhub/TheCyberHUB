import React from "react";
import { ScaleLoader } from "react-spinners";
import { SpinnerSection } from "./SpinnerElements";
// import logo from "../../../../assets/images/loading.gif";
const Spinner = ({ loading, key }) => {
    return (
        <div>
            {/* <SpinnerImage src={logo} alt=""/> */}
            <SpinnerSection>
                <ScaleLoader color={"#20c20e"} loading={loading} size={50} key={key} />
            </SpinnerSection>
        </div>
    );
};

export default Spinner;
