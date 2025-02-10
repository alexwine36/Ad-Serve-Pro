import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@repo/design-system/lib/utils";

// Generator for outline color options
// const outlineColors = [
//   "orange",
//   "cyan",
//   "blue",
//   "red",
//   "green",
//   "slate",
//   "purple",
//   "pink",
//   "yellow",
//   "indigo",
//   "teal",
//   "violet",
// ];
// const colorOpts = outlineColors.reduce((acc, color) => {
//   acc[
//     color
//   ] = `border-${color}-500 bg-${color}-100/25 text-${color}-700 dark:bg-${color}-900 dark:text-${color}-100`;
//   return acc;
// }, {});
// console.log(colorOpts);

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        destructiveOutline:
          "border-background bg-background/15 text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        muted: "border-transparent bg-muted text-muted-foreground hover:bg-muted/80",
        dumb: "rounded-t-none rounded-b-none"
      },
      outlineColor: {
        default: "",

        orange:
          "border-orange-500 bg-orange-100/25 text-orange-700 dark:bg-orange-900 dark:text-orange-100",
        cyan: "border-cyan-500 bg-cyan-100/25 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-100",
        blue: "border-blue-500 bg-blue-100/25 text-blue-700 dark:bg-blue-900 dark:text-blue-100",
        red: "border-red-500 bg-red-100/25 text-red-700 dark:bg-red-900 dark:text-red-100",
        green:
          "border-green-500 bg-green-100/25 text-green-700 dark:bg-green-900 dark:text-green-100",
        slate:
          "border-slate-500 bg-slate-100/25 text-slate-700 dark:bg-slate-900 dark:text-slate-100",
        purple:
          "border-purple-500 bg-purple-100/25 text-purple-700 dark:bg-purple-900 dark:text-purple-100",
        pink: "border-pink-500 bg-pink-100/25 text-pink-700 dark:bg-pink-900 dark:text-pink-100",
        yellow:
          "border-yellow-500 bg-yellow-100/25 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-100",
        indigo:
          "border-indigo-500 bg-indigo-100/25 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-100",
        teal: "border-teal-500 bg-teal-100/25 text-teal-700 dark:bg-teal-900 dark:text-teal-100",
        violet:
          "border-violet-500 bg-violet-100/25 text-violet-700 dark:bg-violet-900 dark:text-violet-100",
      },
    },

    defaultVariants: {
      variant: "default",
      outlineColor: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, outlineColor, variant, ...props }: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ variant, outlineColor }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
