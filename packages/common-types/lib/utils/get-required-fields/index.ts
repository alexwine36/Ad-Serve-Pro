import { z } from 'zod';

export const getRequiredFields = <Schema extends z.ZodFirstPartySchemaTypes>(
  schema: Schema
): z.TypeOf<Schema> => {
  switch (schema._def.typeName) {
    case z.ZodFirstPartyTypeKind.ZodDefault:
      return getRequiredFields(schema._def.innerType);
    case z.ZodFirstPartyTypeKind.ZodObject: {
      return Object.fromEntries(
        Object.entries((schema as z.SomeZodObject).shape).map(
          ([key, value]) => [key, getRequiredFields(value)]
        )
      );
    }
    case z.ZodFirstPartyTypeKind.ZodOptional:
      return false;
    case z.ZodFirstPartyTypeKind.ZodNullable:
      return false;
    // case z.ZodFirstPartyTypeKind.ZodUndefined:
    //   return false;
    default:
      return true;
  }
};
