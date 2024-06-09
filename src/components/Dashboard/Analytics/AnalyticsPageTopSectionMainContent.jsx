import React from "react";
import {
    TopSection,
    Caption,
    Title,
    TopSectionCaptionTitle,
    CTABtn,
    TopSectionCaptionCTABtnBig,
    TopSectionCaptionCTABtnBigInnerSection,
    TopSectionMainContent,
    TopSectionDownloadText,
} from "./AnalyticsPageTopSectionMainContentElements";
import { FiInfoIcon, SlCalenderIcon, TbFileDownloadIcon } from "./AnalyticsIconElements";
import { getAnalyticsFileData, lastAmountOfDays } from "./AnalyticsUtils";
import { AnalyticsTopInnerCards } from "./AnalyticsTopInnerCards";
import { AnalyticsBarChart } from "./AnalyticsBarChart";
import { AnalyticsDoughnutChart } from "./AnalyticsDoughnutChart";
import visitors from "./AnalyticsVisitorsData.json";
import AnalyticsHorizontalBarCharts from "./AnalyticsHorizontalBarCharts";
import { CSVLink } from "react-csv";

export const AnalyticsPageTopSectionMainContent = () => {
    const { headers, data } = getAnalyticsFileData();

    return (
        <TopSection>
            <Caption>
                <TopSectionCaptionTitle>
                    <Title>Audience </Title>
                    <FiInfoIcon />
                </TopSectionCaptionTitle>
                <CTABtn>
                    <TopSectionCaptionCTABtnBig>
                        <TopSectionCaptionCTABtnBigInnerSection>
                            Last {lastAmountOfDays} days
                            <SlCalenderIcon />
                        </TopSectionCaptionCTABtnBigInnerSection>
                    </TopSectionCaptionCTABtnBig>
                    <TopSectionCaptionCTABtnBig>
                        <CSVLink data={data} headers={headers} filename="Analytics_Data.csv">
                            <TopSectionCaptionCTABtnBigInnerSection>
                                <TopSectionDownloadText>Download</TopSectionDownloadText>
                                <TbFileDownloadIcon />
                            </TopSectionCaptionCTABtnBigInnerSection>
                        </CSVLink>
                    </TopSectionCaptionCTABtnBig>
                </CTABtn>
            </Caption>
            <TopSectionMainContent>
                <AnalyticsTopInnerCards
                    title={visitors[0].title}
                    value={visitors[0].value}
                    percent={visitors[0].percent}
                >
                    <AnalyticsBarChart />
                </AnalyticsTopInnerCards>
                <AnalyticsTopInnerCards
                    title={visitors[1].title}
                    value={visitors[1].value}
                    percent={visitors[1].percent}
                >
                    <AnalyticsHorizontalBarCharts />
                </AnalyticsTopInnerCards>
                <AnalyticsTopInnerCards
                    title={visitors[2].title}
                    value={visitors[2].value}
                    percent={visitors[2].percent}
                >
                    <AnalyticsDoughnutChart />
                </AnalyticsTopInnerCards>
            </TopSectionMainContent>
        </TopSection>
    );
};
