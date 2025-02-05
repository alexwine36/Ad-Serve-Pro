import { z } from 'zod';

export function typedObjectKeys<T extends object>(obj: T) {
  return Object.keys(obj) as (keyof typeof obj)[];
}

export function getZodEnumFromObjectKeys<
  TI extends Record<string, unknown>,
  R extends string = TI extends Record<infer R, unknown> ? R : never,
>(input: TI): z.ZodEnum<[R, ...R[]]> {
  const [firstKey, ...otherKeys] = Object.keys(input) as [R, ...R[]];
  return z.enum([firstKey, ...otherKeys]);
}

const zodEnum = <T>(arr: T[]): [T, ...T[]] => arr as [T, ...T[]];

export function getZodEnumFromObjectValues<
  TI extends Record<string, string>,
  R extends string = TI extends Record<string, infer R> ? R : never,
>(input: TI) {
  return z.enum(zodEnum(Object.values(input) as R[]));
  // return z.enum(Object.values(input) as R[]);
}
