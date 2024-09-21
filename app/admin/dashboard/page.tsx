"use client";
import UploadItemsButton from "../(components)/uploadItems";
import UploadImages from "../(components)/uploadImages";
import SetAuctionDateComponent from "../(components)/setAuctionDate";

export default function Dashboard() {
  return (
    <div className="min-h-screen p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <UploadItemsButton />
        <UploadImages />
        <SetAuctionDateComponent />
      </div>
    </div>
  );
}
