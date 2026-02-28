import ResetPasswordForm from "@/components/modules/commonLayout/ResetPaassword/ResetPassword";

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams?: Promise<{ redicect?: string }>;
}) {
  const params = (await searchParams) || {};
  const redirect = params.redicect;
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-6 rounded-lg border p-8 shadow-lg">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Reset Your Password</h1>
          <p className="text-muted-foreground">
            Enter your new password below to reset your account password
          </p>
        </div>
        <ResetPasswordForm redirect={redirect} />
      </div>
    </div>
  );
}
