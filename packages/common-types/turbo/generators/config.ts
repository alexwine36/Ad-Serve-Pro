import type { PlopTypes } from '@turbo/gen';
import { capitalize, pipe, toCamelCase, toKebabCase } from 'remeda';
type TurboAnswers = {
  turbo: {
    paths: {
      cwd: string;
      root: string;
      workspace: string;
    };
  };
};

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  plop.setGenerator('create-type', {
    description: 'Generate a new Common Type',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of the route?',
      },
    ],
    actions: (rawData) => {
      const modData = rawData as TurboAnswers & {
        name: string;
      };
      const targetPath = `${modData?.turbo.paths.workspace}/lib`;
      const templatePath = `${modData?.turbo.paths.workspace}/turbo/generators/templates`;
      const filePath = pipe(modData.name, toKebabCase());
      const propertyName = pipe(modData.name, toCamelCase());
      const className = pipe(modData.name, toCamelCase(), capitalize());
      const data = {
        ...modData,
        propertyName,
        filePath,
        className,
      };
      const actions: PlopTypes.ActionType[] = [];

      // Common Types
      actions.push({
        type: 'add',
        templateFile: `${templatePath}/schema.ts.hbs`,
        path: `${targetPath}/${filePath}.ts`,
      });

      actions.push({
        type: 'append',
        template: `export * from './{{filePath}}';`,
        pattern: ';',
        path: `${targetPath}/index.ts`,
      });

      // Formatters
      actions.push({
        type: 'add',
        templateFile: `${templatePath}/formatter.ts.hbs`,
        path: `${targetPath}/formatters/${filePath}/index.ts`,
      });
      actions.push({
        type: 'append',
        template: `export * from './{{filePath}}';`,
        pattern: ';',
        path: `${targetPath}/formatters/index.ts`,
      });

      return actions.map((action) => {
        return {
          // biome-ignore lint/suspicious/noExplicitAny: type issue with plop
          ...(action as any),
          data,
        };
      });
    },
  });
}
