import { murmur3 } from './hash';

describe('Hash', () => {
  test('should return stable hash value', () => {
    const key = 'test';
    const hash1 = murmur3(key);
    const hash2 = murmur3(key);

    expect(hash1).toEqual(hash2);
    expect(hash1).toEqual('efbbf916');
  });
  test('should return stable val for complicated string', () => {
    const data = {
      hello: 'world',
      foo: 'bar',
      baz: 123,
      moreData: {
        a: 'b',
        c: 'd',
        e: 456,
        f: {
          g: 'h',
          i: 'j',
          k: 789,
        },
      },
    };
    const hash = murmur3(data);

    expect(hash).toEqual('70fddba8');
  });
});
