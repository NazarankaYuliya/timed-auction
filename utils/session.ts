import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secretKey = process.env.SESSION_SECRET;
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1 day")
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function createSession(id: string, role: string) {
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const session = await encrypt({ id, expires });

  const cookieStore = await cookies();
  cookieStore.set(role, session, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    expires,
  });
}

export async function deleteSession(role: string) {
  const cookieStore = await cookies();
  cookieStore.delete(role);
}
