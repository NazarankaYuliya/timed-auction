import { verifySession } from "@/utils/dal";
import { redirect } from "next/navigation";
import UserRegisterForm from "./userRegisterForm";

export default async function UserLogin() {
  const session = await verifySession("user");

  if (session) {
    redirect("/auction");
  } else {
    return <UserRegisterForm />;
  }
}
