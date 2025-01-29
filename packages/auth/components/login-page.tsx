import { LoginForm } from './login-form';
import { ProvidersDisplay } from './providers';

export default function LoginPage(props: {
  searchParams: { callbackUrl: string | undefined };
}) {
  return (
    <div className="grid gap-2">
      <LoginForm />
      <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-border after:border-t">
        <span className="relative z-10 bg-background px-2 text-muted-foreground">
          Or continue with
        </span>
      </div>
      <ProvidersDisplay searchParams={props.searchParams} />
    </div>
  );
}
