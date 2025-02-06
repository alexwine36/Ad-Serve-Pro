import type { PlopTypes } from '@turbo/gen';
import fs from 'node:fs';
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

type InngestHandlerAnswers = TurboAnswers & {
  name: string;
  domain: string;
  eventKey: string;
  eventId: string;
  cron: boolean;
};

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  plop.setPrompt('directory', directoryPrompt as any);
  plop.setGenerator('add-bg-handler', {
    description: 'Generate Inngest Handler',
    prompts: [
      {
        type: 'input',
        name: 'domain',
        message: 'What is the domain of the handler?',
      },
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of the handler?',
      },
      {
        type: 'confirm',
        name: 'cron',
        message: 'Is this a cron handler?',
      },
      {
        type: 'input',
        name: 'eventKey',
        message: 'What is the event key of the handler?',
        default: ({ name, domain }: InngestHandlerAnswers) => {
          return `${toKebabCase(domain)}/${toKebabCase(name)}`
            .split('-')
            .join('.');
        },
      },
      {
        type: 'input',
        name: 'eventId',
        message: 'What is the event id of the handler?',
        default: ({ name, domain }: InngestHandlerAnswers) => {
          return `${toKebabCase(domain)}.${toKebabCase(name)}`
            .split('-')
            .join('.');
        },
      },
    ],

    actions: (rawData) => {
      const modData = rawData as unknown as InngestHandlerAnswers;
      const baseName = `${modData.domain} ${modData.name}`;
      const propertyName = pipe(baseName, toCamelCase());
      const className = pipe(propertyName, capitalize());
      const eventType = `${className}Event`;
      const functionName = `${propertyName}Function`;
      const cronFunctionName = `${propertyName}CronFunction`;
      const domainPathName = pipe(modData.domain, toKebabCase());

      const templatePath = `${modData.turbo.paths.workspace}/turbo/generators/templates/inngest`;

      const domainPropertyName = pipe(modData.domain, toCamelCase());

      const indexExports = {
        functions: `${domainPropertyName}Functions`,
        events: `${domainPropertyName}Events`,
        relativeImport: `./${domainPathName}`,
        relativeTypeImport: `./${domainPathName}/types`,
      };

      const handlerPathName = pipe(modData.name, toKebabCase());
      // const functionsName
      const basePath = `${modData.turbo.paths.workspace}/lib/functions`;
      const domainPath = `${basePath}/${domainPathName}`;
      const functionsIndexFilePath = `${basePath}/index.ts`;
      const functionsTypesFilePath = `${basePath}/types.ts`;
      const data = {
        ...modData,
        propertyName,
        className,
        eventType,
        functionName,
        domainPathName,
        handlerPathName,
        domainPropertyName,
        indexExports,
        cronFunctionName,
      };

      console.log(data);

      const actions: PlopTypes.Actions = [];
      // Update the domain index file
      const domainIndexExists = fs.existsSync(`${domainPath}/index.ts`);
      actions.push({
        type: 'add',
        templateFile: `${templatePath}/domain-index.ts.hbs`,
        path: `${domainPath}/index.ts`,
        skipIfExists: true,
      });
      actions.push({
        type: 'add',
        templateFile: `${templatePath}/domain-types.ts.hbs`,
        path: `${domainPath}/types.ts`,
        skipIfExists: true,
      });
      if (domainIndexExists) {
        actions.push({
          type: 'append',
          pattern: 'FunctionArray',
          path: `${domainPath}/index.ts`,
          template: `${functionName},{{#if cron}}{{ cronFunctionName }},{{/if}}`,
        });

        actions.push({
          type: 'append',
          pattern: ';',
          path: `${domainPath}/index.ts`,
          template: `import { ${functionName}, {{#if cron}}{{ cronFunctionName }},{{/if}} } from './${handlerPathName}';`,
        });

        actions.push({
          type: 'append',
          pattern: 'EventArray',
          path: `${domainPath}/types.ts`,
          template: `${eventType},`,
        });

        actions.push({
          type: 'append',
          pattern: ';',
          path: `${domainPath}/types.ts`,
          template: `import { ${eventType}, } from './${handlerPathName}-types';`,
        });
      }

      // Functions index file
      const functionIndexContent = fs.readFileSync(
        functionsIndexFilePath,
        'utf-8'
      );
      if (!functionIndexContent.includes(indexExports.relativeImport)) {
        actions.push({
          type: 'append',
          pattern: ';',
          path: functionsIndexFilePath,
          template: `import { ${indexExports.functions} } from '${indexExports.relativeImport}';`,
        });

        actions.push({
          type: 'append',
          pattern: 'FunctionArray',
          path: functionsIndexFilePath,
          template: `...${indexExports.functions},`,
        });

        actions.push({
          type: 'append',
          pattern: ';',
          path: functionsTypesFilePath,
          template: `import { ${indexExports.events}, } from '${indexExports.relativeTypeImport}';`,
        });

        actions.push({
          type: 'append',
          pattern: 'EventArray',
          path: functionsTypesFilePath,
          template: `...${indexExports.events},`,
        });
      }

      actions.push({
        type: 'add',
        templateFile: `${templatePath}/function.ts.hbs`,
        path: `${domainPath}/${handlerPathName}.ts`,
      });

      actions.push({
        type: 'add',
        templateFile: `${templatePath}/function-types.ts.hbs`,
        path: `${domainPath}/${handlerPathName}-types.ts`,
      });

      return actions.map((action) => {
        return {
          // biome-ignore lint/suspicious/noExplicitAny: Don't use strings
          ...(action as any),
          data,
        };
      });
    },
  });
}
