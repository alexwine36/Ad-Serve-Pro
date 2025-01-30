import { z } from 'zod';
import { getSchemaDefaults } from '.';

const TestSchema = z
  .object({
    // Define your schema here
    id: z.string().optional(),
    hello: z.string(),
  })
  .default({
    // Define default values here
    hello: 'world',
  });

describe('GetSchemaDefaults', () => {
  test('should return defaults for TestSchema', () => {
    const defaults = getSchemaDefaults(TestSchema);
    expect(defaults).toEqual({
      hello: 'world',
    });
  });
  test('should return internal defaults', () => {
    const defaults = getSchemaDefaults(
      z.object({
        id: z.string().optional(),
        hello: z.string().default('world'),
        name: z.string().min(2).default(''),
      })
    );
    expect(defaults).toEqual({
      hello: 'world',
      name: '',
    });
  });
});
