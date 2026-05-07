type LoginPayload = {
  email: string;
  password: string;
};

export async function login(payload: LoginPayload): Promise<void> {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const data = (await res.json().catch(() => null)) as { message?: string } | null;
    throw new Error(data?.message || "Login failed");
  }
}

export async function logout(): Promise<void> {
  const res = await fetch("/api/auth/logout", { method: "POST" });
  if (!res.ok) {
    throw new Error("Logout failed");
  }
}

export async function getMe(): Promise<{ authenticated: boolean }> {
  const res = await fetch("/api/auth/me", { method: "GET" });
  if (!res.ok) {
    return { authenticated: false };
  }
  const data = (await res.json().catch(() => null)) as
    | { authenticated?: boolean }
    | null;
  return { authenticated: Boolean(data?.authenticated) };
}

