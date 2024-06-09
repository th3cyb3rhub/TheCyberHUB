import React, { useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { BarChartContainer } from "./AnalyticsMainBarChartElements";
import { useAnalyticsChartCustomHook } from "./useAnalyticsChartCustomHook";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

import { options, datasets, xDataSet } from "./MainBarChartDataMonths.json";
import {
    options as hoursOptions,
    datasets as hoursDatasets,
    xDataSet as xDataSetHours,
} from "./MainBarChartDataHours.json";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export function AnalyticsMainBarChart({ timePeriod }) {
    const [chartData, chartOptions, setGeneralChartData] = useAnalyticsChartCustomHook({
        newOptions: options,
        newDatasets: datasets,
        displayMonths: xDataSet,
    });

    useEffect(() => {
        if (timePeriod === "hours") {
            setGeneralChartData({ displayMonths: xDataSetHours, newDatasets: hoursDatasets, hoursOptions });
        } else {
            setGeneralChartData({ displayMonths: xDataSet, newDatasets: datasets, hoursOptions: options });
        }
    }, [timePeriod]);

    return (
        <BarChartContainer>
            <Bar options={chartOptions} data={chartData} />
        </BarChartContainer>
    );
}
