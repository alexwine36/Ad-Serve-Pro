import type { AnalyticsType } from '@repo/common-types';

export type EventConstructor = {
  type: AnalyticsType | 'PAGE_VIEW';
  adId: string;
  metadata?: Record<string, unknown>;
};

export class Event {
  type: EventConstructor['type'];
  referrer: string;
  pageUrl: string;
  viewportSize: { width: number; height: number };
  screenSize: { width: number; height: number };
  timestamp: number;
  adId: string;
  metadata: Record<string, unknown> | undefined;

  constructor({ type, adId, metadata }: EventConstructor) {
    this.type = type;
    this.adId = adId;
    this.metadata = metadata;
    this.referrer = document.referrer;
    this.pageUrl = location.href;
    this.viewportSize = this.getViewportSize();
    this.screenSize = this.getScreenSize();
    this.timestamp = Date.now();
  }

  private getScreenSize() {
    return {
      width: screen.width,
      height: screen.height,
    };
  }
  private getViewportSize() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }
}
