"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export function DesktopAdminLink() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    let isMounted = true;
    fetch("/api/auth/me")
      .then((res) => (res.ok ? res.json() : { authenticated: false }))
      .then((data) => {
        if (isMounted && data?.authenticated) {
          setIsAdmin(true);
        }
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, []);

  if (!isAdmin) return null;

  return (
    <Link
      href="/admin/products"
      className="rounded-lg px-3 py-2 transition hover:bg-[rgba(238,217,185,0.35)] hover:text-zinc-950 font-semibold text-[var(--color-brand-700)]"
    >
      Quản trị
    </Link>
  );
}

export function MobileAdminLink() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    let isMounted = true;
    fetch("/api/auth/me")
      .then((res) => (res.ok ? res.json() : { authenticated: false }))
      .then((data) => {
        if (isMounted && data?.authenticated) {
          setIsAdmin(true);
        }
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, []);

  if (!isAdmin) return null;

  return (
    <Link
      href="/admin/products"
      className="rounded-xl px-3 py-2 transition hover:bg-[rgba(238,217,185,0.35)] font-semibold text-[var(--color-brand-700)]"
    >
      Quản trị
    </Link>
  );
}
