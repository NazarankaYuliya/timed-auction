import { verifySession } from "@/utils/dal";
import { redirect } from "next/navigation";
import UserLoginForm from "./userLoginForm";

export default async function UserLogin() {
  const session = await verifySession("user");

  if (session) {
    redirect("/auction");
  }

  return <UserLoginForm />;
}
