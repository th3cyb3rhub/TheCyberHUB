import React, { useEffect, useState } from "react";
import {
    Button,
    ButtonGreen,
    CheckValuesContainer,
    ContactFormSelect,
    ContactFormSelectOption,
} from "./CheckValuesElements";
import { LoadingButton } from "../../Other/MixComponents/Buttons/ButtonElements";
import { CircleSpinner } from "react-spinners-kit";
import { TextArea } from "../../Blogs/ManageBlogs/CreateBlog/CreateBlogElements";
import axios from "axios";
import { getApiUrl } from "../../../features/apiUrl";
import { toast } from "react-toastify";
import { DetailsText } from "./Jobs/JobDetailsElements";

const CheckValues = (props) => {
    const [values, setValues] = useState({
        id: props.id,
        checked: props.checked || false,
        accepted: props.accepted || false,
        hired: props.hired || false,
        rejected: props.rejected || false,
        resumePending: props.resumePending || false,
        rejectedReason: props.rejectedReason || "",
    });

    const [isLoading, setIsLoading] = useState(false);

    const rejectedMessages = [
        "Although your application was strong, we found that other candidates better met our current needs and requirements.",
        "After careful consideration, we have decided that your skills and experience do not match our current expectations for the position at TheCyberSEC.",
        "We received a large number of highly qualified applications, and unfortunately, we were not able to move forward with all candidates.",
        "While we appreciated your interest in the position, we found that your qualifications and experience did not align with our current needs and expectations.",
        "Although you demonstrated some impressive skills and experience, we found that your application was missing some specific skills that we consider essential for this position.",
        "We appreciate the time and effort you invested in your application. However, after careful review, we have decided not to move forward with your candidacy.",
        "Unfortunately, we cannot offer you the position at this time. We encourage you to continue to pursue your career goals and to keep an eye out for future opportunities with TheCyberSEC.",
        "We found that your application did not fully showcase your skills and achievements, and we suggest reviewing your application to ensure it clearly highlights your relevant experience and accomplishments. Attention to detail and effective communication are important skills for this role and we believe that with some additional effort and refinement, you can improve your application for future opportunities.",
    ];
    const emailMessages = {
        checked: {
            subject: "Application Status Update - TheCyberSEC",
            message: `Dear Applicant,\n\nWe hope this email finds you well. This is to inform you that we have checked your application and we are currently reviewing it. We appreciate your patience as we continue to process your application. We will get back to you soon with an update on the status of your application.\n\nThank you for your interest in working with TheCyberSEC. \n\nBest Regards,\nTheCyberSEC Team`,
        },
        accepted: {
            subject: "Congratulations! Your Application has been Accepted - TheCyberSEC",
            message: `Dear Applicant,\n\nWe are delighted to inform you that your application for the ${props.reasonType} TheCyberSEC has been accepted. We appreciate the time and effort you put into your application and we are impressed by your qualifications and experience. We would like to schedule an interview with you to discuss the position and your availability. Please let us know which date and time work for you between Monday to Saturday, from 11am to 2pm.\n\nWe look forward to hearing from you soon.\n\nBest Regards,\nTheCyberSEC Team`,
        },
        hired: {
            subject: "Internship Offer - Your Application for TheCyberSEC",
            message: `Dear ${props.name},

We are pleased to offer you the ${props.reasonType} at TheCyberSEC. We were impressed by your qualifications, experience, and passion for the field, and we believe that you will make a valuable contribution to our team.

As an intern with TheCyberSEC, you will have the opportunity to gain hands-on experience in a dynamic and innovative environment. You will work closely with experienced professionals and have the chance to develop your skills and knowledge in [specific areas or projects].

Your start date is [start date], and we will send you the necessary paperwork and orientation materials via email. During the internship, you will be expected to work [number of hours per week], and we will provide you with guidance and support to ensure a successful experience.

We are excited to have you on board and look forward to seeing you grow and thrive in your role. If you have any questions or concerns, please do not hesitate to reach out to us.

Best regards,
TheCyberSEC Team`,
        },
        rejected: {
            subject: "Application Update - TheCyberSEC",
            message: `Dear Applicant,\n\nWe regret to inform you that we have decided not to move forward with your application for the ${props.reasonType} TheCyberSEC. We appreciate your interest in working with us and we commend your effort and qualifications. Unfortunately, we received a large volume of applications, and we had to make tough decisions.
             \n${values.rejectedReason}\n
             Please do not take this decision personally and continue to pursue your career goals.\n\nWe wish you all the best in your future endeavors.\n\nBest Regards,\nTheCyberSEC Team`,
        },
        resumePending: {
            subject: "Application Status Update - TheCyberSEC",
            message: `Dear Applicant,\n\nWe hope this email finds you well. This is to inform you that we have received your application and we are currently reviewing it.\n\nThank you for your interest in the position at TheCyberSEC. We attempted to view your resume using the link you provided, but we were unable to access it due to a permission issue. We encourage you to double-check the link to ensure that it is accessible to us.\nOnce the link is accessible, we will be able to review your resume and move forward with your application.\n\nThank you for your interest in working with TheCyberSEC. \n\nBest Regards,\nTheCyberSEC Team`,
        },
    };

    useEffect(() => {
        setValues({
            id: props.id,
            checked: props.checked,
            accepted: props.accepted,
            hired: props.hired,
            resumePending: props.resumePending,
            rejected: props.rejected,
            rejectedReason: props.rejectedReason,
        });
    }, [props.id]);

    const handleButtonClick = async (buttonName) => {
        setIsLoading(true);
        try {
            setValues({ ...values, [buttonName]: true });
            if (buttonName === "rejected") {
                await axios.post(getApiUrl("api/form/updateForm"), {
                    ...values,
                    id: props.id,
                    [buttonName]: true,
                    rejectedReason: values.rejectedReason,
                });
            } else {
                await axios.post(getApiUrl("api/form/updateForm"), {
                    ...values,
                    id: props.id,
                    [buttonName]: true,
                });
            }
            const token = JSON.parse(localStorage.getItem("user")).token;
            await axios
                .post(
                    getApiUrl("api/form/sendEmail"),
                    {
                        email: props.email,
                        subject: emailMessages[buttonName].subject,
                        message: emailMessages[buttonName].message.replace(/\n/g, "<br>"),
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    },
                )
                .then((response) => {
                    if (response.data.message === "Email sent successfully") {
                        toast("to: " + props.email);
                        toast("subject: " + emailMessages[buttonName].subject);
                        toast("message: " + emailMessages[buttonName].message.replace(/\n/g, "<br>"));
                        setIsLoading(false);
                    }
                    toast.success(response.data.message);
                    if (response.data.message === "Something went wrong. Please try again later.") {
                        toast.error("Something went wrong. Please try again later.");
                    }
                })
                .catch((error) => {
                    if (error.message === "Network Error") {
                        toast.error("Network Error. Please check your internet connection.");
                    } else if (error.response.status === 429) {
                        toast.error("Please wait 1 Minute before submitting again");
                    } else {
                        toast.error("Something went wrong. Please try again later.");
                    }
                });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <CheckValuesContainer>
            <div>
                {isLoading ? (
                    <LoadingButton width={"100%"}>
                        <CircleSpinner size={20} color={"#131313"} />
                    </LoadingButton>
                ) : null}
                {!props.checked ? (
                    <Button value={props.checked} color={"yellowgreen"} onClick={() => handleButtonClick("checked")}>
                        Checked
                    </Button>
                ) : (
                    <ButtonGreen> Checked </ButtonGreen>
                )}
                {!props.accepted ? (
                    <Button value={props.accepted} color={"yellowgreen"} onClick={() => handleButtonClick("accepted")}>
                        Accepted
                    </Button>
                ) : (
                    <ButtonGreen> Accepted </ButtonGreen>
                )}
                {!props.hired ? (
                    <Button value={props.hired} color={"yellowgreen"} onClick={() => handleButtonClick("hired")}>
                        Hired
                    </Button>
                ) : (
                    <ButtonGreen> Hired </ButtonGreen>
                )}

                {!props.resumePending ? (
                    <Button
                        value={props.resumePending}
                        color={"yellowgreen"}
                        onClick={() => handleButtonClick("resumePending")}
                    >
                        Resume
                    </Button>
                ) : (
                    <ButtonGreen> Resume </ButtonGreen>
                )}
                <br />

                {!props.rejected ? (
                    <>
                        <ContactFormSelect
                            name="rejectedReason"
                            id="rejectedReason"
                            value={values.rejectedReason}
                            onChange={(e) => setValues({ rejectedReason: e.target.value })}
                        >
                            <ContactFormSelectOption value="">Select Rejection Message</ContactFormSelectOption>
                            {rejectedMessages?.map((message, id) => {
                                return (
                                    <ContactFormSelectOption key={id} value={message}>
                                        {message}
                                    </ContactFormSelectOption>
                                );
                            })}
                        </ContactFormSelect>
                        <TextArea
                            style={{ height: "150px", fontSize: "1rem" }}
                            type="text"
                            id="rejectedReason"
                            name="rejectedReason"
                            placeholder="Rejected Reason"
                            value={values.rejectedReason}
                            onChange={(e) => setValues({ rejectedReason: e.target.value })}
                        />
                    </>
                ) : (
                    <DetailsText>{props.rejectedReason}</DetailsText>
                )}
                {!props.rejected ? (
                    <Button value={props.rejected} color={"yellowgreen"} onClick={() => handleButtonClick("rejected")}>
                        Rejected
                    </Button>
                ) : (
                    <ButtonGreen> Rejected </ButtonGreen>
                )}
            </div>
        </CheckValuesContainer>
    );
};

export default CheckValues;
