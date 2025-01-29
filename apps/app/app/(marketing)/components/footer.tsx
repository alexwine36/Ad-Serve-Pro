import { LogoIcon } from '../../../src/components/logo-icon';
import { COMPANY_NAME } from '../../../utils/constants';
import { MarketingLinks } from '../../../utils/constants/marketing-links';

export const Footer = () => {
  return (
    <footer id="footer">
      <hr className="mx-auto w-11/12" />

      <section className="container flex justify-between gap-x-12 gap-y-8 py-20">
        <div className="col-span-full w-full xl:col-span-2">
          <a
            rel="noreferrer noopener"
            href="/"
            className="flex font-bold text-xl"
          >
            <LogoIcon />
            {COMPANY_NAME}
          </a>
        </div>
        <div className="flex w-full flex-wrap justify-between">
          {MarketingLinks.footerLinks.map(({ label, items }) => {
            return (
              <div key={label} className="flex flex-col gap-2">
                <h3 className="font-bold text-lg">{label}</h3>
                {items.map(({ href, label }) => {
                  return (
                    <div key={label}>
                      <a
                        rel="noreferrer noopener"
                        href={href}
                        className="opacity-60 hover:opacity-100"
                      >
                        {label}
                      </a>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </section>

      <section className="container pb-14 text-center">
        <h3>
          &copy; {new Date().getFullYear()} {COMPANY_NAME} - All rights reserved
        </h3>
      </section>
    </footer>
  );
};
