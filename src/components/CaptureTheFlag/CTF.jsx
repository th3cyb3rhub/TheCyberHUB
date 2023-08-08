import React, { useEffect, useState } from "react";
import { Wrapper } from "../Dashboard/Profile/ProfileElements";
import { getAllCTFs } from "../../features/ctf/ctfSlice";
import { useDispatch, useSelector } from "react-redux";
import {
    CTFContainer,
    CTFHeader,
    CTFHeading,
    Option,
    SearchBox,
    SearchContainer,
    SearchDifficulty,
    SearchIcon,
    SearchInput,
    Select,
} from "./CTFElements";
import { getUserDetail } from "../../features/userDetail/userDetailSlice";
// import { encodeURL } from "../Blogs/util";
import UnderMaintenance from "../Other/UnderMaintenance/UnderMaintenance";
import apiStatus from "../../features/apiStatus";
// import CtfCard from "./CtfCard";
import CtfChallenges from "./CTFCards/CtfChallenges";
import { CrownIcon } from "../Header/Navbar/NavbarElements";
import { RouteLink } from "../Dashboard/Sidebar/SidebarElements";
import LoadingSpinner from "../Other/MixComponents/Spinner/LoadingSpinner";

const CTF = () => {
    const { isApiLoading, isApiWorking } = apiStatus();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { ctf, isCtfLoading } = useSelector((state) => state.ctf);
    const { userDetail, isUserDetailLoading } = useSelector((state) => state.userDetail);

    useEffect(() => {
        dispatch(getAllCTFs());
        if (user) {
            dispatch(getUserDetail(user.username));
        }
    }, [dispatch]);

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

    if (isApiLoading || isUserDetailLoading || isCtfLoading) return <LoadingSpinner />;

    if (!isApiWorking) return <UnderMaintenance />;

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
                            <Option value="challenge"> Challenge </Option>
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
                    <RouteLink to="/leaderboard">
                        <SearchDifficulty
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                textDecoration: "none",
                                gap: "5px",
                                padding: "6px 15px 6px 10px",
                                borderRadius: "5px",
                                backgroundColor: "#252525",
                            }}
                        >
                            <CrownIcon style={{ fontSize: "1.5rem" }} />
                            <span> Leaderboard </span>
                        </SearchDifficulty>
                    </RouteLink>
                </SearchContainer>

                <CtfChallenges ctf={filteredCTFs} userDetail={userDetail} user={user} />
            </CTFContainer>
        </Wrapper>
    );
};

export default CTF;
