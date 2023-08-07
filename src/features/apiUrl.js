// const apiUrl = import.meta.env.VITE_API_URL;
// const cdnAssets = import.meta.env.VITE_CDN_URL;
// const webEnv = import.meta.env.VITE_WEB_ENV;
// const apiUrl = "https://dev.api.thecyberhub.org";
// const apiUrl = "https://api-thecyberhub-org.azurewebsites.net";
// const cdnAssets = "https://thecyberhub.nyc3.cdn.digitaloceanspaces.com";
const apiUrl = import.meta.env.VITE_API_URL || "https://api.thecyberhub.org";
const localUrl = "http://localhost:5000";
const devUrl = "https://dev.api.thecyberhub.org";

export const webEnv = import.meta.env.VITE_WEB_ENV || "production";

const cdnAssets = "https://storagethecyberhub.blob.core.windows.net/thecyberhub-assets/assets";
let cndBlogImages;
if (webEnv === "localhost" || webEnv === "development") {
    cndBlogImages = "https://storagethecyberhub.blob.core.windows.net/thecyberhub-assets/development";
} else if (webEnv === "security") {
    cndBlogImages = "https://storagethecyberhub.blob.core.windows.net/thecyberhub-assets/security";
} else {
    cndBlogImages = "https://storagethecyberhub.blob.core.windows.net/thecyberhub-assets/production";
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

export const getCdnAssets = cdnAssets;
export const getCdnBlogImages = cndBlogImages;
