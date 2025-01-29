import LoginComponent from '@repo/auth/components/login-page';

export default async function LoginPage(props: {
  searchParams: Promise<{ callbackUrl: string | undefined }>;
}) {
  const searchParams = await props.searchParams;

  return <LoginComponent searchParams={searchParams} />;
}
