'use client';

import type { ReactNode } from 'react';
import type {
  FieldPath,
  FieldValues,
  UseControllerProps,
} from 'react-hook-form';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../ui/form';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';

interface FormInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends UseControllerProps<TFieldValues, TName> {
  name: TName;
  label: string;
  description?: string;
  placeholder?: string;
  type?: 'text' | 'textarea';
  prefix?: ReactNode;
  className?: string;
}

export const FormInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  label,
  description,
  placeholder,
  type = 'text',
  prefix,
  className,
}: FormInputProps<TFieldValues, TName>) => {
  let Comp = Input;
  if (type === 'textarea') {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    Comp = Textarea as any;
  }
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem className={className}>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              {prefix ? (
                <div className="flex">
                  <div className="flex w-9 items-center justify-center rounded-s-md border bg-muted text-muted-foreground">
                    {prefix}
                  </div>
                  <div className="-ms-0.5 flex-1">
                    <Comp
                      className="border-s-0"
                      placeholder={placeholder}
                      {...field}
                    />
                  </div>
                </div>
              ) : (
                <Comp placeholder={placeholder} {...field} />
              )}
            </FormControl>
            {description ? (
              <FormDescription>{description}</FormDescription>
            ) : null}

            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};
