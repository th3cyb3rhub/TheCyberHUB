import React from "react";
import { Link } from "react-router-dom";
import { GetCertificateContainer } from "./GetCertificateElements";
// import {RefreshButton} from "../CTFLeaderboard/CTFLeaderboardElements";
// import {getUserDetail} from "../../../../../features/userDetail/userDetailSlice";
// import {useDispatch, useSelector} from "react-redux";

const GetCertificate = ({ userDetail, ctfId, isCompleted, isCertExisted }) => {
    const ctfCertificates = userDetail?.ctfCertificates;
    // const dispatch = useDispatch();
    // const {user} = useSelector((state) => state.auth);
    // const handleRefresh = () => {
    //     dispatch(getUserDetail(user.username));
    // };
    return (
        <GetCertificateContainer>
            {isCertExisted || (ctfCertificates && ctfCertificates.find((ctf) => ctf.ctfId === ctfId)) ? (
                <div>
                    <h1>Congratulations!</h1>
                    <h3>You have completed this CTF!</h3>
                    <Link to={`/CTF/certificate/${ctfId}`}>
                        <h4 style={{ color: "greenyellow" }}>Click here to get your Certificate</h4>
                    </Link>
                </div>
            ) : (
                <div>
                    <h1>
                        {" "}
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
