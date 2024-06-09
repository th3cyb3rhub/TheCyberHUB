import React from "react";
import { Wrapper } from "src/components/Dashboard/Profile/ProfileElements";
import { TermsAndConditionContainer, TermsDescription, TermsHeading } from "./TermsAndConditionElements";

const TermsAndCondition = () => {
    return (
        <Wrapper>
            <h1> Terms and Conditions </h1>
            <TermsAndConditionContainer>
                <TermsHeading> Terms and Conditions: </TermsHeading>
                <TermsDescription>
                    Welcome to Thecyberhub.org, a platform that provides resources, free courses, blogs, and job
                    opportunities to its users. By accessing or using the services provided by Thecyberhub.org, you
                    agree to be bound by the terms and conditions set forth in this agreement. Introduction:
                </TermsDescription>

                <TermsHeading> User Eligibility: </TermsHeading>
                <TermsDescription>
                    The services provided by Thecyberhub.org are available to all individuals. No restrictions based on
                    age are placed on the use of the services provided by Thecyberhub.org.
                </TermsDescription>

                <TermsHeading> User Accounts: </TermsHeading>
                <TermsDescription>
                    In order to access certain features of Thecyberhub.org, you will need to create a user account. When
                    creating your account, you must provide accurate and complete information. You are responsible for
                    maintaining the confidentiality of your account information and are fully responsible for all
                    activities that occur under your account.
                </TermsDescription>

                <TermsHeading> User Content: </TermsHeading>
                <TermsDescription>
                    Thecyberhub.org may allow you to post, upload, publish, or otherwise transmit content, including but
                    not limited to text, photos, videos, and audio. You retain all rights in the content you make
                    available through the services. By making any such content available, you grant to Thecyberhub.org a
                    non-exclusive, transferable, sub-licensable, royalty-free, worldwide license to use, copy, modify,
                    create derivative works based on, distribute, publicly display, publicly perform, and otherwise
                    exploit such content in connection with Thecyberhub.org&quot;s services.
                </TermsDescription>

                <TermsHeading> Proprietary Rights: </TermsHeading>
                <TermsDescription>
                    Thecyberhub.org and its licensors own all right, title and interest in and to the services,
                    including all software and technology used to provide the services. Thecyberhub.org&quot;s services
                    are protected by copyright, trademark, and other laws of both the India and foreign countries. You
                    agree not to modify, adapt, translate, prepare derivative works from, decompile, reverse engineer,
                    disassemble or otherwise attempt to derive source code from Thecyberhub.org&quot;s services.
                </TermsDescription>

                <TermsHeading> Disclaimer of Warranties: </TermsHeading>
                <TermsDescription>
                    Thecyberhub.org&quot;s services are provided on an &quot;as is&quot; and &quot;as available&quot;
                    basis. Thecyberhub.org makes no representations or warranties of any kind, express or implied, as to
                    the operation of the services or the information, content, materials, or products included on the
                    services.
                </TermsDescription>

                <TermsHeading> Limitation of Liability: </TermsHeading>
                <TermsDescription>
                    In no event shall Thecyberhub.org be liable for any damages of any kind arising from the use of the
                    services, including but not limited to direct, indirect, incidental, punitive, and consequential
                    damages.
                </TermsDescription>

                <TermsHeading> Modification of Terms: </TermsHeading>
                <TermsDescription>
                    Thecyberhub.org reserves the right to modify the terms and conditions of this agreement at any time
                    without prior notice. Your continued use of the services following any such modification constitutes
                    your agreement to be bound by the modified terms and conditions.
                </TermsDescription>

                <TermsHeading> Governing Law: </TermsHeading>
                <TermsDescription>
                    These terms and conditions shall be governed by and construed in accordance with the laws of the
                    India.
                </TermsDescription>
            </TermsAndConditionContainer>
        </Wrapper>
    );
};

export default TermsAndCondition;
