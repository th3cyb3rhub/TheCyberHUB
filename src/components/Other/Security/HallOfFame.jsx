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
import { Wrapper } from "../../Dashboard/Profile/ProfileElements";
import { DotSymbol } from "../Support/SponsorsElements";
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
                            vulnerability: "Rate Limit on Blog BlogComments",
                            profile: "https://thecyberhub.org/@0xFTW",
                        },
                    ],
                },
                {
                    month: "June",
                    list: [
                        {
                            name: "Pratik kumar",
                            username: "tikku",
                            vulnerability: "Account Takeover via Password Reset",
                            profile: "https://thecyberhub.org/@tikku",
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
                                                            style={{ color: "#07b6f6" }}
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
