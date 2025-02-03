export interface IPApiResponse {
  ip: string;
  network: string;
  version: string;
  city: string;
  region: string;
  region_code: string;
  country: string;
  country_name: string;
  country_code: string;
  country_code_iso3: string;
  country_capital: string;
  country_tld: string;
  continent_code: string;
  in_eu: boolean;
  postal: string;
  latitude: number;
  longitude: number;
  timezone: string;
  utc_offset: string;
  country_calling_code: string;
  currency: string;
  currency_name: string;
  languages: string;
  country_area: number;
  country_population: number;
  asn: string;
  org: string;
}
export const getPrimaryLocation = async () => {
  // Use your preferred service
  const response = await fetch('https://ipapi.co/json/');
  const data: IPApiResponse = await response.json();

  return {
    ...data,
    country: data.country,
    region: data.region,
    city: data.city,
    latitude: data.latitude,
    longitude: data.longitude,
  };
};

export interface IPWhoIsReponse {
  ip: string;
  success: boolean;
  type: string;
  continent: string;
  continent_code: string;
  country: string;
  country_code: string;
  country_flag: string;
  country_capital: string;
  country_phone: string;
  country_neighbours: string;
  region: string;
  city: string;
  latitude: number;
  longitude: number;
  asn: string;
  org: string;
  isp: string;
  timezone: string;
  timezone_name: string;
  timezone_dstOffset: number;
  timezone_gmtOffset: number;
  timezone_gmt: string;
  currency: string;
  currency_code: string;
  currency_symbol: string;
  currency_rates: number;
  currency_plural: string;
}

export const getFallbackLocation = async () => {
  // Backup service
  const response = await fetch('https://ipwhois.app/json/');
  const data: IPWhoIsReponse = await response.json();

  return {
    ...data,
    country: data.country,
    region: data.region,
    city: data.city,
    latitude: data.latitude,
    longitude: data.longitude,
  };
};

type LocationResults = IPApiResponse | IPWhoIsReponse;

export type LocationResponse = LocationResults & {
  country: string;
  region: string;
  city: string;
  latitude: number;
  longitude: number;
};
