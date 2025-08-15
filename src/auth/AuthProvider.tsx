import { createContext, useEffect, useState, ReactNode } from "react";
import * as SecureStore from "expo-secure-store";

type AuthCtx = {
  token: string | null;
  setToken: (t: string | null) => Promise<void>;
};

export const AuthContext = createContext<AuthCtx>({
  token: null,
  setToken: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setTokenState] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const t = await SecureStore.getItemAsync("token");
      if (t) setTokenState(t);
    })();
  }, []);

  async function setToken(t: string | null) {
    setTokenState(t);
    if (t) await SecureStore.setItemAsync("token", t);
    else await SecureStore.deleteItemAsync("token");
  }

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
}
