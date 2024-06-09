import { useState } from "react";
import axios from "axios";
import { cdnContentImagesUrl, getApiUrl } from "src/features/apiUrl";
import { toast } from "react-toastify";

const useImageUploadEvents = (prevContent, setContent, pageName) => {
    const [errorMessage, setErrorMessage] = useState("");

    const handleUploadAndDisplayImage = async (file) => {
        const fileName = `${pageName}-${Date.now()}.${file && file.type.split("/")[1]}`;
        const reader = new FileReader();
        reader.onloadend = async () => {
            const newFile = new File([reader.result], fileName, { type: file && file.type });
            const formData = new FormData();
            formData.append("image", newFile);
            const API_URL = getApiUrl("api/upload");
            await axios.post(API_URL, formData);
            const newImageUrl = cdnContentImagesUrl(`/${pageName}/${fileName.split("-")[1]}`);
            setContent(prevContent + `\n![PLEASE_ADD_A_NAME_FOR_THIS_IMAGE_HERE](${newImageUrl})\n\n`);
        };
        reader.readAsArrayBuffer(file);
    };

    const handleDrop = async (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (!file) return;
        if (!file.type.startsWith("image/")) {
            toast.error("Invalid file type. Only images are allowed.");
            return;
        }
        const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];

        if (!allowedTypes.includes(file.type)) {
            toast.error("Invalid file type. Only png and jpg are allowed.");
            return;
        }
        const maxFileSize = 1000000; // 1000KB
        if (file.size > maxFileSize) {
            toast.error(`File size should be less than ${maxFileSize / 1000}KB.`);
            return;
        }
        try {
            handleUploadAndDisplayImage(file);
        } catch (err) {
            if (err.message === "Request failed with status code 429") {
                setErrorMessage("You are uploading images too fast. Please wait a few seconds and try again.");
                errorMessage && toast.error(errorMessage);
                if (errorMessage === "") {
                    toast("You are uploading images too fast. Please wait a few seconds and try again.");
                }
            }
        }
    };
    const handlePaste = async (e) => {
        const items = (e.clipboardData || e.originalEvent.clipboardData).items;
        let file = null;

        // Check if the paste event contains an image
        for (const item of items) {
            if (item.type.startsWith("image")) {
                file = item.getAsFile();
                break;
            }
        }
        if (!file) return;
        if (!file.type.startsWith("image/")) {
            toast.error("Invalid file type. Only images are allowed.");
            return;
        }
        if (file.type !== ("image/png" || "image/jpeg" || "image/jpg")) {
            toast.error("Invalid file type. Only png and jpg are allowed.");
            return;
        }
        const maxFileSize = 1000000; // 1000KB
        if (file.size > maxFileSize) {
            toast.error(`File size should be less than ${maxFileSize / 1000}KB.`);
            return;
        }
        try {
            handleUploadAndDisplayImage(file);
        } catch (err) {
            if (err.message === "Request failed with status code 429") {
                setErrorMessage("You are uploading images too fast. Please wait a few seconds and try again.");
                errorMessage && toast.error(errorMessage);
                if (errorMessage === "") {
                    toast("You are uploading images too fast. Please wait a few seconds and try again.");
                }
            }
        }
    };
    const handleDragOver = (e) => {
        e.preventDefault();
    };

    return { onDropImage: handleDrop, onDragOverImage: handleDragOver, onPasteImage: handlePaste };
};
export default useImageUploadEvents;
