import React from "react";
import { AddImage, ImageUploadLabel } from "./ImageElements";
import CompressImage from "./CompressImage";

const ImageInput = ({
    inputName,
    onChange,
    labelStyles = {},
    filesName,
    multiple = false,
    maxMultiple = 4,
    labelPlaceholder = undefined,
    onAddImages,
    resizeImage,
    pageName,
    requiredImageHeight,
    requiredImageWidth,
}) => {
    const shouldShowAddImage = !multiple || (multiple && filesName.length < maxMultiple);
    return (
        <div key={!multiple && filesName[0]}>
            <ImageUploadLabel style={labelStyles} htmlFor={inputName}>
                {shouldShowAddImage && <AddImage />}
                {labelPlaceholder &&
                    (!filesName.length ? (
                        <p>{labelPlaceholder.choose}</p>
                    ) : (
                        filesName.map((fileName) => {
                            return <p key={fileName}>{fileName.slice(0, 20)}</p>;
                        })
                    ))}
            </ImageUploadLabel>

            <input
                type="file"
                name={inputName}
                id={inputName}
                onChange={onChange}
                accept="image/*"
                multiple={multiple}
                style={{ display: "none" }}
            />
            {resizeImage && (
                <CompressImage
                    resizeImage={resizeImage}
                    pageName={pageName}
                    onAddImages={onAddImages}
                    requiredImageHeight={requiredImageHeight}
                    requiredImageWidth={requiredImageWidth}
                    multiple={!labelPlaceholder}
                />
            )}
        </div>
    );
};
export default ImageInput;
