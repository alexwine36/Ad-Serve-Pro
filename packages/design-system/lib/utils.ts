import { parseError } from '@repo/observability/error';
import type { ClassValue } from 'clsx';
import { clsx } from 'clsx';
import { pipe, capitalize as rCapitalize, toKebabCase } from 'remeda';
import { toast } from 'sonner';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]): string => twMerge(clsx(inputs));

export const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const handleError = (error: unknown): void => {
  const message = parseError(error);

  toast.error(message);
};


export function formatDate(
  date: Date | string | number,
  opts: Intl.DateTimeFormatOptions = {},
) {
  return new Intl.DateTimeFormat("en-US", {
    month: opts.month ?? "long",
    day: opts.day ?? "numeric",
    year: opts.year ?? "numeric",
    ...opts,
  }).format(new Date(date));
}

export function toSentenceCase(str: string) {
  return pipe(
    str,
    toKebabCase(),
    (s) => s.replace(/-/g, ' '),
    rCapitalize()
  )
}