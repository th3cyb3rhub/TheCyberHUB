import React, { useEffect, useState } from "react";
import { JobsDetailSection } from "src/components/Dashboard/FormData/Jobs/JobsElements.jsx";
import JobDetailsPage from "src/components/Dashboard/FormData/Jobs/JobDetailsPage.jsx";
import { getApiUrl } from "src/features/apiUrl.js";
import { useParams } from "react-router-dom";

const Response = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState(null);

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem("user")).token;
        fetch(getApiUrl(`api/form/getFormData/${id}`), {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setFormData(data);
            });
    }, []);

    console.log(formData);

    return (
        <div>
            <JobsDetailSection style={{ float: "right", width: "30%" }}>
                <JobDetailsPage key={id} {...formData} />
            </JobsDetailSection>
        </div>
    );
};

export default Response;
