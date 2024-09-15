import React, { useEffect, useState } from "react";
import { Wrapper } from "src/components/Dashboard/Profile/ProfileElements";
import { getAllCTFs } from "src/features/ctf/ctfSlice";
import { useDispatch, useSelector } from "react-redux";
import { CTFContainer, CTFHeader, CTFHeading, Option, SearchContainer, SearchDifficulty, Select } from "./CTFElements";
import { getUserDetail } from "src/features/userDetail/userDetailSlice";
import UnderMaintenance from "src/components/Other/UnderMaintenance/UnderMaintenance";
import apiStatus from "src/features/apiStatus";
// import CtfChallenges from "./CTFCards/CtfChallenges";
import { RankTrophy } from "src/components/Header/Navbar/NavbarElements";
import { RouteLink } from "src/components/Common/GeneralDashboardSidebar/GeneralDashboardSidebarElements";
import LoadingSpinner from "src/components/Other/MixComponents/Spinner/LoadingSpinner";
import SearchInputBox from "src/components/Common/SearchInputBox";

const CTF = () => {
    const { isApiLoading, isApiWorking } = apiStatus();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { ctfs, isCtfLoading } = useSelector((state) => state.ctfs);
    const { isUserDetailLoading } = useSelector((state) => state.userDetail);

    useEffect(() => {
        dispatch(getAllCTFs());
        if (user) {
            dispatch(getUserDetail(user?.username));
        }
    }, [dispatch]);

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedDifficulty, setSelectedDifficulty] = useState("all");
    const [selectedType, setSelectedType] = useState("all");
    const [setFilteredCTFs] = useState(ctfs);

    useEffect(() => {
        const filteredCTFs = Array.isArray(ctfs)
            ? ctfs.filter((challenge) => {
                  const nameMatches = challenge?.challengeName?.toLowerCase().includes(searchTerm?.toLowerCase());
                  const difficultyMatches =
                      selectedDifficulty === "all" || challenge?.difficulty === selectedDifficulty;
                  const typeMatches = selectedType === "all" || challenge?.type === selectedType;
                  return nameMatches && difficultyMatches && typeMatches;
              })
            : [];
        setFilteredCTFs(filteredCTFs);
    }, [ctfs, searchTerm, selectedDifficulty, selectedType]);

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
                    <SearchInputBox
                        placeholder="Search by name"
                        value={searchTerm}
                        onChange={handleSearchTermChange}
                        setValue={setSearchTerm}
                    />
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

                    {/* <RouteLink to="teams"> */}
                    {/*    <SearchDifficulty */}
                    {/*        style={{ */}
                    {/*            display: "flex", */}
                    {/*            justifyContent: "center", */}
                    {/*            textDecoration: "none", */}
                    {/*            gap: "5px", */}
                    {/*            padding: "6px 15px 6px 10px", */}
                    {/*            borderRadius: "5px", */}
                    {/*            backgroundColor: "#252525", */}
                    {/*        }} */}
                    {/*    > */}
                    {/*        <RankTrophy style={{ fontSize: "1rem" }} /> */}
                    {/*        <span> Teams </span> */}
                    {/*    </SearchDifficulty> */}
                    {/* </RouteLink> */}

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
                            <RankTrophy style={{ fontSize: "1rem" }} />
                            <span> Leaderboard </span>
                        </SearchDifficulty>
                    </RouteLink>
                </SearchContainer>

                <CTFHeader>
                    <CTFHeading> Coming Soon </CTFHeading>
                </CTFHeader>

                {/* <CtfChallenges ctfs={filteredCTFs} userDetail={userDetail} user={user} /> */}
            </CTFContainer>
        </Wrapper>
    );
};

export default CTF;
