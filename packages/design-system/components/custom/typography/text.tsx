import { cn } from '@repo/design-system/lib/utils';
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import type * as React from 'react';

const textVariants = cva('max-w-prose', {
  variants: {
    variant: {
      default: 'leading-7 [&:not(:first-child)]:mt-6',
      muted: 'text-muted-foreground',
      bold: 'font-semibold',
      blockquote: 'mt-6 border-l-2 pl-6 italic',
      code: 'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono font-semibold text-sm',
      lead: 'text-muted-foreground text-xl',
    },
    size: {
      default: '',
      sm: 'text-sm',
      lg: 'text-lg',
      xl: 'text-xl',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

export interface TextProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof textVariants> {}

export const Text = ({ className, size, variant, ...props }: TextProps) => {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  let Comp: any = 'p'; // `h${variant}` as any;

  if (variant === 'blockquote') {
    Comp = 'blockquote';
  }
  if (variant === 'code') {
    Comp = 'code';
  }
  return (
    <Comp
      className={cn(textVariants({ size, variant, className }))}
      {...props}
    />
  );
};
