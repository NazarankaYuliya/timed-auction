import { verifySession } from "@utils/dal";
import { redirect } from "next/navigation";

const AdminPage = async () => {
  const session = await verifySession("admin");

  if (!session) {
    redirect("/admin/login");
  }
  redirect("/admin/dashboard");
};

export default AdminPage;
