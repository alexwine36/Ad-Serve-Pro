import { CacheEntry } from './cache';
import {
  type LocationResponse,
  getFallbackLocation,
  getPrimaryLocation,
} from './location-requests';
export interface Location {
  timestamp: number;
  data: LocationResponse;
}

export class LocationService extends CacheEntry<LocationResponse> {
  //   cacheTimeout: number;
  //   cache: Map<string, Location>;
  constructor() {
    // this.cache = new Map();
    // this.cacheTimeout = 24 * 60 * 60 * 1000; // 24 hours
    super('location', () => {
      return this.getLocation();
    });
  }

  async getLocation() {
    // Check cache first
    // const cached = this.cache.get('location');
    // if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
    //   return cached.data;
    // }

    try {
      // Try primary service
      const location = await getPrimaryLocation();
      //   this.cacheLocation(location);
      return location;
    } catch (error) {
      // Fallback to backup service
      const fallbackLocation = await getFallbackLocation();
      //   this.cacheLocation(fallbackLocation);
      return fallbackLocation;
    }
  }

  //   cacheLocation(location: LocationResponse) {
  //     this.cache.set('location', {
  //       data: location,
  //       timestamp: Date.now(),
  //     });
  //   }
}
