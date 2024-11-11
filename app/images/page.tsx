import Image from "next/image";

export default async function ProductImages() {
  const catalogNumber = 24010001;
  const imageUrl = `https://petzold-filebrowser.bidsvio.online/files/srv/auction-1645/${catalogNumber}`;

  return (
    <div>
      <Image
        src={imageUrl}
        alt="image of item"
        fill
        sizes="(max-width: 768px) 80vw, (max-width: 1200px) 50vw, 33vw"
        className="cursor-pointer object-cover"
        quality={65}
      />
    </div>
  );
}
