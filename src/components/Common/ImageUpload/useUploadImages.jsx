import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { getApiUrl } from "src/features/apiUrl";

const useUploadImages = ({ maxImageSizeByte, pageName, initImages = [] }) => {
    const [images, setImages] = useState([]);
    const [imagesName, setImagesName] = useState(initImages || []);

    const handleValidate = (image, maxSizeByte) => {
        if (!image) return;
        if (!image.type.startsWith("image/") && !["image/png", "image/jpeg", "image/jpg"].includes(image.type)) {
            toast.error("Invalid image type. Only png, jpeg and jpg are allowed.");
            return;
        }
        if (image.size > maxSizeByte) {
            toast.error(`Image size should be less than ${maxSizeByte / 1000}KB.`);
            return;
        }
        return image;
    };

    const handleUploadImage = (image) => {
        if (!handleValidate(image, maxImageSizeByte)) return;
        const imageName = `${pageName}-${Date.now()}.${image?.type.split("/")[1]}`;
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                resolve({
                    image: new File([reader.result], imageName, { type: image?.type }),
                    imageName: imageName.split("-")[1],
                });
            };
            reader.readAsArrayBuffer(image);
        });
    };

    const handleManyUploads = async (imageFiles, maxImages = undefined) => {
        const manyImages = [];
        const manyImagesName = [];
        try {
            for (const imageFile of imageFiles) {
                const { image, imageName } = await handleUploadImage(imageFile);
                manyImages.push(image);
                manyImagesName.push(imageName);
            }
            let currentImagesNameNum;

            setImagesName((prevImagesName) => {
                currentImagesNameNum = prevImagesName.length;
                return maxImages
                    ? [...prevImagesName, ...manyImagesName].slice(0, maxImages)
                    : [...prevImagesName, ...manyImagesName];
            });
            setImages((prevImages) => {
                return maxImages
                    ? [...prevImages, ...manyImages].slice(0, maxImages - currentImagesNameNum)
                    : [...prevImages, ...manyImages];
            });
        } catch (error) {
            console.log(`Error uploading this image:${error}`);
        }
    };

    const handleRemove = (index) => {
        setImages((prevImages) => {
            const updatedImages = [...prevImages];
            updatedImages.splice(index, 1);
            return updatedImages;
        });
        setImagesName((prevImagesName) => {
            const updatedImagesName = [...prevImagesName];
            updatedImagesName.splice(index, 1);
            return updatedImagesName;
        });
    };

    const handleMultipleSingularOptions = async (imageFiles, multiple, maxImages) => {
        if (multiple) return await handleManyUploads(imageFiles, maxImages);
        const { image, imageName } = await handleUploadImage(imageFiles[0]);
        setImages([image]);
        setImagesName([imageName]);
    };

    const handleChange = async (e, multiple = false, maxImages = undefined) => {
        const imageFiles = e.target.files;
        await handleMultipleSingularOptions(imageFiles, multiple, maxImages);
    };

    const handleDrop = async (e, multiple = false, maxImages = undefined) => {
        e.preventDefault();
        const imageFiles = e.dataTransfer.files;
        await handleMultipleSingularOptions(imageFiles, multiple, maxImages);
    };

    const handlePaste = async (e, multiple = false, maxImages = undefined) => {
        const items = (e.clipboardData || e.originalEvent.clipboardData).items;
        const imageFiles = [];

        // Check if the paste event contains an image
        for (const item of items) {
            if (item.type.startsWith("image")) {
                const file = item.getAsFile();
                return imageFiles.push[file];
            }
        }

        await handleMultipleSingularOptions(imageFiles, multiple, maxImages);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleSubmit = async (file) => {
        try {
            const formData = new FormData();
            formData.append("image", file);
            const API_URL = getApiUrl("api/upload");
            await axios.post(API_URL, formData);
        } catch (err) {
            if (err.message === "Request failed with status code 429") {
                toast.error("You are uploading images too fast. Please wait a few seconds and try again.");
            }
        }
    };

    const handleSubmitManyImages = async (files) => {
        for (const file of files) {
            await handleSubmit(file);
        }
    };

    const handleSubmitFromContent = async (content) => {
        const imageTags = content.match(/<img[^>]*src="([^"]*)"[^>]*>/g) || [];
        let updatedContent = content;
        if (imageTags.length > 0) {
            async function uploadContentImages() {
                const imageUrls = imageTags.map((tag) => {
                    const match = tag.match(/src="([^"]*)"/);
                    return match ? match[1] : null;
                });

                for (const imageUrl of imageUrls) {
                    if (!isImageUrl(imageUrl)) {
                        await uploadContentImage(imageUrl);
                    }
                }
            }

            await uploadContentImages();
        }

        async function uploadContentImage(imageUrl) {
            const [imageType, base64Data] = imageUrl.split(";base64,");
            const filename = `${pageName}-${Date.now()}.${imageType.split("/")[1]}`;
            updatedContent = updatedContent.replace(imageUrl, filename.split("-")[1]);

            const newFile = bufferToFile(base64Data, filename, imageType);

            await handleSubmit(newFile);
        }
        return updatedContent;
    };

    return {
        images,
        setImages,
        imagesName,
        setImagesName,
        onImageRemove: handleRemove,
        onImageChange: handleChange,
        onImageDrop: handleDrop,
        onImagePaste: handlePaste,
        onImageDragOver: handleDragOver,
        onImageSubmit: handleSubmit,
        onManyImageSubmit: handleSubmitManyImages,
        onImageFromContentSubmit: handleSubmitFromContent,
    };
};
export default useUploadImages;

function isImageUrl(url) {
    return (
        url.startsWith("http://") || url.startsWith("https://") || url.replace(/^data:/, "").startsWith("data:image")
    );
}

function bufferToFile(base64Data, fileName, imageType) {
    const byteCharacters = atob(base64Data);

    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const uint8Array = new Uint8Array(byteNumbers);
    const blob = new Blob([uint8Array], { type: imageType });
    return new File([blob], fileName, { type: imageType.replace(/^data:/, "") });
}
