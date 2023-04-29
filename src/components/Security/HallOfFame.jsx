import React from "react";
import {
    HallOfFameContainer,
    HallOfFameList,
    HallOfFameMonth,
    HallOfFameMonthSection,
    HallOfFameName,
    HallOfFameYear,
    HallOfFameYearSection,
} from "./HallOfFameElements";
import { Wrapper } from "../Dashboard/Profile/ProfileElements";
import { DotSymbol } from "../Other/Support/SponsorsElements";
import SecurityNavigation from "./SecurityNavigation";

const HallOfFame = () => {
    const entries = [
        {
            year: 2023,
            months: [
                {
                    month: "January",
                    list: [
                        {
                            name: "Yash singh chauhan",
                            username: "0xFTW",
                            vulnerability:
                                "NoSQL Injection on Login Page (only login screen bypass, no user data leak)",
                            profile: "https://thecyberhub.org/@0xFTW",
                        },
                        {
                            name: "Yash singh chauhan",
                            username: "0xFTW",
                            vulnerability: "Rate Limit on Blog Comments",
                            profile: "https://thecyberhub.org/@0xFTW",
                        },
                        {
                            name: "Kabir",
                            username: "kabir0x23",
                            vulnerability: "XSS in Website Email Responses",
                            profile: "https://thecyberhub.org/@kabir0x23",
                        },
                    ],
                },
            ],
        },
    ];

    return (
        <Wrapper>
            <HallOfFameContainer>
                <SecurityNavigation heading={"Hall of Fame"} />
                <HallOfFameList>
                    {entries
                        .slice()
                        .reverse()
                        .map((item, index) => (
                            <HallOfFameYearSection key={index}>
                                <HallOfFameYear>{item.year}</HallOfFameYear>
                                {item.months
                                    .slice()
                                    .reverse()
                                    .map((item, index) => (
                                        <HallOfFameMonthSection key={index}>
                                            <HallOfFameMonth>{item.month}</HallOfFameMonth>
                                            <ul>
                                                {item.list.map((item, index) => (
                                                    <HallOfFameName key={index}>
                                                        <DotSymbol />
                                                        {item.name}
                                                        <a
                                                            style={{ color: "greenyellow" }}
                                                            href={item.profile}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                        >
                                                            [@{item.username}]
                                                        </a>
                                                        - {item.vulnerability}
                                                    </HallOfFameName>
                                                ))}
                                            </ul>
                                        </HallOfFameMonthSection>
                                    ))}
                            </HallOfFameYearSection>
                        ))}
                </HallOfFameList>
            </HallOfFameContainer>
        </Wrapper>
    );
};

export default HallOfFame;
