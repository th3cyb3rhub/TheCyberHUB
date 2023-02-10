import React from "react";
import {
    ContactFormCard,
    ContactFormContainer,
    ContactFormInput,
    ContactFormLabel,
    ContactFormSection,
    ContactFormSubmit,
    ContactFormTextArea,
    ContentH,
    ContentP,
    Cover,
    EmailIcon,
    MessageIcon,
    OrgIcon,
    PersonIcon,
    ReasonIcon,
    WebIcon,
    CoverLeft,
    CoverRight,
} from "./ContactFormElements.jsx";

const ContactForm = () => {
    return (
        <ContactFormContainer>
            <ContentH>
                See How We Can Secure Your Assets
                {/* Contact Us */}
            </ContentH>
            <ContentP>
                See How We Can Secure Your Assets Let’s talk about how Thecyber Security can solve your cybersecurity
                needs. Fill out the contact form below to get started.
                {/* email: info@thecyber-sec.com */}
            </ContentP>

            <ContactFormCard>
                <ContactFormSection action="mailto:info@thecyber-sec.com">
                    <Cover>
                        <CoverLeft>
                            <ContactFormLabel htmlFor="name">
                                <PersonIcon />
                            </ContactFormLabel>
                            <ContactFormInput type="text" name="name" id="name" placeholder={"Name"} />
                        </CoverLeft>
                        <CoverRight>
                            <ContactFormLabel htmlFor="name">
                                <EmailIcon />
                            </ContactFormLabel>
                            <ContactFormInput type="text" name="email" id="email" placeholder={"Email"} />
                        </CoverRight>
                    </Cover>

                    <Cover>
                        <CoverLeft>
                            <ContactFormLabel htmlFor="company">
                                <OrgIcon />
                            </ContactFormLabel>
                            <ContactFormInput type="text" name="company" id="company" placeholder={"Company"} />
                        </CoverLeft>
                        <CoverRight>
                            <ContactFormLabel htmlFor="website">
                                <WebIcon />
                            </ContactFormLabel>
                            <ContactFormInput type="text" name="website" id="website" placeholder={"Website"} />
                        </CoverRight>
                    </Cover>

                    <CoverLeft>
                        <ContactFormLabel htmlFor="reason">
                            <ReasonIcon />
                        </ContactFormLabel>
                        <ContactFormInput type="text" name="reason" id="reason" placeholder={"Reason for contact"} />
                    </CoverLeft>
                    <CoverLeft>
                        <ContactFormLabel htmlFor="message">
                            <MessageIcon />
                        </ContactFormLabel>
                        <ContactFormTextArea type="text" name="reason" id="message" placeholder={"Message"} />
                    </CoverLeft>
                    <ContactFormSubmit type="submit" value="submit" placeholder={"Submit"}>
                        Submit
                    </ContactFormSubmit>
                </ContactFormSection>
            </ContactFormCard>
        </ContactFormContainer>
    );
};

export default ContactForm;
