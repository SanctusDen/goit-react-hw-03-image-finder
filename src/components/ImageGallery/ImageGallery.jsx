import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";
import { Gallery } from "./ImageGallery.styled";


export const ImageGallery = ({ images, onClick }) => {
  return (
    <Gallery>
      {images.map(({ id, webformatURL,largeImageURL,tags }) => (
        <ImageGalleryItem
          key={id}
          id={id}
          src={webformatURL}
          largeImageURL={largeImageURL}
          alt={tags}
          onClick={onClick}
        />
      ))}
    </Gallery>
  );
};