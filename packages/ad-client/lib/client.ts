import { BrowserFingerprint } from './fingerprinting';
import { LocationService } from './location';
import type { LocationResponse } from './location-requests';

export class Client {
  locationService: LocationService;
  fingerprintService: BrowserFingerprint;
  location: LocationResponse | undefined;
  fingerprint: string | number | undefined;

  constructor() {
    this.locationService = new LocationService();
    this.fingerprintService = new BrowserFingerprint();

    requestIdleCallback(() => {
      this.init().then((data) => {
        console.log(data);
        this.location = data.location;
        this.fingerprint = data.fingerprint;
      });
    });
  }

  async init() {
    const location = await this.locationService.getLocation();
    const fingerprint = await this.fingerprintService.generateFingerprint();
    return { location, fingerprint };
  }
}
