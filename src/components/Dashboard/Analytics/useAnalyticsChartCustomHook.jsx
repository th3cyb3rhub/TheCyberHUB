import { useState, useEffect } from "react";

export const useAnalyticsChartCustomHook = (props) => {
    const { displayMonths, newDatasets, newOptions } = props;

    const [chartData, setChartData] = useState({
        datasets: [],
    });
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        setChartData({
            labels: displayMonths,
            datasets: newDatasets,
        });
        setChartOptions({ options: newOptions });
    }, []);

    const setGeneralChartData = ({ displayMonths, newDatasets, newOptions }) => {
        setChartData({
            labels: displayMonths,
            datasets: newDatasets,
        });
        setChartOptions({ options: newOptions });
    };

    return [chartData, chartOptions, setGeneralChartData];
};
