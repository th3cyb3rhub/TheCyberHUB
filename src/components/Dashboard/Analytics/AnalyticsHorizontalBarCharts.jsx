"use client";

import React from "react";
import { Bar } from "react-chartjs-2";
import { BarChartsContainer } from "./AnalyticsHorizontalBarChartsElements";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { data, options } from "./AnalyticsUtils";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function AnalyticsHorizontalBarCharts() {
    return (
        <BarChartsContainer>
            <Bar options={options} data={data} />
        </BarChartsContainer>
    );
}
