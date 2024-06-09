const dateFormat = (createdAt) => {
    const date = createdAt ? new Date(createdAt) : null;

    const options = {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    };

    return date?.toLocaleString("en-US", options);
};
export default dateFormat;
