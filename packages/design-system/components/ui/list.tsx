import { cva, VariantProps } from "class-variance-authority";
import React from "react";
import { cn } from "../../lib/utils";


const listVariants = cva(
    "list-inside",
    {
        variants: {
            variant: {
                default: "list-disc",
                bullet: "list-disc",
                check: "",
                ordered: "list-decimal",
            },
        },
        defaultVariants: {
        variant: "default",
    }
    },
    
)

export interface ListProps
  extends React.OlHTMLAttributes<HTMLOListElement>,
    VariantProps<typeof listVariants> {
  asChild?: boolean
}

export const List = React.forwardRef<HTMLOListElement, ListProps>(
    ({ className, variant, asChild = false, ...props }, ref) => {
        // const Comp = asChild ? Slot : "ol"
        const Comp = variant === "ordered" ? "ol" : "ul"
        return (
        <Comp
            className={cn(listVariants({ variant, className }))}
            ref={ref}
            {...props}
        />
        )
    }
    )

List.displayName = "List"
export { listVariants };
