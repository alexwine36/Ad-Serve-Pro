import { cn } from '@repo/design-system/lib/utils';
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import type * as React from 'react';

const headingVariants = cva('scroll-m-20 font-light tracking-normal ', {
  variants: {
    level: {
      1: 'text-4xl lg:text-5xl',
      2: 'text-3xl first:mt-0',
      3: 'text-2xl ',
      4: 'text-xl ',
    },
    separator: {
      default: '',
      bottom: 'border-b pb-1',
    },
    colorVariant: {
      default: '',
      // cool: 'bg-cool text-transparent !bg-clip-text !bg-cover !bg-center pb-1',
    },
  },
  defaultVariants: {
    level: 1,
    colorVariant: 'default',
  },
});

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  // level: 1 | 2 | 3 | 4;
}

export const Heading = ({
  className,
  level = 1,
  colorVariant,
  separator,
  ...props
}: HeadingProps) => {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const Comp = `h${level}` as any;

  return (
    <Comp
      className={cn(
        headingVariants({ separator, level, colorVariant, className })
      )}
      {...props}
    />
  );
};
