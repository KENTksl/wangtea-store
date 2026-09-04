import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getSessionCookieName, getSessionFromCookieValue } from "@/lib/auth";
import { getHeroBannerConfig } from "@/lib/hero-banner-repo";
import AdminHeroBannerClient from "./hero-banner-client";

export default async function AdminHeroBannerPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(getSessionCookieName())?.value;
  const session = await getSessionFromCookieValue(token);

  if (!session) {
    redirect("/login?next=/admin/hero-banner");
  }

  const initialConfig = await getHeroBannerConfig();

  return <AdminHeroBannerClient initialConfig={initialConfig} sessionUser={session.sub} />;
}
