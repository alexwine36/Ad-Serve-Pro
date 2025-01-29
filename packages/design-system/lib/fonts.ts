import { cn } from '@repo/design-system/lib/utils';
import { Inter, Roboto_Mono } from 'next/font/google';


const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
})


export const fonts = cn(
  inter.variable,
  roboto_mono.variable,
  'touch-manipulation font-sans antialiased'
);
