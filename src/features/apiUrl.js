// const apiUrl = import.meta.env.VITE_API_URL;
// const cdnUrl = import.meta.env.VITE_CDN_URL;
// const webEnv = import.meta.env.VITE_WEB_ENV;
// const apiUrl = "https://dev.api.thecyberhub.org";
const apiUrl = import.meta.env.VITE_API_URL || "https://api.thecyberhub.org";
// const apiUrl = "https://api-thecyberhub-org.azurewebsites.net";
// const cdnUrl = "https://thecyberhub.nyc3.cdn.digitaloceanspaces.com";
const cdnUrl = "https://thecyberhubstorage.blob.core.windows.net";
const localUrl = "http://localhost:5000";
const devUrl = "https://dev.api.thecyberhub.org";

export const webEnv = import.meta.env.VITE_WEB_ENV || "production";

let cdnUrlContent;
if (webEnv === "localhost" || webEnv === "development") {
    cdnUrlContent = "https://thecyberhubstorage.blob.core.windows.net/development";
} else if (webEnv === "security") {
    cdnUrlContent = "https://thecyberhubstorage.blob.core.windows.net/security";
} else {
    cdnUrlContent = "https://thecyberhubstorage.blob.core.windows.net";
}

export const getApiUrl = (props) => {
    if (webEnv === "production" || webEnv === "security") {
        return `${apiUrl}/${props}`;
    } else if (webEnv === "development") {
        return `${devUrl}/${props}`;
    } else {
        return `${localUrl}/${props}`;
    }
};

export const getCDNUrl = cdnUrl;
export const getCDNUrlContent = cdnUrlContent;
