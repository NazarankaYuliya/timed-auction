import { verifySession } from "@/utils/dal";
import UserItems from "@components/UserItems";
import { AuctionProvider } from "@context/AuctionContext";
import { redirect } from "next/navigation";

export default async function AuctionPage({
  searchParams,
}: {
  searchParams: Promise<{ [item: string]: string | string[] | undefined }>;
}) {
  const session = await verifySession("user");
  const lot = (await searchParams).lot;

  if (!session) {
    const redirectUrl = lot ? `/guest?lot=${lot}` : "/guest";
    redirect(redirectUrl);
  }

  return (
    <AuctionProvider>
      <UserItems session={session} />
    </AuctionProvider>
  );
}
