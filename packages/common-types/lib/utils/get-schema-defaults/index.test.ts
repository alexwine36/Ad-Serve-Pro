import { z } from "zod";
import { getSchemaDefaults } from ".";

const TestSchema = z
  .object({
    // Define your schema here
    id: z.string().optional(),
    hello: z.string(),
  })
  .default({
    // Define default values here
    hello: "world",
  });

describe("GetSchemaDefaults", () => {
  test("should return defaults for TestSchema", () => {
    const defaults = getSchemaDefaults(TestSchema);
    expect(defaults).toEqual({
      hello: "world",
    });
  });
});
