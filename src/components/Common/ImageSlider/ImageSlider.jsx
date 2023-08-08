import React, { useState } from "react";
import { ImageSliderContainer, Image, ImagesContainer, LeftArrow, RightArrow } from "./ImageSliderElements";

const ImageSlider = ({ images, selectedIndex, onClose }) => {
    const [currentIndex, setCurrentIndex] = useState(selectedIndex);

    const handleNextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const handlePrevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    return (
        <ImageSliderContainer>
            <LeftArrow onClick={handlePrevSlide}>&#10094;</LeftArrow>
            <RightArrow onClick={handleNextSlide}>&#10095;</RightArrow>
            <ImagesContainer>
                {images.map((image, index) => (
                    <Image
                        key={index}
                        src={`https://storagethecyberhub.blob.core.windows.net/thecyberhub-assets/development/feed/${image}`}
                        alt={`Uploaded ${index + 1}`}
                        style={{ display: index === currentIndex ? "block" : "none" }}
                    />
                ))}
            </ImagesContainer>
        </ImageSliderContainer>
    );
};

export default ImageSlider;
