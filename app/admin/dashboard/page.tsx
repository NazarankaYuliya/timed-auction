import { verifySession } from "@/utils/dal";
import { redirect } from "next/navigation";
import UploadItemsButton from "./(components)/uploadItems";
import UploadImages from "./(components)/uploadImages";
import SetAuctionDateComponent from "./(components)/setAuctionDate";

export default async function AdminPage() {
  const session = await verifySession("admin");

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <p className="text-gray-600 mb-4">Admin ID: {session.id}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <UploadItemsButton />
        <UploadImages />
        <SetAuctionDateComponent />
      </div>
    </div>
  );
}
