import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { SiOpenstreetmap } from "react-icons/si";
import { ImLab } from "react-icons/im";
import { RiBugLine } from "react-icons/ri";
import { PiCodeDuotone } from "react-icons/pi";

const SidebarContainer = styled.div`
    position: sticky;
    top: 100px;
    height: 100%;
    width: 100%;
    max-width: 350px;
    min-width: 350px;
    background: #090909;
    color: #fff;
    padding: 20px;
    box-shadow: 0 4px 8px rgb(0 0 0 / 10%);
    border: 1px solid #232222;
    border-radius: 10px;
`;

const MainTitle = styled(Link)`
    display: flex;
    align-items: center;
    cursor: pointer;
    font-size: 18px;
    color: #eee;
    background: #0e0e0e;
    border-radius: 8px;
    padding: 10px 20px;
    border: 1px solid #3a3a3a;
    gap: 15px;
    transition: all 0.3s ease-in-out;
    width: 100%;

    &:hover {
        background: #ff6b08;
        color: #000;
    }
`;

const DropdownContainer = styled.div`
    position: relative;

    /* margin-top: 10px; */
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
`;

// const DropdownButton = styled.button`
//   width: 100%;
//   padding: 5px;
//   cursor: pointer;
//   background: #111111;
//   border: 1px solid #3a3a3a;
//   text-align: left;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
// `;

const DropdownList = styled.div`
    width: 100%;

    /* background: #1a1a1a;
    border: 1px solid #3a3a3a; */
    box-shadow: 0 2px 4px rgb(0 0 0 / 10%);
    display: ${(props) => (props.$isOpen ? "block" : "none")};
`;

const DropdownItem = styled.div`
    cursor: pointer;
    border-radius: 8px;
    padding: 5px 10px;

    &:hover {
        background: #2d2d2d;
    }
`;
const VerticalLine = styled.div`
    border: 1px solid rgb(140 140 140 / 40%);
    height: 90%;
    width: fit-content;
    margin: 0 0 0 10px;
    padding: 10px 0;
    position: absolute;
`;

// const HorizontalLine = styled.div`
//   border-bottom: 1px solid #ffffff;
//   width: 100%;
// `;

const Sidebar = ({ heading, topic, topics, onSelectSubtopic, setCategoryActive, onlyCat, categoryActive }) => {
    const [openDropdown, setOpenDropdown] = useState(null);

    const toggleDropdown = (index) => {
        setOpenDropdown((prev) => (prev === index ? null : index));
    };

    // get unique and sorted categories

    const categories = [...new Set(topics?.map((topic) => topic.category))].sort();

    const sidebarHeader = heading || topic?.category;

    return (
        <SidebarContainer>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    alignItems: "flex-start",
                    overflow: "auto",
                    height: "70vh",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "10px",
                        textAlign: "center",
                        alignItems: "center",
                        width: "100%",
                    }}
                >
                    <h3
                        style={{
                            color: "#ecf0f1",
                            fontSize: "20px",
                        }}
                    >
                        {sidebarHeader}
                    </h3>
                </div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                        width: "100%",
                    }}
                >
                    {onlyCat &&
                        categories?.map((category, index) => (
                            <MainTitle
                                key={index}
                                onClick={() => setCategoryActive(category)}
                                style={{
                                    background: categoryActive === category && "#ff6b08",
                                    color: categoryActive === category && "#000000",
                                }}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    {heading === "Topics" && <SiOpenstreetmap />}
                                    {heading === "Labs" && <ImLab />}
                                    {heading === "Code Review" && <RiBugLine />}
                                    {heading === "Crack Me" && <PiCodeDuotone />}
                                </div>
                                {category}
                            </MainTitle>
                        ))}
                </div>

                {topics?.map((topic, index) =>
                    !onlyCat ? (
                        <div key={index} style={{ width: "100%" }}>
                            <MainTitle
                                to={`/websecurity/topic/${topic?._id ? topic?._id : topic?.id}`}
                                onClick={() => toggleDropdown(index)}
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    border: openDropdown === index ? `0px` : "1px solid #3a3a3a",
                                }}
                            >
                                {topic.title}
                                <span>{openDropdown === index ? <FaAngleUp /> : <FaAngleDown />}</span>
                            </MainTitle>
                            <DropdownContainer>
                                {openDropdown === index && (
                                    <>
                                        <VerticalLine />
                                        <span></span>
                                    </>
                                )}
                                <DropdownList $isOpen={openDropdown === index}>
                                    {topic?.desc?.map((subtopic) => (
                                        <DropdownItem
                                            key={subtopic}
                                            onClick={() => {
                                                onSelectSubtopic(subtopic);
                                                // toggleDropdown(index);
                                            }}
                                        >
                                            {subtopic}
                                        </DropdownItem>
                                    ))}
                                </DropdownList>
                            </DropdownContainer>
                        </div>
                    ) : null,
                )}
            </div>
        </SidebarContainer>
    );
};

export default Sidebar;
