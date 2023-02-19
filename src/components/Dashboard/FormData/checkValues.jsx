import React, { useEffect } from "react";
import axios from "axios";
import { Checkbox, CheckValuesContainer, Label } from "./CheckValuesElements";
import { DetailsText } from "./Jobs/JobDetailsElements";

const CheckValues = (props) => {
    const [values, setValues] = React.useState({
        id: props.id,
        checked: false,
        rejected: false,
        emailSent: false,
    });

    useEffect(() => {
        setValues({
            ...values,
            checked: props.checked,
            rejected: props.rejected,
            emailSent: props.emailSent,
        });
    }, [props.checked, props.rejected, props.emailSent]);

    const handleInputChange = (event) => {
        const { name, type, checked, value } = event.target;

        setValues((prevValues) => ({
            ...prevValues,
            [name]: type === "checkbox" ? checked : value,
        }));

        handleSubmit(event); // call handleSubmit function on every checkbox value change
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post("/api/form/updateForm", values);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <CheckValuesContainer>
            <form onSubmit={handleSubmit}>
                <DetailsText>
                    <Label>
                        Checked:
                        <Checkbox
                            type="checkbox"
                            name="checked"
                            checked={values.checked}
                            onChange={handleInputChange}
                        />
                    </Label>
                </DetailsText>
                <DetailsText>
                    <Label>
                        Rejected:
                        <Checkbox
                            type="checkbox"
                            name="rejected"
                            checked={values.rejected}
                            onChange={handleInputChange}
                        />
                    </Label>
                </DetailsText>
                <DetailsText>
                    <Label>
                        Email Sent:
                        <Checkbox
                            type="checkbox"
                            name="emailSent"
                            checked={values.emailSent}
                            onChange={handleInputChange}
                        />
                    </Label>
                </DetailsText>
            </form>
        </CheckValuesContainer>
    );
};

export default CheckValues;
