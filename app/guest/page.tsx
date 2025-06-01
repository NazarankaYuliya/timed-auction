import { verifySession } from "@utils/dal";
import { redirect } from "next/navigation";
import GuestItems from "@components/GuestItems";

export default async function Guest({
  searchParams,
}: {
  searchParams: Promise<{ [item: string]: string | string[] | undefined }>;
}) {
  const session = await verifySession("user");
  const item = (await searchParams).item;

  if (session) {
    const redirectUrl = item ? `/auction?item=${item}` : "/auction";
    redirect(redirectUrl);
  }

  return <GuestItems />;
}
