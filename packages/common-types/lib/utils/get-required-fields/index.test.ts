import { z } from 'zod';
import { getRequiredFields } from '.';
const Schema = z.object({
  name: z.string().default(''),
  age: z.number().optional(),
  address: z.string().nullable(),
  something: z.string().nullish(),
  nested: z.object({
    name: z.string(),
    age: z.number().nullable(),
    address: z.string().nullish(),
    something: z.string().optional(),
  }),
});
describe('GetRequiredFields', () => {
  test('should return required fields', () => {
    const fields = getRequiredFields(Schema);

    expect(fields.name).toBe(true);
    expect(fields.age).toBe(false);
    expect(fields.address).toBe(false);
    expect(fields.something).toBe(false);
    expect(fields.nested.name).toBe(true);
    expect(fields.nested.age).toBe(false);
    expect(fields.nested.address).toBe(false);
    expect(fields.nested.something).toBe(false);

    // expect()
  });
  test('should return required fields for object with defaults', () => {
    const fields = getRequiredFields(
      z
        .object({
          name: z.string(),
          age: z.number().optional(),
        })
        .default({
          name: 'John',
        })
    );

    expect(fields.name).toBe(true);
    expect(fields.age).toBe(false);
  });
});
