import { type Options, defineConfig } from 'tsup';

export default defineConfig((options: Options) => ({
  dts: true,
  format: ['cjs'],
  entryPoints: ['index.ts'],

  minify: true,
  //   entryPoints: ['./src/**/*'],
  // banner: {
  //   js: "'use server'",
  // },
  //   async onSuccess() {
  //     const content = await fs.readFile(source, 'utf-8');
  //     // console.log('content', content);
  //     fs.writeFile(target, content, {
  //       encoding: 'utf-8',
  //       flag: 'w',
  //     });
  //     return;
  //   },
  ...options,
}));
