import { verifySession } from "@/utils/dal";
import { redirect } from "next/navigation";
import UploadItemsButton from "./uploadItems";
import UploadImages from "./uploadImages";
import SetAuctionDateComponent from "./setAuctionDate";

export default async function AdminPage() {
  const session = await verifySession("admin");

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex flex-wrap justify-between">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Admin Dashboard
        </h1>
        <p className="text-gray-600 mb-4">Admin ID: {session.id}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <UploadItemsButton />
        <UploadImages />
        <SetAuctionDateComponent />
      </div>
    </div>
  );
}
