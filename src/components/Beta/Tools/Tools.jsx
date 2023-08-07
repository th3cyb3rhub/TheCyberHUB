import React from "react"; // , {useEffect, useState}
import { Wrapper } from "../../Dashboard/Profile/ProfileElements";
import { CardToolHeading, CardTools, ContainerTools, RouterLink } from "./ToolsElements";
// import UnderMaintenance from "../../Other/UnderMaintenance/UnderMaintenance";
// import {CircleSpinner} from "react-spinners-kit";
// import apiStatus from "../../../features/apiStatus";
import {
    // CgOpenCollective,
    RiEarthFill,
} from "react-icons/ri";

const Tools = () => {
    // const {isApiLoading, isApiWorking} = apiStatus();
    // const [isLoading, setIsLoading] = useState(true);

    // useEffect(() => {
    //     setTimeout(() => {
    //         setIsLoading(false);
    //     }, 100);
    // }, []);

    // if (isLoading) {
    //     return (
    //         <Wrapper>
    //             <CircleSpinner size={20} color={"#1fc10d"} isLoading={isLoading}/>
    //         </Wrapper>
    //     );
    // }

    // if (!isApiWorking) {
    //     return <UnderMaintenance/>;
    // }

    return (
        <Wrapper>
            <ContainerTools>
                <RouterLink to={"subdomainFinder"}>
                    <CardTools>
                        <CardToolHeading>
                            <RiEarthFill /> Subdomain Finder
                        </CardToolHeading>
                    </CardTools>
                </RouterLink>
                {/* <RouterLink to={"portScanner"}> */}
                {/*    <CardTools> */}
                {/*        <CardToolHeading> */}
                {/*            <CgOpenCollective/> Port Scanner */}
                {/*        </CardToolHeading> */}
                {/*    </CardTools> */}
                {/* </RouterLink> */}
                <RouterLink to={"./"}>
                    <CardTools>
                        <CardToolHeading>Coming Soon</CardToolHeading>
                    </CardTools>
                </RouterLink>
            </ContainerTools>
        </Wrapper>
    );
};

export default Tools;
