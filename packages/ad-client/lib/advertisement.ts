import type { AdServerGetAdsResponse, AdServerGetAdsSchema } from '@repo/trpc';
import { z } from 'zod';
import type { AdvertisementConfig } from './types';

export const AdvertisementProps = z.object({
  adId: z.string(),
  adPlacement: z.string(),
  adSize: z.string(),
});

async function retryUntilDefined<T>(
  fn: () => Promise<T | undefined>,
  maxRetries = 3,
  delay = 1000
): Promise<T> {
  for (let i = 0; i < maxRetries; i++) {
    const result = await fn();
    if (result !== undefined) {
      return result;
    }

    await new Promise((resolve) => setTimeout(resolve, delay));
  }

  throw new Error('Max retries exceeded');
}

export type AdvertisementProps = z.infer<typeof AdvertisementProps>;

class Advertisment {
  element: HTMLModElement;
  constructor(
    element: HTMLModElement,
    getAd: () => Promise<AdServerGetAdsResponse[0] | undefined>,
    cb: () => void
  ) {
    this.element = element;
    // const attrs = this.getAttributes();
    if (!this.getAttributes().adId) {
      getAd().then((ad) => {
        console.log('Ad', ad);
        if (ad && !this.getAttributes().adId) {
          this.element.setAttribute('data-ad-id', ad.id);
          const size = ad.dimensions;
          const childAd = document.createElement('div');
          childAd.style.width = `${size.width}px`;
          childAd.style.height = `${size.height}px`;
          //   //   childAd.style.backgroundColor = 'lightgray';
          //   const linkEl = document.createElement('a');
          //   linkEl.setAttribute('href', 'https://example.com');
          //   linkEl.setAttribute('target', '_blank');
          const imgEl = document.createElement('img');
          imgEl.setAttribute('src', ad.content);
          //   linkEl.appendChild(imgEl);
          childAd.appendChild(imgEl);
          element.appendChild(childAd);
          cb();
        }
      });
    }
    // element.setAttribute('data-ad-id', `ad-${idx}`);
    // if (element.childElementCount === 0) {
    //   const size = {
    //     width: 480,
    //     height: 100,
    //   };
    //   const childAd = document.createElement('div');
    //   childAd.style.width = `${size.width}px`;
    //   childAd.style.height = `${size.height}px`;
    //   //   childAd.style.backgroundColor = 'lightgray';
    //   const linkEl = document.createElement('a');
    //   linkEl.setAttribute('href', 'https://example.com');
    //   linkEl.setAttribute('target', '_blank');
    //   const imgEl = document.createElement('img');
    //   imgEl.setAttribute(
    //     'src',
    //     `https://loremflickr.com/${size.width}/${size.height}?lock=${idx}`
    //   );
    //   linkEl.appendChild(imgEl);
    //   childAd.appendChild(linkEl);
    //   element.appendChild(childAd);
    // }

    // this.element = element;
    // console.log('Data', this.getAttributes());
  }

  getAttributes() {
    return AdvertisementProps.partial().parse(this.element.dataset);
  }
}

export class AdvertisementService {
  advertisments: Advertisment[] = [];
  config: Required<AdvertisementConfig>;
  ads: AdServerGetAdsResponse = [];
  cb: () => void;

  constructor(
    { path = '/api/advertisement', ...rest }: AdvertisementConfig,
    cb: () => void
  ) {
    this.config = {
      ...rest,
      path,
    };
    requestIdleCallback(() => {
      this.getAds().then((ads) => {
        this.ads = ads;
      });
    });
    console.log('AdvertisementConfigurer wassup', this.config);
    this.cb = cb;
  }

  async getPromisedAd() {
    return retryUntilDefined(async () => this.getAd());
  }

  getAd() {
    return this.ads.shift();
  }

  async getAds(): Promise<AdServerGetAdsResponse> {
    const bodyObj: AdServerGetAdsSchema = {
      organizationId: this.config.organizationId,
    };
    const res = await fetch(this.config.path, {
      method: 'POST',
      body: JSON.stringify(bodyObj),
    });
    const data = await res.json();
    return data;
  }
  init() {
    this.configureIns();
  }

  configureIns() {
    const ads = document.querySelectorAll('ins');
    console.log('configure Ads', ads);
    ads.forEach((ad, idx) => {
      this.advertisments.push(
        new Advertisment(ad, this.getPromisedAd.bind(this), this.cb)
      );

      // if (adId) {
      //   this.instrumentAdTag(ad as HTMLElement, adId)
      // }
    });
    // this.detectAndPopulateAds();
  }
}
