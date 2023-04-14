// const apiUrl = import.meta.env.VITE_API_URL;
// const cdnUrl = import.meta.env.VITE_CDN_URL;
// const webEnv = import.meta.env.VITE_WEB_ENV;
// const apiUrl = "https://dev.api.thecyberhub.org";
// const apiUrl = "https://api.thecyberhub.org";
const apiUrl = "https://api-thecyberhub-org.azurewebsites.net";
// const cdnUrl = "https://thecyberhub.nyc3.cdn.digitaloceanspaces.com";
const cdnUrl = "https://thecyberhubstorage.blob.core.windows.net";
const localUrl = "http://localhost:5000";

// export const webEnv = "local";
export const webEnv = "production";

// let webEnv;
// if (window.location.hostname === "localhost") {
//     webEnv = "local";
// } else if (window.location.hostname === "thecyberhub.org") {
//     webEnv = "production";
// }

export const getApiUrl = (props) => {
    if (webEnv === "production") {
        return `${apiUrl}/${props}`;
    } else {
        return `${localUrl}/${props}`;
    }
};

export const getCDNUrl = cdnUrl;
