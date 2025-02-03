import type { Event } from './event';
import type { LocationResponse } from './location-requests';

export class Analytics {
  events: Event[];
  fingerprint: string;
  location: LocationResponse;
  constructor(location: LocationResponse, fingerprint: string) {
    this.events = [];
    this.fingerprint = fingerprint;
    this.location = location;
  }

  track(event: Event) {
    this.events.push(event);

    // // Flush events every 10 events
    if (this.events.length >= 10) {
      this.flush();
    }

    // Flush events every 10 seconds
    setTimeout(() => {
      this.flush();
    }, 10000);
  }

  formatEvents() {
    return {
      events: this.events.map((event) => {
        return { ...event };
      }),
      fingerprint: this.fingerprint,
      location: this.location,
    };
  }

  flush() {
    if (!this.events.length) {
      return;
    }
    // Send events to the server
    navigator.sendBeacon('/api/analytics', JSON.stringify(this.formatEvents()));
    this.events = [];
  }
}
