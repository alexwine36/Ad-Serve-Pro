// Configuration types
export interface AnalyticsConfig {
  organizationId: string;
  endpoint?: string;
  debug?: boolean;
  cacheTimeout?: number;
}

export interface AdvertisementConfig
  extends Required<Pick<AnalyticsConfig, 'organizationId' | 'endpoint'>> {
  path?: string;
}
