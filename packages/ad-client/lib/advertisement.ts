import { z } from 'zod';
import type { AdvertisementConfig } from './types';

export const AdvertisementProps = z.object({
  adId: z.string(),
  adPlacement: z.string(),
  adSize: z.string(),
});

export type AdvertisementProps = z.infer<typeof AdvertisementProps>;

class Advertisment {
  element: HTMLModElement;
  constructor(element: HTMLModElement, idx: number) {
    element.setAttribute('data-ad-id', `ad-${idx}`);
    if (element.childElementCount === 0) {
      const size = {
        width: 480,
        height: 100,
      };
      const childAd = document.createElement('div');
      childAd.style.width = `${size.width}px`;
      childAd.style.height = `${size.height}px`;
      //   childAd.style.backgroundColor = 'lightgray';
      const linkEl = document.createElement('a');
      linkEl.setAttribute('href', 'https://example.com');
      linkEl.setAttribute('target', '_blank');
      const imgEl = document.createElement('img');
      imgEl.setAttribute(
        'src',
        `https://loremflickr.com/${size.width}/${size.height}?lock=${idx}`
      );
      linkEl.appendChild(imgEl);
      childAd.appendChild(linkEl);
      element.appendChild(childAd);
    }

    this.element = element;
    console.log('Data', this.getAttributes());
  }

  getAttributes() {
    return AdvertisementProps.partial().parse(this.element.dataset);
  }
}

export class AdvertisementService {
  advertisments: Advertisment[] = [];
  config: AdvertisementConfig;
  constructor({ path = '/api/advertisement', ...rest }: AdvertisementConfig) {
    this.config = {
      ...rest,
      path,
    };
    console.log('AdvertisementConfigurer wassup', this.config);
  }

  init() {
    this.configureIns();
  }

  configureIns() {
    const ads = document.querySelectorAll('ins');
    console.log('configure Ads', ads);
    ads.forEach((ad, idx) => {
      this.advertisments.push(new Advertisment(ad, idx));

      // if (adId) {
      //   this.instrumentAdTag(ad as HTMLElement, adId)
      // }
    });
    // this.detectAndPopulateAds();
  }
}
