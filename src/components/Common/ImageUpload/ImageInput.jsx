import React from "react";
import { AddImage, ImageUploadLabel } from "./ImageElements";

const ImageInput = ({
    inputName,
    onChange,
    labelStyles = {},
    filesName,
    multiple = false,
    maxMultiple = 4,
    labelPlaceholder = undefined,
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
        </div>
    );
};
export default ImageInput;
