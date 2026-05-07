import { useEffect, useState } from "react";
import { getMe, logout } from "@/services/auth.service";

export function useAuth() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    getMe()
      .then((data) => {
        if (!cancelled) setAuthenticated(data.authenticated);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  async function signOut() {
    await logout();
    setAuthenticated(false);
  }

  return { authenticated, loading, signOut, setAuthenticated };
}

