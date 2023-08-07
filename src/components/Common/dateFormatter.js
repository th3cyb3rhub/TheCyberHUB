export const dateFormatter = ({ date }) => {
    const currentDate = new Date();
    const getMonthNameAbbreviated = (monthIndex) => {
        const monthsAbbreviated = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return monthsAbbreviated[monthIndex];
    };

    const formatDate = (date) => {
        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();

        const currentYear = currentDate.getFullYear();
        const isCurrentYear = year === currentYear;

        const monthNameAbbreviated = getMonthNameAbbreviated(month);

        if (isCurrentYear) {
            return `${day} ${monthNameAbbreviated}`;
        } else {
            return `${day} ${monthNameAbbreviated} ${year}`;
        }
    };

    return formatDate(date);
};
