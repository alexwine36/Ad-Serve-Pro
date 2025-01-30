import { z } from 'zod';

// export const getSchemaDefaults = <Schema extends z.ZodFirstPartySchemaTypes>(
//   schema: Schema
// ): z.TypeOf<Schema> => {
//   switch (schema._def.typeName) {
//     case z.ZodFirstPartyTypeKind.ZodDefault:
//       return schema._def.defaultValue();
//     case z.ZodFirstPartyTypeKind.ZodObject: {
//       // The switch wasn't able to infer this but the cast should
//       // be safe.
//       return Object.fromEntries(
//         Object.entries((schema as z.SomeZodObject).shape).map(
//           ([key, value]) => [key, getSchemaDefaults(value)]
//         )
//       );
//     }
//     case z.ZodFirstPartyTypeKind.ZodString:
//       return '';
//     case z.ZodFirstPartyTypeKind.ZodNull:
//       return null;
//     case z.ZodFirstPartyTypeKind.ZodNullable:
//       return null;
//     // etc
//     default:
//       throw new Error(`Unsupported type ${schema._type}`);
//   }
// };

export function getSchemaDefaults<Schema extends z.AnyZodObject>(
  schema: Schema | z.ZodDefault<Schema>
) {
  if (schema._def.typeName === z.ZodFirstPartyTypeKind.ZodDefault) {
    return schema._def.defaultValue();
  }

  if ('shape' in schema) {
    return Object.fromEntries(
      Object.entries(schema.shape).map(([key, value]) => {
        if (value instanceof z.ZodDefault)
          return [key, value._def.defaultValue()];
        return [key, undefined];
      })
    );
  }
}
