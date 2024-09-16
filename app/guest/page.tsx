import { verifySession } from "@utils/dal";
import { redirect } from "next/navigation";
import GuestItems from "@components/GuestItems";

export default async function Guest() {
  const session = await verifySession("user");

  if (session) {
    redirect("/auction");
  }

  return <GuestItems />;
}
