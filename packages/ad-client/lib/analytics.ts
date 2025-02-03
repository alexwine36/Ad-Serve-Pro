import { type EventConstructor, Event as TrackingEvent } from './event';
import { BrowserFingerprint } from './fingerprinting';
import { LocationService } from './location';
import type { LocationResponse } from './location-requests';

// Configuration types
export interface AnalyticsConfig {
  organizationId: string;
  endpoint?: string;
  debug?: boolean;
  cacheTimeout?: number;
}

export class Analytics {
  config: Required<AnalyticsConfig>;
  private fingerprinter: BrowserFingerprint;
  private eventQueue: TrackingEvent[] = [];
  private locationService: LocationService;

  private worker?: Worker;

  private static DEFAULT_CONFIG: Required<AnalyticsConfig> = {
    organizationId: '',
    endpoint: '/api/analytics',
    debug: false,
    cacheTimeout: 24 * 60 * 60 * 1000, // 24 hours
  };

  constructor(config: AnalyticsConfig) {
    this.config = { ...Analytics.DEFAULT_CONFIG, ...config };
    this.fingerprinter = new BrowserFingerprint();
    this.initializeWorker();
    this.detectAndPopulateAds();
    this.setupEventListeners();
    this.locationService = new LocationService();
  }

  // Initialize web worker for non-blocking computations
  private initializeWorker() {
    if (typeof Worker !== 'undefined') {
      this.worker = new Worker(this.createWorkerBlob());
      this.worker.onmessage = this.handleWorkerMessage.bind(this);
    }
  }

  // Create a worker blob for async processing
  private createWorkerBlob(): string {
    const workerCode = `
      onmessage = async function(e) {
        const { type, data } = e.data;
        
        switch(type) {
          case 'process-events':
            // Simulate some processing
            const processedEvents = data.map(event => ({
              ...event,
              processed: true
            }));
            postMessage({ type: 'processed-events', data: processedEvents });
            break;
        }
      }
    `;

    return URL.createObjectURL(
      new Blob([workerCode], { type: 'application/javascript' })
    );
  }

  // Handle messages from web worker
  private handleWorkerMessage(event: MessageEvent) {
    const { type, data } = event.data;

    if (type === 'processed-events') {
      this.sendEventsToServer(data);
    }
  }

  // Detect and populate ad tags on the page
  private detectAndPopulateAds() {
    // Use requestIdleCallback for non-blocking ad detection
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        const adTags = document.querySelectorAll('[data-ad-id]');

        adTags.forEach((tag) => {
          const adId = tag.getAttribute('data-ad-id');
          if (adId) {
            this.instrumentAdTag(tag as HTMLElement, adId);
          }
        });
      });
    } else {
      // Fallback for browsers without requestIdleCallback
      const adTags = document.querySelectorAll('[data-ad-id]');
      adTags.forEach((tag) => {
        const adId = tag.getAttribute('data-ad-id');
        if (adId) {
          this.instrumentAdTag(tag as HTMLElement, adId);
        }
      });
    }
  }

  // Instrument individual ad tags
  private instrumentAdTag(tag: HTMLElement, adId: string) {
    // Create intersection observer for impression tracking
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.track({
              type: 'IMPRESSION',
              adId: adId,
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    ); // 50% visibility

    // Track clicks
    tag.addEventListener('click', () => {
      this.track({
        type: 'CLICK',
        adId: adId,
      });
    });

    observer.observe(tag);
  }

  // Set up global event listeners
  private setupEventListeners() {
    // Flush events on page unload
    window.addEventListener('beforeunload', () => {
      this.flush();
    });

    // Flush every 10 seconds
    setInterval(() => {
      this.debug('Flushing events');
      this.flush();
    }, 10000);
  }

  // Cached location retrieval
  private async getLocation(): Promise<LocationResponse | null> {
    return await this.locationService.get();
  }
  private async getFingerprint(): Promise<string> {
    return (await this.fingerprinter.getFingerprint()) as string;
  }
  private async getComponents() {
    return await this.fingerprinter.getComponents();
  }

  // Track an event
  track(event: Omit<EventConstructor, 'metadata'>) {
    const fullEvent = new TrackingEvent({
      ...event,
      metadata: {
        userAgent: navigator.userAgent,
        language: navigator.language,
      },
    });

    this.eventQueue.push(fullEvent);

    // Flush if queue reaches a certain size
    if (this.eventQueue.length >= 10) {
      this.flush();
    }
  }

  // Format events for sending
  private async formatEvents(events: TrackingEvent[]) {
    const res = {
      events: events.map((event) => {
        return { ...event };
      }),
      fingerprint: await this.getFingerprint(),
      location: await this.getLocation(),
    };
    this.debug('Events formatted', res);
    return res;
  }

  async sendMetrics<T extends Blob>(url: string, data: T) {
    if (navigator.sendBeacon) {
      // Use sendBeacon for reliable delivery
      navigator.sendBeacon(url, data);
    } else {
      await fetch(url, {
        method: 'POST',
        body: data,
        keepalive: true,
      });
    }
  }

  // Send events to server
  private async sendEventsToServer(events: TrackingEvent[]) {
    if (events.length === 0) return;

    // Use sendBeacon for reliable delivery
    const blob = new Blob([JSON.stringify(this.formatEvents(events))], {
      type: 'application/json',
    });

    await this.sendMetrics(this.config.endpoint, blob);
    this.debug('Events sent', events);
  }

  // Flush events, using web worker if available
  flush() {
    if (this.eventQueue.length === 0) return;

    if (this.worker) {
      // Use web worker for processing
      this.worker.postMessage({
        type: 'process-events',
        data: this.eventQueue,
      });
    } else {
      // Fallback to direct sending
      this.sendEventsToServer(this.eventQueue);
    }

    // Clear the queue
    this.eventQueue = [];
  }

  setDebug(debug: boolean) {
    this.config.debug = debug;
  }

  // Debug logging
  private debug(...args: unknown[]) {
    if (this.config.debug) {
      console.log('[AdAnalytics]', ...args);
    }
  }
}

export type FormattedEvents = Awaited<ReturnType<Analytics['formatEvents']>>;
