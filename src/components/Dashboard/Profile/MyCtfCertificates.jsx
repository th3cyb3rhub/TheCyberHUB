import React from "react";
import {
    CtfCertificateCard,
    CtfCertificateCards,
    CtfDate,
    CtfKind,
    CtfName,
    MyCtfCertificatesContainer,
    TheCyberCTFCertificates,
} from "./MyCtfCertificatesElements";
import { Link } from "react-router-dom";

const MyCtfCertificates = ({ ctfCertificates }) => {
    return (
        <MyCtfCertificatesContainer>
            <TheCyberCTFCertificates> TheCyberCTF Certificates </TheCyberCTFCertificates>

            <CtfCertificateCards>
                {ctfCertificates && ctfCertificates.length === 0
                    ? null
                    : ctfCertificates?.map((certificate, index) => (
                          <Link to={`/CTF/certificate/${certificate.ctfCertificateId}`} key={index}>
                              <CtfCertificateCard key={index}>
                                  <CtfName>{certificate.ctf}</CtfName>
                                  <CtfKind>
                                      {certificate.kind} on <CtfDate>{certificate.issueDate.split("T")[0]}</CtfDate>{" "}
                                  </CtfKind>
                              </CtfCertificateCard>
                          </Link>
                      ))}
            </CtfCertificateCards>
        </MyCtfCertificatesContainer>
    );
};

export default MyCtfCertificates;
