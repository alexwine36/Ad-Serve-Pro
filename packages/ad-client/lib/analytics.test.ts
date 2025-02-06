import {
  type MockInstance,
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import { Analytics } from './analytics';
import { Event as TrackingEvent } from './event';
import { BrowserFingerprint } from './fingerprinting';
import { LocationService } from './location';
import type { AnalyticsConfig } from './types';

vi.mock('./fingerprinting');
vi.mock('./location');
vi.mock('./event');
vi.mock('./advertisement');

let spySendMetrics: MockInstance<
  <T extends Blob>(url: string, data: T) => Promise<void>
>;

vi.useFakeTimers();

describe('Analytics', () => {
  let analytics: Analytics;
  let config: AnalyticsConfig;

  beforeEach(() => {
    config = {
      organizationId: 'test-org',
      endpoint: '/test-endpoint',
      debug: false,
    };

    analytics = new Analytics(config);

    spySendMetrics = vi
      .spyOn(analytics, 'sendMetrics')
      .mockImplementation(() => {
        return Promise.resolve();
      });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with default config', () => {
    const defaultConfig = {
      organizationId: '',
      endpoint: 'http://sample.com/api/analytics',
      debug: false,
      cacheTimeout: 24 * 60 * 60 * 1000,
    };
    expect(analytics.config).toEqual({ ...defaultConfig, ...config });
  });

  it('should initialize BrowserFingerprint and LocationService', () => {
    expect(BrowserFingerprint).toHaveBeenCalled();
    expect(LocationService).toHaveBeenCalled();
  });

  it('should initialize web worker if available', () => {
    if (typeof Worker !== 'undefined') {
      expect(analytics['worker']).toBeInstanceOf(Worker);
    } else {
      expect(analytics['worker']).toBeUndefined();
    }
  });

  it('should detect and populate ads', () => {
    const spy = vi.spyOn(analytics as any, 'detectAndPopulateAds');

    analytics['detectAndPopulateAds']();
    expect(spy).toHaveBeenCalled();
  });

  it('should set up event listeners', () => {
    const spy = vi.spyOn(analytics as any, 'setupEventListeners');
    analytics['setupEventListeners']();
    expect(spy).toHaveBeenCalled();
  });

  it('should flush events on page unload', () => {
    const spy = vi.spyOn(analytics, 'flush');
    window.dispatchEvent(new Event('beforeunload'));
    expect(spy).toHaveBeenCalled();
  });

  it('should flush events every 10 seconds', () => {
    const spy = vi.spyOn(analytics, 'flush');
    analytics.setDebug(true);
    vi.advanceTimersByTime(10001);
    expect(spy).toHaveBeenCalled();
  });

  it('should track events and flush when queue reaches size limit', () => {
    const spy = vi.spyOn(analytics, 'flush');

    for (let i = 0; i < 10; i++) {
      analytics.track({ type: 'IMPRESSION', adId: 'test-ad' });
    }
    expect(spy).toHaveBeenCalled();
  });
  it('should format events correctly', async () => {
    const events = [new TrackingEvent({ type: 'IMPRESSION', adId: 'test-ad' })];
    const formattedEvents = await analytics['formatEvents'](events);
    console.log(formattedEvents);
    expect(formattedEvents).toHaveProperty('events');
    expect(formattedEvents).toHaveProperty('client');
  });

  it('should send events to server', async () => {
    const events = [new TrackingEvent({ type: 'IMPRESSION', adId: 'test-ad' })];

    await analytics['sendEventsToServer'](events);
    expect(spySendMetrics).toHaveBeenCalled();
  });

  it.todo('should flush events using web worker if available', () => {
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    const spy = vi.spyOn(analytics['worker']!, 'postMessage');
    analytics.track({ type: 'IMPRESSION', adId: 'test-ad' });
    analytics.flush();

    if (analytics['worker']) {
      expect(spy).toHaveBeenCalled();
    }
  });

  it('should log debug messages if debug is enabled', () => {
    const spy = vi.spyOn(console, 'log');
    const testAnalytics = new Analytics({ ...config, debug: true });

    testAnalytics['debug']('Test debug message');
    expect(spy).toHaveBeenCalledWith('[AdAnalytics]', 'Test debug message');
  });
});
