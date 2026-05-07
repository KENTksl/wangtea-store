import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminProductsClient from "@/components/admin/AdminProductsClient";
import { getSessionCookieName, getSessionFromCookieValue } from "@/lib/auth";

export default async function AdminProductsPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(getSessionCookieName())?.value;
  const session = await getSessionFromCookieValue(token);

  if (!session) {
    redirect("/login?next=/admin/products");
  }

  return <AdminProductsClient />;
}

