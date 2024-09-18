import Image from "next/image";
import IMG from "@public/assets/images/placeholder-image.jpg";

interface ImageComponentProps {
  itemImage: string[];
}

const ImageComponent: React.FC<ImageComponentProps> = ({ itemImage }) => {
  return (
    <>
      {itemImage.length > 0 ? (
        <Image
          src={itemImage[0]}
          width={150}
          height={150}
          alt="image of item"
        />
      ) : (
        <Image src={IMG} width={200} height={200} alt="image of item" />
      )}
    </>
  );
};

export default ImageComponent;
