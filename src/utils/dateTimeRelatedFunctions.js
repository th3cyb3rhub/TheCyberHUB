export const setDateAndTime = (date, time) => {
    const newDate = date ? new Date(date) : new Date();
    const newTime = time ? new Date(time) : newDate;
    return new Date(
        newDate?.getFullYear(),
        newDate?.getMonth(),
        newDate?.getDate(),
        newTime?.getHours(),
        newTime?.getMinutes(),
    );
};
export const addZeroToDateString = (dateValue) => {
    return +dateValue < 10 ? `0${dateValue}` : dateValue;
};
