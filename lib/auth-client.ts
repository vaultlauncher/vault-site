import { createAuthClient } from "better-auth/react";
import { usernameClient } from "better-auth/client/plugins";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://vaultapi.parcoil.com";

export const authClient = createAuthClient({
  baseURL: API_URL,
  plugins: [usernameClient()],
});

export const { signIn, signUp, useSession } = authClient;
