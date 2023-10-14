import React from "react";
import { GalleryItem } from "./ImageGalleryItem.styled";

export const ImageGalleryItem = ({ tags, src, onClick,largeImageURL }) => {
  return (
    <GalleryItem onClick={()=>onClick ({tags,largeImageURL})}>
      <img src={src} alt={tags} />
    </GalleryItem>
  );
};

