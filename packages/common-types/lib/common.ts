import { isValidPhoneNumber } from 'libphonenumber-js';
import { z } from 'zod';

export const PhoneType = z
  .string()
  .refine(isValidPhoneNumber, { message: 'Invalid phone number' });
export const OptionalPhoneType = PhoneType.nullish().or(z.literal(''));
