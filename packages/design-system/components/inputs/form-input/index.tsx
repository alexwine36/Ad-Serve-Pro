'use client';

import dynamic from 'next/dynamic';
import type { ReactNode } from 'react';
import type {
  ControllerRenderProps,
  FieldPath,
  FieldValues,
  UseControllerProps,
} from 'react-hook-form';

const PhoneInput = dynamic(() =>
  import('../../custom/phone-input').then((mod) => mod.PhoneInput)
);

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

type InputTypeOptions = 'text' | 'textarea' | 'phone';
interface FormInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends UseControllerProps<TFieldValues, TName> {
  name: TName;
  label: string;
  description?: string;
  placeholder?: string;
  type?: InputTypeOptions;
  prefix?: ReactNode;
  className?: string;
  required?: boolean;
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
  disabled,
  required,
}: FormInputProps<TFieldValues, TName>) => {
  return (
    <FormField
      disabled={disabled}
      control={control}
      name={name}
      required={required}
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
                    <ComponentRenderer
                      type={type}
                      className="border-s-0"
                      placeholder={placeholder}
                      field={field}
                    />
                  </div>
                </div>
              ) : (
                <ComponentRenderer
                  placeholder={placeholder}
                  type={type}
                  field={field}
                />
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

const ComponentRenderer = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  type,
  field,
  placeholder,
  ...rest
}: {
  className?: string;
  field: ControllerRenderProps<TFieldValues, TName>;
  placeholder?: string;
  type: InputTypeOptions;
}) => {
  if (type === 'phone') {
    return <PhoneInput defaultCountry="US" {...rest} {...field} />;
  }

  if (type === 'textarea') {
    return <Textarea {...rest} {...field} />;
  }

  return <Input {...rest} {...field} />;
};
