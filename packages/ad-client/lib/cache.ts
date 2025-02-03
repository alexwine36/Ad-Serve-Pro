export class CacheEntry<T> {
  data?: T;
  timestamp?: number;
  cacheTimeout: number = 24 * 60 * 60 * 1000;
  key: string;
  getData: () => Promise<T>;

  constructor(key: string, getData: () => Promise<T>, cacheTimeout?: number) {
    this.key = key;
    this.getData = getData;
    if (cacheTimeout) {
      this.cacheTimeout = cacheTimeout;
    }
  }

  private getFromCache(): T | undefined {
    const cached = localStorage.getItem(this.key);
    if (!cached) {
      return;
    }

    const parsed = JSON.parse(cached);
    if (Date.now() - parsed.timestamp < this.cacheTimeout) {
      return parsed.data;
    }
  }

  private cache(data: T) {
    localStorage.setItem(
      this.key,
      JSON.stringify({
        data,
        timestamp: Date.now(),
      })
    );
  }

  async get(): Promise<T> {
    const cached = this.getFromCache();
    if (cached) {
      return cached;
    }

    const data = await this.getData();
    this.cache(data);
    return data;
  }
}
