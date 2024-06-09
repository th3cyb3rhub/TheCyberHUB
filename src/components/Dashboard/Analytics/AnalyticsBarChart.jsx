import React from "react";
import { Bar } from "react-chartjs-2";
import { BarChartContainer } from "./AnalyticsBarChartElements";
import { displayMonths, allOptions as newOptions, allDatasets as newDatasets } from "./AnalyticsUtils";
import { useAnalyticsChartCustomHook } from "./useAnalyticsChartCustomHook";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export function AnalyticsBarChart() {
    const [chartData, chartOptions] = useAnalyticsChartCustomHook({
        displayMonths: displayMonths(9),
        newDatasets: newDatasets.slice(0, 1),
        newOptions: newOptions.slice(0, 1),
    });

    return (
        <BarChartContainer>
            <Bar options={chartOptions} data={chartData} />
        </BarChartContainer>
    );
}
