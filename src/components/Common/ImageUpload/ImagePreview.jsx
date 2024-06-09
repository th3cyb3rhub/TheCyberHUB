import React from "react";
import { ImageContainer, ImagesContainer, PreviewImage, RemoveButton } from "./ImageElements";

const ImagePreview = ({ files, onRemove }) => {
    // console.log(files);
    return (
        <ImagesContainer>
            {files?.map((file, index) => (
                <ImageContainer key={index}>
                    <PreviewImage src={URL.createObjectURL(file)} alt={`Uploaded ${index + 1}`} />
                    <RemoveButton onClick={() => onRemove(index)}>&#10005;</RemoveButton>
                </ImageContainer>
            ))}
        </ImagesContainer>
    );
};
export default ImagePreview;
