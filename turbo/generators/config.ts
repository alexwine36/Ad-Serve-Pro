import type { PlopTypes } from '@turbo/gen';

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  plop.setGenerator('init', {
    description: 'Generate a new package for the Monorepo',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message:
          'What is the name of the package? (You can skip the `@repo/` prefix)',
      },
      {
        type: 'confirm',
        name: 'keys',
        message: 'Do you want to generate a keys file?',
      },
    ],
    actions: [
      (answers) => {
        if (
          'name' in answers &&
          typeof answers.name === 'string' &&
          answers.name.startsWith('@repo/')
        ) {
          answers.name = answers.name.replace('@repo/', '');
        }
        return 'Config sanitized';
      },
      {
        type: 'add',
        path: 'packages/{{ dashCase name }}/package.json',
        templateFile: 'templates/package.json.hbs',
      },
      {
        type: 'add',
        path: 'packages/{{ dashCase name }}/tsconfig.json',
        templateFile: 'templates/tsconfig.json.hbs',
      },
      {
        type: 'add',
        path: 'packages/{{ dashCase name }}/vitest.config.ts',
        templateFile: 'templates/vitest.config.ts.hbs',
      },
      {
        type: 'add',
        skip: (answers) => {
          if (!answers.keys) {
            return 'Skipping keys file generation';
          }
        },
        path: 'packages/{{ dashCase name }}/keys.ts',
        templateFile: 'templates/keys.ts.hbs',
      },
      {
        type: 'add',
        path: 'packages/{{ dashCase name }}/index.ts',
        template: '// This is a placeholder file for the package {{ name }}',
      },
    ],
  });
}
