// const apiUrl = import.meta.env.VITE_API_URL;
// const cdnAssets = import.meta.env.VITE_CDN_URL;
// const webEnv = import.meta.env.VITE_WEB_ENV;
// const apiUrl = "https://dev.api.thecyberhub.org";
// const apiUrl = "https://api-thecyberhub-org.azurewebsites.net";
// const cdnAssets = "https://thecyberhub.nyc3.cdn.digitaloceanspaces.com";
const localUrl = "http://localhost:5000";
const localUrlReconage = "http://localhost:5001";
const apiUrl = import.meta.env.VITE_API_URL || "https://api.thecyberhub.org";
const reconageUrl = import.meta.env.VITE_API_URL || "https://reconage-api.thecyberhub.org";
const devUrl = "https://dev.api.thecyberhub.org";
const securityUrl = "https://security.api.thecyberhub.org";

const localUrlWs = "ws://localhost:5000";
const apiUrlWs = import.meta.env.VITE_API_URL || "wss://api.thecyberhub.org";
const devUrlWs = "wss://dev.api.thecyberhub.org";
const securityUrlWs = "wss://security.api.thecyberhub.org";

export const webEnv = import.meta.env.VITE_WEB_ENV || "production";

const assetsURL =
    import.meta.env.VITE_ASSETSURLS3 || "https://thecyberhub-assets.s3.ap-south-1.amazonaws.com/thecyberhub-assets";
const cdnAssets = `${assetsURL}/assets`;

export const cdnContentImagesUrl = (props) => {
    if (webEnv === "localhost" || webEnv === "development") {
        return `${assetsURL}/development${props}`;
    } else if (webEnv === "security") {
        return `${assetsURL}/security${props}`;
    } else {
        return `${assetsURL}/production${props}`;
    }
};

export const getApiUrl = (props) => {
    if (webEnv === "production") {
        return `${apiUrl}/${props}`;
    } else if (webEnv === "security") {
        return `${securityUrl}/${props}`;
    } else if (webEnv === "development") {
        return `${devUrl}/${props}`;
    } else {
        return `${localUrl}/${props}`;
    }
};

export const getReconageUrl = (props) => {
    if (webEnv === "production") {
        return `${reconageUrl}/${props}`;
    } else if (webEnv === "security") {
        return `${reconageUrl}/${props}`;
    } else if (webEnv === "development") {
        return `${reconageUrl}/${props}`;
    } else {
        return `${localUrlReconage}/${props}`;
    }
};

export const getApiUrlWs = () => {
    if (webEnv === "production") {
        return `${apiUrlWs}`;
    } else if (webEnv === "security") {
        return `${securityUrlWs}`;
    } else if (webEnv === "development") {
        return `${devUrlWs}`;
    } else {
        return `${localUrlWs}`;
    }
};

export const getCdnAssets = cdnAssets;
