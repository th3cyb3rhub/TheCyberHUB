onmessage = async (event) => {
    const { image, requiredImageWidth, requiredImageHeight, multiple } = event.data;
    const bitmap = await createImageBitmap(image);
    const canvas = new OffscreenCanvas(256, 256);
    const ctx = canvas.getContext("2d");
    const aspectRatio = requiredImageWidth / bitmap.width;
    canvas.width = requiredImageWidth;
    canvas.height = requiredImageHeight > 0 ? requiredImageHeight : bitmap.height * aspectRatio;
    ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    const blobImage = await canvas.convertToBlob();
    postMessage({ blobImage, multiple });
};
