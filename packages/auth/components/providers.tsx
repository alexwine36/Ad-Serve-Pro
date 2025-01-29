import { Button } from '@repo/design-system/components/ui/button';
import { AuthError } from 'next-auth';
import { providerMap, signIn } from '../auth';
import { getSocialIcon } from '../utils/get-social-icons';

export const ProvidersDisplay = (props: {
  searchParams: { callbackUrl: string | undefined };
}) => {
  const renderProviderSignIn =
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      (provider: { id: string; name: string }): any =>
      async () => {
        'use server';
        try {
          await signIn(provider.id, {
            redirectTo: props.searchParams?.callbackUrl ?? '',
          });
        } catch (error) {
          // Signin can fail for a number of reasons, such as the user
          // not existing, or the user not having the correct role.
          // In some cases, you may want to redirect to a custom error
          if (error instanceof AuthError) {
            //   return redirect(
            //     `${SIGNIN_ERROR_URL}?error=${error.type}`
            //   );
          }

          // Otherwise if a redirects happens Next.js can handle it
          // so you can just re-thrown the error and let Next.js handle it.
          // Docs:
          // https://nextjs.org/docs/app/api-reference/functions/redirect#server-component
          throw error;
        }
      };
  return (
    <div>
      {Object.values(providerMap).map((provider) => (
        <form action={renderProviderSignIn(provider)} key={provider.id}>
          <Button className="w-full" type="submit" variant="outline">
            {getSocialIcon(provider.id)}
            <span>Login in with {provider.name}</span>
          </Button>
        </form>
      ))}
    </div>
  );
};
