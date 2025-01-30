'use client';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@radix-ui/react-popover';
import { format } from 'date-fns';
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

import { Calendar as CalendarIcon } from 'lucide-react';

import type { Matcher } from 'react-day-picker';
import { cn } from '../../../lib/utils';
import { Button } from '../../ui/button';
import { Calendar } from '../../ui/calendar';
import { Card } from '../../ui/card';

interface FormInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends UseControllerProps<TFieldValues, TName> {
  name: TName;
  label: string;
  description?: string;
  placeholder?: string;
  className?: string;
  required?: boolean;
  disabledBefore?: Date;
  disabledAfter?: Date;
  //   calendarProps?: CalendarProps
  prevYears?: number;
  nextYears?: number;
}

const getDisabledMatcher = ({
  disabledBefore,
  disabledAfter,
}: Pick<FormInputProps, 'disabledBefore' | 'disabledAfter'>):
  | Matcher
  | undefined => {
  if (disabledAfter && disabledBefore) {
    return {
      before: disabledBefore,
      after: disabledAfter,
    };
  }
  if (disabledBefore) {
    return { before: disabledBefore };
  }
  if (disabledAfter) {
    return {
      after: disabledAfter,
    };
  }

  return undefined;
};

export const DateInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  label,
  description,
  placeholder,
  className,
  disabled,
  required,
  disabledAfter,
  disabledBefore,
  prevYears = 2,
  nextYears = 10,
}: FormInputProps<TFieldValues, TName>) => {
  const disabledMatcher = getDisabledMatcher({ disabledBefore, disabledAfter });
  return (
    <FormField
      disabled={disabled}
      control={control}
      name={name}
      required={required}
      render={({ field }) => {
        // const date = field.value;

        const setDate = (date?: Date) => {
          field.onChange(date);
        };

        return (
          <FormItem className={cn('flex flex-col gap-2', className)}>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={'outline'}
                    className={cn(
                      'w-full justify-start text-left font-normal',
                      !field.value && 'text-muted-foreground'
                    )}
                  >
                    {field.value ? (
                      format(field.value, 'PPP')
                    ) : (
                      <span>{placeholder}</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="z-10 w-auto p-0" align="start">
                  <Card>
                    <Calendar
                      mode="single"
                      selected={field.value}
                      defaultMonth={field.value || new Date()}
                      onSelect={setDate}
                      captionLayout="dropdown-buttons"
                      fromYear={
                        disabledBefore?.getFullYear() ||
                        new Date().getFullYear() - prevYears
                      }
                      toYear={
                        disabledAfter?.getFullYear() ||
                        new Date().getFullYear() + nextYears
                      }
                      disabled={disabledMatcher}
                    />
                  </Card>
                </PopoverContent>
              </Popover>
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
