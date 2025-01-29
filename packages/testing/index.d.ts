declare module '@vitejs/plugin-react' {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const react: () => any;
  export = react;
}

declare module 'vitest/config' {
  interface TestConfig {
    environment: string;
    globals: boolean;
  }

  interface ResolveConfig {
    alias: Record<string, string>;
  }

  interface Config {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    plugins: any[];
    test: TestConfig;
    resolve: ResolveConfig;
  }

  export function defineConfig(config: Config): Config;
}

declare module '@repo/testing' {
  import type { Config } from 'vitest/config';

  const config: Config;
  export = config;
}
