import path from 'node:path';
import type { PlopTypes } from '@turbo/gen';
// @ts-ignore
import directoryPrompt from 'inquirer-directory';
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

// console.log('DIRNAME', __dirname);
const routerPath = path.resolve(__dirname, '../../src/server/routers');
// console.log(routerPath);

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  plop.setPrompt('directory', directoryPrompt as any);
  plop.setGenerator('add route', {
    description: 'Generate a new route',
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
      console.log(modData);
      console.log(modData.turbo.paths);
      const basePath = `${modData?.turbo.paths.workspace}/src/server/routers`;
      const targetPath = `${basePath}`;
      const templateBasePath = `${
        modData?.turbo.paths.workspace
      }/turbo/generators/templates/add-route`;

      const routeName = toCamelCase(modData.name);
      const routerName = `${routeName}Router`;
      const routerFile = toKebabCase(modData.name);
      const routerDir = `${targetPath}/${routerFile}`;
      const routerPath = `${routerDir}/_router.ts`;

      const data = {
        ...modData,
        routerName,
        routeName,
        routerFile,
        routerPath,
      };

      const actions: PlopTypes.Actions = [];

      actions.push({
        type: 'add',
        path: routerPath,
        templateFile: `${templateBasePath}/router.ts.hbs`,
        data,
      });
      actions.push({
        type: 'add',
        path: `${routerDir}/handlers.ts`,
        templateFile: `${templateBasePath}/handlers.ts.hbs`,
        data,
      });

      actions.push({
        type: 'append',
        path: `${targetPath}/_app.ts`,
        pattern: 'Handlers\n',
        data,
        template: '{{routeName}}: {{routerName}},\n',
        // template: `import {{ routerName }} from './{{ routerFile }}/_router';\n`,
      });

      actions.push({
        type: 'append',
        path: `${targetPath}/_app.ts`,
        pattern: 'Handlers\n',
        data,
        template: '{{routeName}}: {{routerName}},\n',
        // template: `import {{ routerName }} from './{{ routerFile }}/_router';\n`,
      });

      actions.push({
        type: 'append',
        path: `${targetPath}/handlers.ts`,
        pattern: 'Exports\n',
        data,
        // template: '{{routeName}}: {{routerName}},\n',
        template: `export * from './{{ routerFile }}/handlers';\n`,
      });

      actions.push({
        type: 'append',
        path: `${targetPath}/_app.ts`,
        pattern: 'Imports\n',
        data,
        // template: '{{routeName}}: {{routerName}},\n',
        template: `import { {{ routerName }} } from './{{ routerFile }}/_router';\n`,
      });

      return actions;
    },
  });

  plop.setGenerator('add handler', {
    description: 'Generate a new handler',
    prompts: [
      {
        type: 'directory',
        name: 'router',
        message: 'Select a router',
        basePath: routerPath,
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      } as any,
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of the route?',
      },
    ],
    actions: (rawData) => {
      const modData = {
        ...rawData,
        name: `${rawData?.router} ${rawData?.name}`,
      } as TurboAnswers & {
        router: string;
        name: string;
      };
      console.log(modData);
      console.log(modData.turbo.paths);
      const basePath = `${modData?.turbo.paths.workspace}/src/server/routers`;
      const targetPath = `${basePath}/${modData.router}`;
      const templateBasePath = `${
        modData?.turbo.paths.workspace
      }/turbo/generators/templates/add-handler`;

      // const routeName = toCamelCase(modData.name);
      // const routerName = `${routeName}Router`;
      const baseHandlerFile = toKebabCase(modData.name);
      const baseHandlerPath = `${targetPath}/${baseHandlerFile}`;

      const schemaName = `${pipe(modData.name, toCamelCase(), capitalize())}Schema`;
      const handlerKey = `${toCamelCase(modData.name)}`;
      const routerKey = `${toCamelCase(modData.name.replace(modData.router, ''))}`;
      const handlerName = `${handlerKey}Handler`;
      const handlerOptions = `${pipe(modData.name, toCamelCase(), capitalize())}Options`;
      const handlerResponse = `${pipe(modData.name, toCamelCase(), capitalize())}Response`;

      // TODO: use this to make sure that paths are correctly implemnted

      // const importPath = routerPath
      //   .replace(modData?.turbo.paths.workspace, '@')
      //   .replace('.ts', '');

      const data = {
        ...modData,
        // importPath,
        // routerName,
        // routeName,
        // routerFile,
        // routerPath,
        baseHandlerFile,
        baseHandlerPath,
        schemaName,
        handlerName,
        handlerResponse,
        handlerOptions,
        handlerKey,
        routerKey,
      };

      const actions: PlopTypes.Actions = [];

      console.log(data);
      // Handler
      actions.push({
        type: 'add',
        path: `${baseHandlerPath}-handler.ts`,
        templateFile: `${templateBasePath}/handler.ts.hbs`,
        data,
      });

      actions.push({
        type: 'add',
        path: `${baseHandlerPath}-schema.ts`,
        templateFile: `${templateBasePath}/schema.ts.hbs`,
        data,
      });

      actions.push({
        type: 'append',
        path: `${targetPath}/_router.ts`,
        pattern: 'Handlers\n',
        data,
        template:
          '{{routerKey}}: authedProcedure.input({{ schemaName }}).query({{handlerName}}),\n',
        // template: `import {{ routerName }} from './{{ routerFile }}/_router';\n`,
      });

      actions.push({
        type: 'append',
        path: `${targetPath}/handlers.ts`,
        pattern: 'Exports\n',
        data,
        // template: '{{routeName}}: {{routerName}},\n',
        template: [
          `export * from './{{ baseHandlerFile }}-schema'`,
          `export * from './{{ baseHandlerFile }}-handler'`,
        ].join('\n'),
      });

      actions.push({
        type: 'append',
        path: `${targetPath}/_router.ts`,
        pattern: 'Imports\n',
        data,
        // template: '{{routeName}}: {{routerName}},\n',
        template: [
          `import { {{ schemaName }} } from './{{ baseHandlerFile }}-schema'`,
          `import { {{ handlerName }} } from './{{ baseHandlerFile }}-handler'`,
        ].join('\n'),
      });

      // return [];
      return actions;
    },
  });
}
