import LoginForm from "@/components/Form/login-form";

interface SearchParams {
  redirect?: string;
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = (await searchParams) || {};

  return (
    <div>
      <LoginForm redirect={params.redirect} />
    </div>
  );
}
