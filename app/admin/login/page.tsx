import AdminLoginForm from "./adminLoginForm";
import { verifySession } from "@/utils/dal";
import { redirect } from "next/navigation";

export default async function AdminLogin() {
  const session = await verifySession("admin");

  if (session) {
    redirect("/admin/dashboard");
  }

  return <AdminLoginForm />;
}
