import { type Options, defineConfig } from 'tsup';

export default defineConfig((options: Options) => ({
  dts: true,
  format: ['cjs', 'esm'],
  entryPoints: {
    index: 'index.ts',
  },
  minify: true,
  //   entryPoints: ['./src/**/*'],
  // banner: {
  //   js: "'use server'",
  // },
  ...options,
}));
