import { Button } from '@repo/design-system/components/ui/button';
import { Input } from '@repo/design-system/components/ui/input';
import { Label } from '@repo/design-system/components/ui/label';
import type React from 'react';

export function LoginForm({
  ...props
}: React.ComponentPropsWithoutRef<'form'>) {
  return (
    <form className="flex flex-col gap-4" {...props}>
      <div className="flex flex-col items-center gap-4 text-center">
        <h1 className="font-bold text-2xl">Login to your account</h1>
        <p className="text-balance text-muted-foreground text-sm">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" placeholder="m@example.com" required type="email" />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            {/* <a
              className="ml-auto text-sm underline-offset-4 hover:underline"
              href="#"
            >
              Forgot your password?
            </a> */}
          </div>
          <Input id="password" required type="password" />
        </div>
        <Button className="w-full" type="submit">
          Login
        </Button>
      </div>
    </form>
  );
}
