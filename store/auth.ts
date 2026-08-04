import { create } from "zustand";
import { authClient } from "@/lib/auth-client";

interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string | null;
  username?: string | null;
  displayUsername?: string | null;
  vaultPlus: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface AuthState {
  user: User | null;
  token: string | null;
  loaded: boolean;
  loading: boolean;
  error: string | null;
  signIn: (emailOrUsername: string, password: string) => Promise<void>;
  signUp: (
    email: string,
    password: string,
    name: string,
    username: string
  ) => Promise<void>;
  signOut: () => Promise<void>;
  loadSession: () => Promise<void>;
  updateProfile: (data: { username?: string; name?: string }) => Promise<void>;
  clearError: () => void;
}

const TOKEN_KEY = "vault_site_auth_token";

function getToken(): string | null {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

function setToken(token: string | null) {
  try {
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
    } else {
      localStorage.removeItem(TOKEN_KEY);
    }
  } catch {
    // localStorage unavailable
  }
}

function captureToken(ctx: { response: Response }) {
  const authToken = ctx.response.headers.get("set-auth-token");
  if (authToken) {
    setToken(decodeURIComponent(authToken));
  }
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  loaded: false,
  loading: false,
  error: null,

  signIn: async (emailOrUsername, password) => {
    set({ loading: true, error: null });
    try {
      const isEmail = emailOrUsername.includes("@");
      const result = isEmail
        ? await authClient.signIn.email(
            { email: emailOrUsername, password },
            { onSuccess: captureToken }
          )
        : await authClient.signIn.username(
            { username: emailOrUsername, password },
            { onSuccess: captureToken }
          );
      const { data, error } = result;
      if (error) {
        set({ loading: false, error: error.message || "Sign in failed" });
        return;
      }
      if (data?.user) {
        const authToken = getToken();
        set({
          user: data.user as unknown as User,
          token: authToken,
          loading: false,
        });
      } else {
        set({ loading: false });
      }
    } catch (err: any) {
      set({ loading: false, error: err.message || "Sign in failed" });
    }
  },

  signUp: async (email, password, name, username) => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await authClient.signUp.email(
        { email, password, name, username },
        { onSuccess: captureToken }
      );
      if (error) {
        set({ loading: false, error: error.message || "Sign up failed" });
        return;
      }
      if (data?.user) {
        const authToken = getToken();
        set({
          user: data.user as unknown as User,
          token: authToken,
          loading: false,
        });
      } else {
        set({ loading: false });
      }
    } catch (err: any) {
      set({ loading: false, error: err.message || "Sign up failed" });
    }
  },

  signOut: async () => {
    try {
      const currentToken = getToken();
      await authClient.signOut({
        fetchOptions: {
          headers: currentToken
            ? { Authorization: `Bearer ${currentToken}` }
            : undefined,
        },
      });
    } catch {
      // ignore sign out errors
    }
    setToken(null);
    set({ user: null, token: null });
  },

  loadSession: async () => {
    const currentToken = getToken();
    if (!currentToken) {
      set({ loaded: true });
      return;
    }
    try {
      const { data } = await authClient.getSession({
        fetchOptions: {
          headers: { Authorization: `Bearer ${currentToken}` },
        },
      });
      if (data?.user) {
        set({
          user: data.user as unknown as User,
          token: currentToken,
          loaded: true,
        });
      } else {
        setToken(null);
        set({ loaded: true });
      }
    } catch {
      setToken(null);
      set({ loaded: true });
    }
  },

  updateProfile: async (data) => {
    set({ error: null });
    try {
      const currentToken = getToken();
      const { error } = await authClient.updateUser(data, {
        fetchOptions: {
          headers: currentToken
            ? { Authorization: `Bearer ${currentToken}` }
            : undefined,
        },
      });
      if (error) {
        set({ error: error.message || "Failed to update profile" });
        throw error;
      }
      const { data: session } = await authClient.getSession({
        fetchOptions: {
          headers: { Authorization: `Bearer ${currentToken}` },
        },
      });
      if (session?.user) {
        set({ user: session.user as unknown as User });
      }
    } catch (err) {
      set({ error: (err as any)?.message || "Failed to update profile" });
      throw err;
    }
  },

  clearError: () => set({ error: null }),
}));
