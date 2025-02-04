import fs from 'node:fs/promises';
import path from 'node:path';
import { type Options, defineConfig } from 'tsup';

const source = path.join(__dirname, 'dist', 'index.js');
const target = path.join(
  __dirname,
  '..',
  '..',
  'apps',
  'app',
  'public',
  'analytics',
  'client.js'
);

export default defineConfig((options: Options) => ({
  dts: true,
  format: ['cjs', 'esm', 'iife'],
  entryPoints: {
    index: 'index.ts',
  },
  minify: true,
  env: {
    VERCEL_URL: process.env.VERCEL_URL || 'localhost:3000',
  },
  //   entryPoints: ['./src/**/*'],
  // banner: {
  //   js: "'use server'",
  // },
  async onSuccess() {
    const content = await fs.readFile(source, 'utf-8');
    // console.log('content', content);
    fs.writeFile(target, content, {
      encoding: 'utf-8',
      flag: 'w',
    });
    return;
  },
  ...options,
}));
