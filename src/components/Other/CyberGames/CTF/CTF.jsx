import React, { useEffect, useState } from "react";
// import {Link} from 'react-router-dom';
import { Wrapper } from "../../../Dashboard/Profile/ProfileElements";
import { getAllCTFs } from "../../../../features/ctf/ctfSlice";
import { useDispatch, useSelector } from "react-redux";
import {
    CTFCard,
    CTFCardBody,
    CTFCardFooter,
    CTFCardHeader,
    CTFCards,
    CTFCardSubtitle,
    CTFContainer,
    CTFHeader,
    CTFHeading,
    CTFLink,
    CTFTag,
    CTFTags,
    CTFType,
    Option,
    SearchBox,
    SearchContainer,
    SearchDifficulty,
    SearchIcon,
    SearchInput,
    Select,
} from "./CTFElements";
import { FcCheckmark } from "react-icons/all";
// import {Heading2} from "../../../Blogs/ManageBlogs/CreateBlog/CreateBlogElements";
import { getUserDetail } from "../../../../features/userDetail/userDetailSlice";

const CTF = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const {
        userDetail,
        // isLoading,
        // isError, message
    } = useSelector((state) => state.userDetail);

    useEffect(() => {
        dispatch(getAllCTFs());
        if (user) {
            dispatch(getUserDetail(user.username));
        }
    }, [dispatch]);
    const { ctf } = useSelector((state) => state.ctf);

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedDifficulty, setSelectedDifficulty] = useState("all");
    const [selectedType, setSelectedType] = useState("all");
    const [filteredCTFs, setFilteredCTFs] = useState(ctf);

    useEffect(() => {
        const filteredCTFs = Array.isArray(ctf)
            ? ctf.filter((challenge) => {
                  const nameMatches = challenge?.challengeName?.toLowerCase().includes(searchTerm?.toLowerCase());
                  const difficultyMatches =
                      selectedDifficulty === "all" || challenge?.difficulty === selectedDifficulty;
                  const typeMatches = selectedType === "all" || challenge?.type === selectedType;
                  return nameMatches && difficultyMatches && typeMatches;
              })
            : [];
        setFilteredCTFs(filteredCTFs);
    }, [ctf, searchTerm, selectedDifficulty, selectedType]);

    const handleSearchTermChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleTypeSelect = (event) => {
        setSelectedType(event.target.value);
    };

    const handleDifficultySelect = (event) => {
        setSelectedDifficulty(event.target.value);
    };

    return (
        <Wrapper>
            <CTFContainer>
                <CTFHeader>
                    <CTFHeading> Capture The Flag</CTFHeading>
                </CTFHeader>
                {/* <Link to={`create`}> */}
                {/*    <Heading2>Create</Heading2> */}
                {/* </Link> */}

                <SearchContainer>
                    <SearchBox>
                        <SearchIcon />
                        <SearchInput
                            type="text"
                            placeholder="Search by name"
                            value={searchTerm}
                            onChange={handleSearchTermChange}
                        />
                    </SearchBox>
                    <SearchDifficulty>
                        Type
                        <Select value={selectedType} onChange={handleTypeSelect}>
                            <Option value="all"> All </Option>
                            <Option value="ctf"> CTF </Option>
                            <Option value="walkthrough"> Walkthrough </Option>
                            <Option value="learning"> Learning </Option>
                        </Select>
                    </SearchDifficulty>

                    <SearchDifficulty>
                        Difficulty
                        <Select value={selectedDifficulty} onChange={handleDifficultySelect}>
                            <Option value="all"> All </Option>
                            <Option value="info"> info </Option>
                            <Option value="easy"> easy </Option>
                            <Option value="medium"> medium </Option>
                            <Option value="hard"> hard </Option>
                            <Option value="insane"> insane </Option>
                        </Select>
                    </SearchDifficulty>
                </SearchContainer>

                <CTFCards>
                    {filteredCTFs?.map((challenge, index) => (
                        <CTFLink to={`/ctf/${challenge?._id}`} key={index}>
                            <CTFCard>
                                <CTFCardHeader>
                                    {challenge?.challengeName}
                                    {user &&
                                        userDetail?.solved?.map((ctf, index) =>
                                            challenge?._id === ctf?.ctfId && ctf?.isCompleted === true ? (
                                                <FcCheckmark key={index} color="green" size={25} />
                                            ) : null,
                                        )}
                                </CTFCardHeader>

                                <CTFCardBody>
                                    <CTFCardSubtitle>{challenge?.subtitle}</CTFCardSubtitle>
                                </CTFCardBody>

                                <CTFCardFooter>
                                    <CTFTags>
                                        {challenge?.tags.map((tag, index) => (
                                            <CTFTag key={index}>{tag}</CTFTag>
                                        ))}
                                    </CTFTags>
                                    <CTFType>{challenge?.difficulty}</CTFType>
                                </CTFCardFooter>
                            </CTFCard>
                        </CTFLink>
                    ))}
                </CTFCards>
            </CTFContainer>
        </Wrapper>
    );
};

export default CTF;
