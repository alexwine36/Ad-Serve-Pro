// import pilot from '../assets/pilot.png';
import { Statistics } from './statistics';

export const About = () => {
  return (
    <section id="about" className="container py-24 sm:py-32">
      <div className="rounded-lg border bg-muted/50 py-12">
        <div className="flex flex-col-reverse gap-8 px-6 md:flex-row md:gap-12">
          <img
            src={'https://picsum.photos/200'}
            alt=""
            className="w-[300px] rounded-lg object-contain"
          />
          <div className="flex flex-col justify-between bg-green-0">
            <div className="pb-6">
              <h2 className="font-bold text-3xl md:text-4xl">
                <span className="bg-gradient-to-b from-primary/60 to-primary bg-clip-text text-transparent">
                  About{' '}
                </span>
                Company
              </h2>
              <p className="mt-4 text-muted-foreground text-xl">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit
                amet, consectetur adipiscing elit.
              </p>
            </div>

            <Statistics />
          </div>
        </div>
      </div>
    </section>
  );
};
