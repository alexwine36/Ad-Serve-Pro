import type { ClientMetadata } from '@repo/common-types';
import { UAParser } from 'ua-parser-js';
import { CacheEntry } from './cache';

export class ClientMetadataService extends CacheEntry<ClientMetadata> {
  constructor() {
    super('client-metadata', () => {
      return this.getClientMetadata();
    });
  }
  async getClientMetadata(): Promise<ClientMetadata> {
    return new Promise((resolve, _reject) => {
      const parser = new UAParser(navigator.userAgent);
      const browser = parser.getBrowser();
      const device = parser.getDevice();
      const cpu = parser.getCPU();
      const os = parser.getOS();
      resolve({
        version: '1',
        browser,
        device,
        cpu,
        os,
      });
    });
  }
}
