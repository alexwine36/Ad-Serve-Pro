import { isNotNullish } from '.';

describe('isNotNullish', () => {
  test('should return true for non-nullish values', () => {
    expect(isNotNullish(1)).toBe(true);
    expect(isNotNullish('string')).toBe(true);
    expect(isNotNullish(true)).toBe(true);
    expect(isNotNullish({})).toBe(true);
    expect(isNotNullish([])).toBe(true);
  });

  test('should return false for nullish values', () => {
    expect(isNotNullish(null)).toBe(false);
    expect(isNotNullish(undefined)).toBe(false);
  });
});
