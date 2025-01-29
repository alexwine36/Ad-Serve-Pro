import { type Options, defineConfig } from 'tsup';

export default defineConfig((options: Options) => ({
  dts: true,
  format: ['cjs', 'esm'],
  //   entryPoints: {
  //     index: 'index.ts',
  //   },
  entryPoints: ['./src/**/*'],
  // banner: {
  //   js: "'use server'",
  // },
  ...options,
}));
