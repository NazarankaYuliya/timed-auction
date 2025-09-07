import { verifySession } from "@utils/dal";
import { redirect } from "next/navigation";
import GuestItems from "@components/GuestItems";
import { AuctionProvider } from "@context/AuctionContext";

export default async function Guest({
  searchParams,
}: {
  searchParams: Promise<{ [item: string]: string | string[] | undefined }>;
}) {
  const session = await verifySession("user");
  const lot = (await searchParams).lot;

  if (session) {
    const redirectUrl = lot ? `/auction?lot=${lot}` : "/auction";
    redirect(redirectUrl);
  }

  return (
    <AuctionProvider>
      <GuestItems />
    </AuctionProvider>
  );
}
