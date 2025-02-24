import fs from 'fs';
import path from 'path';
import swaggerJSDoc from 'swagger-jsdoc';

const getRouteFiles = (dir: string) => {
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith('.ts') || file.endsWith('.js'));
};

const defaultSchemas = {
  ErrorResponse: {
    type: 'object',
    properties: {
      status: {
        type: 'number',
      },
      message: {
        type: 'string',
      },
      code: {
        type: 'string',
      },
      name: {
        type: 'string',
      },
    },
  },
};

const mergeSchemas = (customSchemas: object) => {
  if (typeof customSchemas === 'object' && customSchemas !== null) {
    return { ...defaultSchemas, ...customSchemas };
  }
  return defaultSchemas;
};

export const createSwaggerSpec = ({
  title,
  version,
  description,
  schemas,
  routeDirs,
  serverUrl,
}: {
  title: string;
  version: string;
  description: string;
  schemas: object;
  routeDirs: string[];
  serverUrl: string;
}) => {
  const mergedSchemas = mergeSchemas(schemas);

  const routeFiles = routeDirs.flatMap((dir) =>
    getRouteFiles(dir).map((file) => `${dir}/${file}`),
  );

  const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title,
        version,
        description,
      },
      components: {
        schemas: mergedSchemas,
      },
      tags: [
        {
          name: 'Test',
          description: 'Test Routes',
        },
      ],
      servers: [
        {
          url: serverUrl,
        },
      ],
    },
    apis: routeFiles, // Path to the API docs
  };

  return swaggerJSDoc(options);
};

export default createSwaggerSpec;
