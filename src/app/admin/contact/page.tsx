import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getSessionCookieName, getSessionFromCookieValue } from "@/lib/auth";
import { getContactConfig } from "@/lib/contact-repo";
import AdminContactSettingsClient from "./contact-settings-client";

export default async function AdminContactPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(getSessionCookieName())?.value;
  const session = await getSessionFromCookieValue(token);

  if (!session) {
    redirect("/login?next=/admin/contact");
  }

  const initialConfig = await getContactConfig();

  return (
    <AdminContactSettingsClient
      initialConfig={initialConfig}
      sessionUser={session.sub}
    />
  );
}
