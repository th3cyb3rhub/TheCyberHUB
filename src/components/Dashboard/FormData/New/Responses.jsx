import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FormDataContainer } from "src/components/Dashboard/FormData/FormDataElements";
import { JobsCardSection, JobsDetailContainer, JobsDetailSection } from "src/components/Dashboard/FormData/Jobs/JobsElements";
import Job from "src/components/Dashboard/FormData/Jobs/Job";
import JobDetailsPage from "src/components/Dashboard/FormData/Jobs/JobDetailsPage";
import { Wrapper } from "src/components/Dashboard/Profile/ProfileElements";
import { NotFound } from "src/components/index";
import { getApiUrl } from "src/features/apiUrl";
import {
    InternshipButton,
    InternshipResponseContainer,
    MonthButton,
    SelectInternshipSection,
    SelectMonthSection,
} from "src/components/Dashboard/FormData/InternshipResponseElements";

const Responses = () => {
    const { user } = useSelector((state) => state.auth);
    const [formData, setFormData] = useState(null);
    const [isAuthorised, setIsAuthorised] = useState(false);
    const [errorMessage, setErrorMessage] = useState();
    const [selectedReasonType, setSelectedReasonType] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedJobId, setSelectedJobId] = useState(null);
    const [selectedJobDetails, setSelectedJobDetails] = useState(null);

    useEffect(() => {
        if (!user) return;

        setIsLoading(true);
        const token = JSON.parse(localStorage.getItem("user")).token;
        fetch(getApiUrl("api/form/getFormData"), {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setFormData(data);
                setIsAuthorised(data !== "User not authorized");
            })
            .catch((err) => {
                setErrorMessage(err.message);
            })
            .finally(() => setIsLoading(false));
    }, [user]);

    useEffect(() => {
        if (selectedJobId) {
            setIsLoading(true);
            const token = JSON.parse(localStorage.getItem("user")).token;
            fetch(getApiUrl(`api/form/getFormData/${selectedJobId}`), {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    setSelectedJobDetails(data);
                })
                .catch((err) => {
                    setErrorMessage(err.message);
                })
                .finally(() => setIsLoading(false));
        }
    }, [selectedJobId]);

    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const handleMonthClick = (month) => {
        setSelectedMonth(month);
    };

    const filteredData = selectedMonth
        ? formData.filter((data) => {
              const month = new Date(data.createdAt).getMonth();
              return month === selectedMonth;
          })
        : formData || [];

    const filteredFormData = selectedReasonType
        ? filteredData.filter((data) => data.reasonType === selectedReasonType)
        : filteredData;

    if (!user || !isAuthorised || isLoading) {
        return <NotFound />;
    }

    return (
        <Wrapper>
            <InternshipResponseContainer>
                <SelectMonthSection>
                    {months.map((month, index) => (
                        <MonthButton key={index} onClick={() => handleMonthClick(index)}>
                            {month}
                        </MonthButton>
                    ))}
                </SelectMonthSection>
                <SelectInternshipSection>
                    {Array.from(new Set(formData?.slice(0, 1)?.map((data) => data.reasonType)))
                        .filter((reasonType) => reasonType !== "Web Application Pentest" && reasonType !== "")
                        .map((reasonType, index) => (
                            <InternshipButton
                                key={index}
                                selected={selectedReasonType === reasonType}
                                onClick={() => setSelectedReasonType(reasonType)}
                            >
                                {reasonType}
                                <span>({filteredData.filter((data) => data.reasonType === reasonType).length})</span>
                            </InternshipButton>
                        ))}
                </SelectInternshipSection>
                <FormDataContainer>
                    {errorMessage && <p>{errorMessage}</p>}
                    <JobsDetailContainer id="jobs">
                        <JobsCardSection>
                            {filteredFormData?.map((data) => (
                                <div key={data._id} onClick={() => setSelectedJobId(data._id)}>
                                    <Job {...data} />
                                </div>
                            ))}
                        </JobsCardSection>
                        <JobsDetailSection style={{ float: "right", width: "30%" }}>
                            {selectedJobDetails && <JobDetailsPage {...selectedJobDetails} />}
                        </JobsDetailSection>
                    </JobsDetailContainer>
                </FormDataContainer>
            </InternshipResponseContainer>
        </Wrapper>
    );
};

export default Responses;
