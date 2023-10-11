import React from "react";
import { GalleryItem } from "./ImageGalleryItem.styled";

export const ImageGalleryItem = ({ id, src, onClick }) => {
  return (
    <GalleryItem onClick={onClick} id={id}>
      <img src={src} alt="" />
    </GalleryItem>
  );
};

