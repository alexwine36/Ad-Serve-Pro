import type {
  FieldPath,
  FieldValues,
  UseControllerProps,
} from 'react-hook-form';
import { cn } from '../../../lib/utils';
import { Checkbox } from '../../ui/checkbox';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../ui/form';

interface FormInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends UseControllerProps<TFieldValues> {
  name: TName;
  label: string;
  description?: string;
  className?: string;
}

export const CheckboxInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  label,
  description,
  className,
}: FormInputProps<TFieldValues, TName>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem
            className={cn(
              'flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow',
              className
            )}
          >
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>{label}</FormLabel>
              {description ? (
                <FormDescription>{description}</FormDescription>
              ) : null}

              <FormMessage />
            </div>
          </FormItem>
        );
      }}
    />
  );
};
