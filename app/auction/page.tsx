import { verifySession } from "@/utils/dal";
import UserItems from "@components/UserItems";
import { redirect } from "next/navigation";

export default async function AuctionPage() {
  const session = await verifySession("user");

  if (!session) {
    redirect("/");
  }

  return <UserItems session={session} />;
}
