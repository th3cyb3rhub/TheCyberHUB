// const apiUrl = import.meta.env.VITE_API_URL;
// const cdnUrl = import.meta.env.VITE_CDN_URL;
// const webEnv = import.meta.env.VITE_WEB_ENV;
// const apiUrl = "https://dev.api.thecyberhub.org";
// const apiUrl = "https://api-thecyberhub-org.azurewebsites.net";
// const cdnUrl = "https://thecyberhub.nyc3.cdn.digitaloceanspaces.com";
const apiUrl = import.meta.env.VITE_API_URL || "https://api.thecyberhub.org";
const localUrl = "http://localhost:5000";
const devUrl = "https://dev.api.thecyberhub.org";

export const webEnv = import.meta.env.VITE_WEB_ENV || "production";

let cdnUrl;
let cdnUrlContent;
if (webEnv === "localhost" || webEnv === "development") {
    cdnUrl = "https://thecyberhub-assets.s3.ap-south-1.amazonaws.com/development";
    cdnUrlContent = "https://thecyberhub-assets.s3.ap-south-1.amazonaws.com/development";
} else if (webEnv === "security") {
    cdnUrl = "https://thecyberhub-assets.s3.ap-south-1.amazonaws.com/security";
    cdnUrlContent = "https://thecyberhub-assets.s3.ap-south-1.amazonaws.com/security";
} else {
    cdnUrl = "https://thecyberhub-assets.s3.ap-south-1.amazonaws.com";
    cdnUrlContent = "https://thecyberhub-assets.s3.ap-south-1.amazonaws.com";
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
