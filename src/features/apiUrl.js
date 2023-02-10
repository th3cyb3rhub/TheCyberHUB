const getApiUrl = (props) => {
    if (import.meta.env.VITE_WEB_ENV === "production") {
        return `${import.meta.env.VITE_API_URL}/${props}`;
    } else {
        return `http://localhost:5000/${props}`;
    }
};

export default getApiUrl;
