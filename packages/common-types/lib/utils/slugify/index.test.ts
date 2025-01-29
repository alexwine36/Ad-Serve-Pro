import { slugify } from '.';

describe('Slugify', () => {
  test('should slugify a string', () => {
    expect(slugify('Hello World')).toBe('hello-world');
  });
  test('multiple spaces', () => {
    expect(slugify('Hello   World')).toBe('hello-world');
    expect(slugify('Hello -  World   ')).toBe('hello-world');
  });
});
