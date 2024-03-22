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

export const deviceTypeDate = [
    {
        mobile: "Mobile",
        desktop: "Desktop",
    },
    {
        startDate: "11 Oct, 2021",
        endDate: "11 Nov, 2021",
    },
];

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
