import { Slot } from "@radix-ui/react-slot";
import { cva, VariantProps } from "class-variance-authority";
import React from "react";
import { cn } from "../../lib/utils";


const containerVariants = cva('container mx-auto', {
    variants: {
        variant: {
            "default": ""
        }
    },
    defaultVariants: {
        variant: "default"
    }
})

export interface ContainerProps extends VariantProps<typeof containerVariants>,
		React.HTMLAttributes<HTMLDivElement> {
            	asChild?: boolean;
                section?: boolean;
        }

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
    ({ asChild, variant, section, className, ...props }, ref) => {
        let Component = asChild ? Slot : 'div';
        if (section) {
            Component = 'section';
        }
        return (
            <Component
                ref={ref}
                className={cn(containerVariants({ variant }), className)}
                {...props}
            />
        )
    }

)

Container.displayName = 'Container';