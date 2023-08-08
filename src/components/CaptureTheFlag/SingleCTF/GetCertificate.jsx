import React from "react";
import { Link } from "react-router-dom";
import { GetCertificateContainer } from "./GetCertificateElements";
// import {RefreshButton} from "../CTFLeaderboard/CTFLeaderboardElements";
// import {getUserDetail} from "../../../../../features/userDetail/userDetailSlice";
// import {useDispatch, useSelector} from "react-redux";

const GetCertificate = ({ ctfCertificates, ctfId, user, isCompleted, isCertExisted }) => {
    // const dispatch = useDispatch();
    // const {user} = useSelector((state) => state.auth);
    // const handleRefresh = () => {
    //     dispatch(getUserDetail(user.username));
    // };
    const certificateId = ctfCertificates?.find((cert) => cert.ctfId === ctfId)?.ctfCertificateId;
    let redirectUrlParams = `/@${user}`;
    if (certificateId === undefined) {
        redirectUrlParams = `/@${user.username}`;
    } else {
        redirectUrlParams = `/CTF/certificate/${certificateId}`;
    }
    return (
        <GetCertificateContainer>
            {isCertExisted || (ctfCertificates && ctfCertificates.find((ctf) => ctf.ctfId === ctfId)) ? (
                <div>
                    <h2 style={{ color: "#bdbdbd" }}>Congratulations!</h2>
                    <h3 style={{ color: "#bdbdbd" }}>You have completed this CTF!</h3>
                    <Link to={redirectUrlParams}>
                        <h4 style={{ color: "#00b2ff" }}>Click here to get your Certificate</h4>
                    </Link>
                </div>
            ) : (
                <div>
                    <h1>
                        Get Your Certificate
                        {/* <RefreshButton onClick={handleRefresh}/> */}
                    </h1>

                    <h2>Sorry! You have not completed this CTF yet!</h2>
                </div>
            )}
        </GetCertificateContainer>
    );
};

export default GetCertificate;
