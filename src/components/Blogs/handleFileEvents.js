import { toast } from "react-toastify";
import { getApiUrl } from "../../features/apiUrl";
import axios from "axios";

export const handlePasteEvent = async (e, setImageUrl, setBlogData) => {
    const items = (e.clipboardData || e.originalEvent.clipboardData).items;
    let file = null;

    // Check if the paste event contains an image
    for (const item of items) {
        if (item.type.startsWith("image")) {
            file = item.getAsFile();
            break;
        }
    }
    console.log(file.type);
    if (!file) return;
    if (!file.type.startsWith("image/")) {
        toast.error("Invalid file type. Only images are allowed.");
        return;
    }
    console.log(file.type);
    if (file.type !== ("image/jpeg" || "image/png" || "image/jpg")) {
        console.log(file.type);
        toast.error("Invalid file type. Only png and jpg are allowed.");
        return;
    }
    console.log(file.type);

    const maxFileSize = 1000000; // 1000KB
    if (file.size > maxFileSize) {
        toast.error(`File size should be less than ${maxFileSize / 1000}KB.`);
        return;
    }
    try {
        const currentDateTimeNumber = new Date().getTime();
        const fileName = `${currentDateTimeNumber}.${file && file.type.split("/")[1]}`;
        const formData = new FormData();
        formData.append("file", file);
        formData.append("key", `blog_images/${fileName}`);
        const API_URL = getApiUrl("api/upload");
        await axios.post(API_URL, formData);
        const newImageUrl = `https://thecyberhub.nyc3.cdn.digitaloceanspaces.com/blog_images/${fileName}`;
        setImageUrl(newImageUrl);
        setBlogData((prevState) => ({
            ...prevState,
            content: prevState.content + `\n![PLEASE_ADD_A_NAME_FOR_THIS_IMAGE_HERE](${newImageUrl})`,
        }));
    } catch (err) {
        console.error(err.message);
    }
};
