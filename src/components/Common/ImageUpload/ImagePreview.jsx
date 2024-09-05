import React from "react";
import { ImageContainer, ImagesContainer, PreviewImage, RemoveButton } from "./ImageElements";

const ImagePreview = ({ files, onRemove }) => {
    const closeIcon = <>&#10005;</>;

    return (
        <ImagesContainer>
            {files?.map((file, index) => (
                <ImageContainer key={file.name}>
                    <PreviewImage src={URL.createObjectURL(file)} alt={`Uploaded ${index + 1}`} />
                    <RemoveButton onClick={() => onRemove(index)}>{closeIcon}</RemoveButton>
                </ImageContainer>
            ))}
        </ImagesContainer>
    );
};
export default ImagePreview;
