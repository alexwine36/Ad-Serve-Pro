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

type AddHandlerTypes = TurboAnswers & {
  router: string;
  name: string;
  type: 'query' | 'mutation';
};

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  plop.setPrompt('directory', directoryPrompt as any);
  plop.setGenerator('add-route', {
    description: 'Generate a new route',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of the route?',
      },
      {
        type: 'checkbox',
        name: 'methods',
        message: 'Select methods',
        choices: [
          { name: 'Get All', value: 'get all' },
          { name: 'Get One', value: 'get one' },
          { name: 'Create', value: 'create' },
          { name: 'Update', value: 'update' },
          { name: 'Delete', value: 'delete' },
        ],
      },
    ],
    actions: (rawData) => {
      const modData = rawData as TurboAnswers & {
        name: string;
        methods: ('get all' | 'get one' | 'create' | 'update' | 'delete')[];
      };
      console.log(modData);
      console.log(modData.turbo.paths);
      const basePath = `${modData?.turbo.paths.workspace}/src/server/routers`;
      const targetPath = `${basePath}`;
      const templateBasePath = `${modData?.turbo.paths.workspace}/turbo/generators/templates/add-route`;

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
        template: `export * from './{{ routerFile }}/handlers';`,
      });

      actions.push({
        type: 'append',
        path: `${targetPath}/_app.ts`,
        pattern: ';',
        data,
        // template: '{{routeName}}: {{routerName}},\n',
        template: `import { {{ routerName }} } from './{{ routerFile }}/_router';\n`,
      });
      const handlers = data.methods.flatMap((method) => {
        let type: AddHandlerTypes['type'] = 'mutation';
        if (method === 'get all' || method === 'get one') {
          type = 'query';
        }
        return addHandlerActions({
          ...data,
          name: method,
          type,
          router: routerFile,
        });
      });
      // console.log(handlers);

      // addHandlerActions({
      //   ...modData,

      // })

      return [...actions, ...handlers];
    },
  });

  const addHandlerActions = (rawData: AddHandlerTypes) => {
    console.log(rawData);
    const modData = {
      ...rawData,
      name: `${rawData?.router} ${rawData?.name}`,
    } as AddHandlerTypes;
    console.log(modData);
    console.log(modData.turbo.paths);
    const basePath = `${modData?.turbo.paths.workspace}/src/server/routers`;
    const targetPath = `${basePath}/${modData.router}`;
    const templateBasePath = `${modData?.turbo.paths.workspace}/turbo/generators/templates/add-handler`;

    // const routeName = toCamelCase(modData.name);
    // const routerName = `${routeName}Router`;
    const baseHandlerFile = toKebabCase(modData.name);
    const baseHandlerPath = `${targetPath}/${baseHandlerFile}`;

    const schemaName = `${pipe(
      modData.name,
      toCamelCase(),
      capitalize()
    )}Schema`;
    const handlerKey = `${toCamelCase(modData.name)}`;
    const routerKey = `${toCamelCase(
      modData.name.replace(modData.router, '')
    )}`;
    const prismaTable = `${toCamelCase(modData.router)}`;
    const handlerName = `${handlerKey}Handler`;
    const handlerOptions = `${pipe(
      modData.name,
      toCamelCase(),
      capitalize()
    )}Options`;
    const handlerResponse = `${pipe(
      modData.name,
      toCamelCase(),
      capitalize()
    )}Response`;

    // TODO: use this to make sure that paths are correctly implemnted

    // const importPath = routerPath
    //   .replace(modData?.turbo.paths.workspace, '@')
    //   .replace('.ts', '');

    const getSchemaContent = () => {
      switch (rawData.name) {
        case 'update':
          return `${handleBaseType}UpdateInput`;
        case 'create':
          return `${handleBaseType}Input`;
        default:
          return undefined;
      }
    };

    const getHandlerContent = () => {
      switch (rawData.name) {
        case 'get all':
          return `await prisma.${prismaTable}.findMany({
          where: {
            ...input
          },
          ...${prismaTable}SelectFields
          });`;
        case 'get one':
          return `await prisma.${prismaTable}.findFirst({
          where: {
            id: input.id
          },
          ...${prismaTable}SelectFields
        });`;
        case 'create':
          return `await prisma.${prismaTable}.create({
          data: {...input},
          ...${prismaTable}SelectFields
        });`;
        case 'update':
          return `await prisma.${prismaTable}.update({
          where: {
            id: input.id
          },
          data: {...input},
          ...${prismaTable}SelectFields
        });`;
        case 'delete':
          return `await prisma.${prismaTable}.delete({
          where: {
            id: input.id
          }
        });`;
        default:
          return '[];';
      }
    };

    const handleBaseType = pipe(rawData.router, toCamelCase(), capitalize());

    const handleDataType = `${handleBaseType}Data`;
    const getHandlerReturnType = () => {
      switch (rawData.name) {
        case 'get all':
          return `res.map(format${handleDataType})`;
        case 'get one':
          return `format${handleDataType}(res)`;
        case 'create':
          return `format${handleDataType}(res)`;
        case 'update':
          return `format${handleDataType}(res)`;

        default:
          return '';
      }
    };

    const data = {
      ...modData,
      // importPath,
      // routerName,
      // routeName,
      // routerFile,
      // routerPath,
      handlerContent: getHandlerContent(),
      handlerReturnType: getHandlerReturnType(),
      schemaContent: getSchemaContent(),
      handleDataType,
      prismaTable,
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
        '{{routerKey}}: authedProcedure.input({{ schemaName }}).{{ type }}({{handlerName}}),\n',
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
      pattern: ';',
      data,
      // template: '{{routeName}}: {{routerName}},\n',
      template: [
        `import { {{ schemaName }} } from './{{ baseHandlerFile }}-schema'`,
        `import { {{ handlerName }} } from './{{ baseHandlerFile }}-handler'`,
      ].join('\n'),
    });

    // return [];
    return actions;
  };

  plop.setGenerator('add-handler', {
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
      {
        type: 'list',
        name: 'type',
        message: 'What type of handler is this?',
        choices: [
          {
            name: 'Query',
            value: 'query',
          },
          {
            name: 'Mutation',
            value: 'mutation',
          },
        ],
      },
    ],
    actions: (rawData) => {
      return addHandlerActions(rawData as AddHandlerTypes);
    },
  });
}
