import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { uploadImages } from "src/features/imageUploadService";

const useUploadImages = ({
    maxImageSizeByte,
    pageName,
    requiredImageWidth,
    initImages = [],
    requiredImageHeight = 0,
}) => {
    const [images, setImages] = useState([]);
    const [imagesName, setImagesName] = useState(initImages || []);
    const [workerAction, setWorkerAction] = useState(null);
    useEffect(() => {
        const imageUploadWorker = new Worker("/src/utils/workers/imageUploadWorker.js");
        imageUploadWorker.onmessage = (event) => {
            const newImageBlob = event.data.blobImage;
            const fileName = `${pageName}-${Date.now()}.${newImageBlob.type.split("/")[1]}`;
            const imageFileWithUpdatedName = new File([newImageBlob], fileName, { type: newImageBlob.type });
            handleAddImagesToState([imageFileWithUpdatedName], [fileName], event.data.multiple);
        };
        setWorkerAction(imageUploadWorker);
        return () => {
            imageUploadWorker.terminate();
        };
    }, []);

    const handleValidate = (image, maxSizeByte, multiple) => {
        if (!image) return;
        const isImageValid =
            !image.type.startsWith("image/") && !["image/png", "image/jpeg", "image/jpg"].includes(image.type);
        if (isImageValid) {
            toast.error("Invalid image type. Only png, jpeg and jpg are allowed.");
            return;
        }
        if (image.size > maxSizeByte) {
            const maxSizeLog = niceBytes(maxSizeByte);
            toast.warning(`Image size should be less than ${maxSizeLog}. We will compress this image size.`);
            workerAction.postMessage({
                image,
                requiredImageWidth,
                requiredImageHeight,
                multiple,
            });
            return;
        }
        return image;
    };

    const handleUploadImage = (image, multiple = false) => {
        if (!handleValidate(image, maxImageSizeByte, multiple)) return {};
        const imageName = `${pageName}-${Date.now()}.${image?.type.split("/")[1]}`;
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                resolve({
                    image: new File([reader.result], imageName, { type: image?.type }),
                    imageName,
                });
            };
            reader.onerror = (error) => reject(error);
            reader.readAsArrayBuffer(image);
        });
    };
    const handleAddImagesToState = (images, imagesName, multiple = true, maxImages = 4) => {
        const correctImagesName = [...imagesName.map((imageName) => imageName.split("-")[1])];
        if (!multiple) {
            setImagesName([...correctImagesName]);
            setImages([...images]);
            return;
        }
        setImagesName((prevImagesName) => {
            const newImagesName = [...prevImagesName, ...correctImagesName];
            return maxImages ? newImagesName.slice(0, maxImages) : newImagesName;
        });
        setImages((prevImages) => {
            const newImages = [...prevImages, ...images];
            return maxImages ? newImages.slice(0, maxImages - initImages.length) : newImages;
        });
    };
    const handleResetImagesInState = () => {
        setImagesName([]);
        setImages([]);
    };
    const handleManyUploads = async (imageFiles, maxImages) => {
        const manyImages = [];
        const manyImagesName = [];
        try {
            for (const imageFile of imageFiles) {
                const { image, imageName } = await handleUploadImage(imageFile, true);
                if (image) manyImages.push(image);
                if (imageName) manyImagesName.push(imageName);
            }
            handleAddImagesToState(manyImages, manyImagesName, true, maxImages);
        } catch (error) {
            console.log(`Error uploading this image:${error}`);
        }
    };

    const handleRemove = (index) => {
        setImages((prevImages) => removeItemAtIndex(prevImages, index));
        setImagesName((prevImagesName) => removeItemAtIndex(prevImagesName, index));
    };

    const handleMultipleSingularOptions = async (imageFiles, multiple, maxImages) => {
        if (multiple) return await handleManyUploads(imageFiles, maxImages);
        const imageWithNameObj = await handleUploadImage(imageFiles[0]);
        if (Object.keys(imageWithNameObj).length > 0)
            handleAddImagesToState([imageWithNameObj.image], [imageWithNameObj.imageName], false);
    };

    const handleChange = async (e, multiple = false, maxImages) => {
        const imageFiles = e.target.files;
        await handleMultipleSingularOptions(imageFiles, multiple, maxImages);
    };

    const handleDrop = async (e, multiple = false, maxImages) => {
        e.preventDefault();
        const imageFiles = e.dataTransfer.files || [];
        await handleMultipleSingularOptions(imageFiles, multiple, maxImages);
    };

    const handlePaste = async (e, multiple = false, maxImages) => {
        const pasteItems = e.clipboardData.files;
        await handleMultipleSingularOptions(pasteItems, multiple, maxImages);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleSubmit = async (file) => {
        const formData = new FormData();
        formData.append("image", file);
        await uploadImages(formData);
    };

    const handleSubmitManyImages = async (files) => {
        const promises = files.map((file) => handleSubmit(file));
        await Promise.all(promises);
    };

    const handleSubmitFromContent = async (content) => {
        const imageTags = content.match(/<img[^>]*src="([^"]*)"[^>]*>/g) || [];
        let updatedContent = content;
        if (imageTags.length > 0) {
            updatedContent = await uploadContentImages(imageTags, updatedContent, pageName, handleSubmit);
        }
        return updatedContent;
    };

    return {
        images,
        imagesName,
        onResetImages: handleResetImagesInState,
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

async function uploadContentImages(imageTags, updatedContent, ...args) {
    const imageUrls = imageTags.map((tag) => {
        const match = tag.match(/src="([^"]*)"/);
        return match ? match[1] : null;
    });

    for (const imageUrl of imageUrls) {
        if (!isImageUrl(imageUrl)) {
            updatedContent = await uploadContentImage(imageUrl, updatedContent, ...args);
        }
    }
    return updatedContent;
}

async function uploadContentImage(imageUrl, updatedContent, pageName, onSubmit) {
    if (!imageUrl) return;
    const { newFile, fileName } = bufferToFile(imageUrl, pageName);

    await onSubmit(newFile);

    return updatedContent.replace(imageUrl, fileName.split("-")[1]);
}

function isImageUrl(url) {
    return (
        url.startsWith("http://") || url.startsWith("https://") || url.replace(/^data:/, "").startsWith("data:image")
    );
}

export function bufferToFile(imageUrl, pageName) {
    const [imageType, base64Data] = imageUrl?.split(";base64,");
    const fileName = `${pageName}-${Date.now()}.${imageType.split("/")[1]}`;

    const byteCharacters = atob(base64Data);
    const byteNumbers = byteCharacters.split("").map((char) => char.charCodeAt());
    const uint8Array = new Uint8Array(byteNumbers);
    const blob = new Blob([uint8Array], { type: imageType });
    return { newFile: new File([blob], fileName, { type: imageType.replace(/^data:/, "") }), fileName };
}

function removeItemAtIndex(items, index) {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    return updatedItems;
}

const units = ["bytes", "KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];

const niceBytes = (size) => {
    let unitNameIndex = 0;
    let number = parseInt(size, 10) || 0;

    while (number >= 1024 && ++unitNameIndex) {
        number = number / 1024;
    }

    return number.toFixed(number < 10 && unitNameIndex > 0 ? 1 : 0) + " " + units[unitNameIndex];
};
