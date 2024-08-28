import "server-only";

import { cookies } from "next/headers";
import { decrypt } from "@/utils/session";
import { cache } from "react";

export const verifySession = cache(async (role: string) => {
  const cookie = cookies().get(role)?.value;

  if (!cookie) return null;
  const session = await decrypt(cookie);

  if (!session?.id) {
    return null;
  }

  return { id: session.id };
});
