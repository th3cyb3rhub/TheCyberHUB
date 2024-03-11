"use client";

import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { VerticalBarChartContainer } from "./AnalyticsMainBarChartElements";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { displayMonths, allOptions as newOptions, allDatasets as newDatasets } from "./AnalyticsUtils";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function MainBarChart() {
    const datasets = newDatasets.slice(-1); // 2
    const options = newOptions.slice(0, 1); // 0

    const [chartData, setChartData] = useState({
        datasets: [],
    });
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        const labels = displayMonths();
        setChartData({
            labels,
            datasets,
        });

        setChartOptions(options);
    }, []);

    return (
        <VerticalBarChartContainer>
            <Bar options={chartOptions} data={chartData} />
        </VerticalBarChartContainer>
    );
}
