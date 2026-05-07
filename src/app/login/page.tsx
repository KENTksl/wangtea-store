import LoginForm from "@/components/auth/LoginForm";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const sp = await searchParams;
  const nextPath = sp.next || "/admin/products";
  return (
    <div className="mx-auto w-full max-w-xl">
      <section className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm sm:p-10">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Đăng nhập</h1>
          <p className="mt-2 text-sm text-zinc-600">
            Chỉ tài khoản quản trị mới có thể chỉnh sửa sản phẩm.
          </p>
        </div>

        <LoginForm nextPath={nextPath} />
      </section>
    </div>
  );
}
