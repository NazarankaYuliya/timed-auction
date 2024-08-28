import { verifySession } from "@/utils/dal";
import { redirect } from "next/navigation";
import UploadItemsButton from "./uploadItems";
import UploadImages from "./uploadImages";

export default async function AdminPage() {
  const session = await verifySession("admin");

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <p>Welcome, Admin with ID: {session.id}</p>

      <UploadItemsButton />
      <UploadImages />
    </div>
  );
}
