import React, { useState } from "react";
import { ImageSliderContainer, Image, ImagesContainer, LeftArrow, RightArrow } from "./ImageSliderElements";
import { cdnContentImagesUrl } from "src/features/apiUrl";

const ImageSlider = ({ images, selectedIndex, onClose, username }) => {
    const [currentIndex, setCurrentIndex] = useState(selectedIndex);

    const handleNextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const handlePrevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };
    const feedImage = (image) => cdnContentImagesUrl(`/feed/${image}`);

    return (
        <ImageSliderContainer>
            <LeftArrow onClick={handlePrevSlide}>&#10094;</LeftArrow>
            <RightArrow onClick={handleNextSlide}>&#10095;</RightArrow>
            <ImagesContainer>
                {images.map((image, index) => (
                    <Image
                        key={index}
                        src={feedImage(image)}
                        alt={username?.username + ` image ${index + 1}`}
                        style={{ display: index === currentIndex ? "block" : "none" }}
                    />
                ))}
            </ImagesContainer>
        </ImageSliderContainer>
    );
};

export default ImageSlider;
