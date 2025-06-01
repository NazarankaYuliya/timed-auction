import { verifySession } from "@/utils/dal";
import UserItems from "@components/UserItems";
import { redirect } from "next/navigation";

export default async function AuctionPage({
  searchParams,
}: {
  searchParams: Promise<{ [item: string]: string | string[] | undefined }>;
}) {
  const session = await verifySession("user");
  const item = (await searchParams).item;

  if (!session) {
    const redirectUrl = item ? `/guest?item=${item}` : "/guest";
    redirect(redirectUrl);
  }

  return <UserItems session={session} />;
}
