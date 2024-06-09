import { datasets as monthsDatasets, xDataSet as xDataSetMonths } from "./MainBarChartDataMonths.json";
import { datasets as hoursDatasets, xDataSet as xDataSetHours } from "./MainBarChartDataHours.json";

export const lastAmountOfDays = 30;
export const lastAmountOfMinAgo = 14;

export function displayMonths(count) {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return months.slice(0, count);
}

export const timeBtns = [
    {
        time: "Hours",
    },
    {
        time: "Days",
    },
];

// Horizontal Barcharts
export const options = {
    indexAxis: "y",
    elements: {
        bar: {
            borderWidth: 3,
        },
    },
    responsive: true,
    plugins: {
        legend: {
            position: "top",
        },
        title: {
            display: true,
            text: "Clients Devices",
        },
    },
};

const labels = [""];

export const data = {
    labels,
    datasets: [
        {
            label: "Mobile",
            data: [745],
            backgroundColor: "rgba(0, 47, 255)",
        },
        {
            label: "Desktop",
            data: [435],
            backgroundColor: "rgba(255, 106, 9)",
        },
    ],
};

// index 0: smallBarChartDatasets
// index 1: doughNutDatasets
// index 2: mainBarChartDatasets
export const allDatasets = [
    {
        label: "Contributions days",
        data: [345, 567, 765, 453, 676, 876, 564, 234, 440, 280, 440, 280],

        borderColor: "rgb(128, 128, 128)",
        backgroundColor: [
            "rgb(255, 99, 132)",
            "rgb(255, 106, 9)",
            "rgb(54, 162, 235)",
            "rgb(0, 47, 225)",
            "rgb(255, 205, 86)",
            "rgb(169, 169, 169, 0.1)",
            "rgb(169, 169, 169, 0.1)",
            "rgb(169, 169, 169, 0.1)",
            "rgb(169, 169, 169, 0.1)",
            "rgb(169, 169, 169, 0.1)",
            "rgb(169, 169, 169, 0.1)",
            "rgb(169, 169, 169, 0.1)",
            "rgb(169, 169, 169, 0.1)",
        ],
        hoverOffset: 4,
    },
    {
        label: "# of Votes",
        data: [10, 13, 8, 5, 2, 3],
        backgroundColor: [
            "rgba(255, 65, 105)",
            "rgba(0, 47, 255)",
            "rgba(255, 106, 9)",
            "rgba(255, 0, 0)",
            "rgba(75, 192, 192)",
            "rgb(255, 205, 86)",
        ],
        borderColor: ["rgba(128, 128, 128, 0.8)"],
        borderWidth: 1.25,
        cutout: "40%",
    },
    {
        label: "Contributions days",
        data: [345, 567, 765, 453, 676, 876, 564, 234, 440, 280, 440, 280],

        borderColor: "rgb(128, 128, 128)",
        backgroundColor: [
            "rgb(255, 99, 132)",
            "rgb(255, 106, 9)",
            "rgb(54, 162, 235)",
            "rgb(0, 47, 225)",
            "rgb(255, 205, 86)",
            "rgb(255, 99, 132)",
            "rgb(255, 106, 9)",
            "rgb(54, 162, 235)",
            "rgb(0, 47, 225)",
            "rgb(255, 205, 86)",
            "rgb(169, 169, 169, 0.1)",
            "rgb(169, 169, 169, 0.1)",
        ],
        hoverOffset: 4,
    },
];

// index 0: barChartOptions
// index 1: doughNutOptions
export const allOptions = [
    {
        plugins: {
            legend: {
                display: true,
            },
        },
        maintainAspectRatio: false,
        responsive: true,
    },
    {
        plugins: {
            legend: {
                display: true,
                label: {
                    display: false,
                },
            },
        },
        maintainAspectRatio: false,
        responsive: true,
    },
];

export const getAnalyticsFileData = () => {
    const monthsDataset = monthsDatasets[0];
    const hoursDataset = hoursDatasets[0];

    const headers = [
        { label: "Contributions Hours", key: "hours" },
        { label: "Months Contribution", key: "months" },
    ];

    const data = [];

    for (let i = 0; i < xDataSetHours.length; i++) {
        const hoursData = `${xDataSetHours[i]} - ${hoursDataset.data[i]}`;
        const monthsData = `${xDataSetMonths[i]} - ${monthsDataset.data[i]}`;
        data.push({ hours: hoursData, months: monthsData });
    }

    return { headers, data };
};
