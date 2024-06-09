import React, { useState } from "react";
import { createCTF } from "src/features/ctf/ctfSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    AddResourceInputs,
    AddResourceSection,
    AddTag,
    CreateCTFButton,
    CreateCTFContainer,
    CreateCTFForm,
    CreateCTFInput,
    CreateCTFTextarea,
    FlagContainer,
    FlagsContainer,
    Tags,
} from "./CreateCTFElements";
import { Wrapper } from "src/components/Dashboard/Profile/ProfileElements";
import { NotFound } from "src/components/index";

const CreateCTF = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

    // if (!user) {
    //     return <NotFound />;
    // }

    if (user && user.userType !== "admin") {
        return <NotFound />;
    }

    const currentDate = new Date();
    const options = { timeZone: "Asia/Kolkata" };
    const ISTDate = currentDate.toLocaleString("en-US", options);

    const [formData, setFormData] = useState({
        downloadableResources: [],
        createdBy: { user, username: user.username },
        challengeName: "",
        subtitle: "",
        challengeDescription: "",
        challengeLink: "",
        machineName: "",
        machineOS: "",
        difficulty: "",
        type: "",
        flags: [{ flag: "", ques: "", hint: "", points: "" }],
        tags: [""],
        startTime: "" || ISTDate,
        isApproved: false,
        isPublic: false,
        machineIp: "",
        machineLink: "",
    });

    const handleTagsChange = (e, index) => {
        const { value } = e.target;

        const updatedTags = [...formData.tags];
        updatedTags[index] = value;
        setFormData({ ...formData, tags: updatedTags });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleFlagChange = (e, index) => {
        const { name, value } = e.target;
        const updatedFlags = [...formData.flags];
        updatedFlags[index][name] = value;
        setFormData({ ...formData, flags: updatedFlags });
    };

    const handleAddFlag = () => {
        setFormData({
            ...formData,
            flags: [...formData.flags, { flag: "", ques: "", hint: "", points: "" }],
        });
    };
    const handleRemoveFlag = (index) => {
        const updatedFlags = [...formData.flags];
        updatedFlags.splice(index, 1);
        setFormData({ ...formData, flags: updatedFlags });
    };

    const handleAddTag = () => {
        setFormData({
            ...formData,
            tags: [...formData.tags, ""],
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createCTF(formData));
        setFormData({});
        navigate("/ctf");
    };

    const handleAddResource = () => {
        setFormData((prevState) => ({
            ...prevState,
            downloadableResources: [...prevState.downloadableResources, { resourceName: "", resourceLink: "" }],
        }));
    };

    const handleResourceChange = (index, field, value) => {
        setFormData((prevState) => {
            const updatedResources = [...prevState.downloadableResources];
            updatedResources[index][field] = value;
            return { ...prevState, downloadableResources: updatedResources };
        });
    };

    return (
        <Wrapper>
            <CreateCTFContainer>
                <CreateCTFForm onSubmit={handleSubmit}>
                    <CreateCTFInput
                        type="text"
                        placeholder={"Challenge Name"}
                        id="challengeName"
                        name="challengeName"
                        value={formData.challengeName}
                        onChange={handleInputChange}
                    />

                    <CreateCTFInput
                        type="text"
                        placeholder={"Sub Title: short info about this ctf"}
                        id="subtitle"
                        name="subtitle"
                        value={formData.subtitle}
                        onChange={handleInputChange}
                    />

                    <CreateCTFTextarea
                        type="text"
                        placeholder={"Description"}
                        id="challengeDescription"
                        name="challengeDescription"
                        value={formData.challengeDescription}
                        onChange={handleInputChange}
                    />

                    <CreateCTFInput
                        type="text"
                        placeholder={"Machine Link"}
                        id="machineLink"
                        name="machineLink"
                        value={formData.machineLink}
                        onChange={handleInputChange}
                    />

                    <CreateCTFInput
                        type="text"
                        placeholder={"Starting Time"}
                        id="startTime"
                        name="startTime"
                        value={formData.startTime}
                        onChange={handleInputChange}
                    />

                    {formData.tags.map((tag, index) => (
                        <Tags key={index}>
                            <AddTag
                                placeholder={"Tag"}
                                type="text"
                                name={`tags-${index}`}
                                value={tag}
                                onChange={(e) => handleTagsChange(e, index)}
                            />
                            <CreateCTFButton
                                type="button"
                                onClick={handleAddTag}
                                disabled={index !== formData.tags.length - 1}
                            >
                                +
                            </CreateCTFButton>
                        </Tags>
                    ))}

                    <CreateCTFInput
                        type="text"
                        id="difficulty"
                        placeholder={"difficulty: info easy medium hard or insane"}
                        name="difficulty"
                        value={formData.difficulty}
                        onChange={handleInputChange}
                    />

                    <CreateCTFInput
                        type="text"
                        id="type"
                        placeholder={"Type: CTF / Walkthrough / Learning"}
                        name="type"
                        value={formData.type}
                        onChange={handleInputChange}
                    />

                    <AddResourceSection>
                        {formData.downloadableResources.map((resource, index) => (
                            <AddResourceInputs key={index}>
                                <CreateCTFInput
                                    type="text"
                                    placeholder={"Resource Name"}
                                    id={`resourceName-${index}`}
                                    name={`resourceName-${index}`}
                                    value={resource.resourceName}
                                    onChange={(e) => handleResourceChange(index, "resourceName", e.target.value)}
                                />
                                <CreateCTFInput
                                    type="text"
                                    placeholder={"Resource Link"}
                                    id={`resourceLink-${index}`}
                                    name={`resourceLink-${index}`}
                                    value={resource.resourceLink}
                                    onChange={(e) => handleResourceChange(index, "resourceLink", e.target.value)}
                                />
                            </AddResourceInputs>
                        ))}
                        <CreateCTFButton type="button" onClick={handleAddResource}>
                            Add Downloadable Resource
                        </CreateCTFButton>
                    </AddResourceSection>

                    <FlagsContainer>
                        <h3>Flags:</h3>
                        {formData.flags.map((flag, index) => (
                            <FlagContainer key={index}>
                                <CreateCTFInput
                                    type="text"
                                    placeholder={"ques"}
                                    id={`ques-${index}`}
                                    name="ques"
                                    value={flag.ques}
                                    onChange={(e) => handleFlagChange(e, index)}
                                />
                                <CreateCTFInput
                                    type="text"
                                    placeholder={"flag"}
                                    id={`flag-${index}`}
                                    name="flag"
                                    value={flag.flag}
                                    onChange={(e) => handleFlagChange(e, index)}
                                />
                                <CreateCTFInput
                                    type="text"
                                    placeholder={"hint"}
                                    id={`hint-${index}`}
                                    name="hint"
                                    value={flag.hint}
                                    onChange={(e) => handleFlagChange(e, index)}
                                />
                                <CreateCTFInput
                                    type="text"
                                    placeholder={"points: 5 10 25 50"}
                                    id={`points-${index}`}
                                    name="points"
                                    value={flag.points}
                                    onChange={(e) => handleFlagChange(e, index)}
                                />
                                <CreateCTFButton type="button" onClick={() => handleRemoveFlag(index)}>
                                    Remove
                                </CreateCTFButton>
                            </FlagContainer>
                        ))}
                        <br />

                        <CreateCTFButton type="button" onClick={handleAddFlag}>
                            Add Flag
                        </CreateCTFButton>
                    </FlagsContainer>
                    <CreateCTFButton type="submit">Submit</CreateCTFButton>
                </CreateCTFForm>
            </CreateCTFContainer>
        </Wrapper>
    );
};

export default CreateCTF;
