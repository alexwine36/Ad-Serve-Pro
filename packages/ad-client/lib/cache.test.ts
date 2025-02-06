import { afterEach, beforeEach, vi } from 'vitest';
import { CacheEntry } from './cache';

describe('CacheEntry', () => {
  const key = 'testKey';
  const data = { value: 'testData' };
  const getData = vi.fn().mockResolvedValue(data);
  let cacheEntry: CacheEntry<typeof data>;

  beforeEach(() => {
    localStorage.clear();
    cacheEntry = new CacheEntry(key, getData);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('should return cached data if available and not expired', async () => {
    const timestamp = Date.now();
    localStorage.setItem(key, JSON.stringify({ data, timestamp }));

    const result = await cacheEntry.get();
    expect(result).toEqual(data);
    expect(getData).not.toHaveBeenCalled();
  });

  test('should fetch new data if cache is expired', async () => {
    const timestamp = Date.now() - cacheEntry.cacheTimeout - 1;
    localStorage.setItem(key, JSON.stringify({ data, timestamp }));

    const result = await cacheEntry.get();
    expect(result).toEqual(data);
    expect(getData).toHaveBeenCalled();
  });

  test('should fetch new data if cache is empty', async () => {
    const result = await cacheEntry.get();
    expect(result).toEqual(data);
    expect(getData).toHaveBeenCalled();
  });

  test('should cache new data after fetching', async () => {
    await cacheEntry.get();
    const cached = JSON.parse(localStorage.getItem(key) || '{}');
    expect(cached.data).toEqual(data);
    expect(cached.timestamp).toBeDefined();
  });

  test('should respect custom cache timeout', async () => {
    const customTimeout = 1000;
    cacheEntry = new CacheEntry(key, getData, customTimeout);
    const timestamp = Date.now() - customTimeout - 1;
    localStorage.setItem(key, JSON.stringify({ data, timestamp }));

    const result = await cacheEntry.get();
    expect(result).toEqual(data);
    expect(getData).toHaveBeenCalled();
  });
});
