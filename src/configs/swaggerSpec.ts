import fs from 'fs';
import path from 'path';
import swaggerJSDoc from 'swagger-jsdoc';

const getRouteFiles = (dir: string) => {
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith('.ts') || file.endsWith('.js'));
};

const libraryRoutesDir = path.join(__dirname, '../routes');
const projectRoutesDir = path.join(process.cwd(), 'src/routes');

const libraryRouteFiles = getRouteFiles(libraryRoutesDir).map(
  (file) => `${libraryRoutesDir}/${file}`,
);
const projectRouteFiles = getRouteFiles(projectRoutesDir).map(
  (file) => `./src/routes/${file}`,
);

let schemas = {
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

try {
  const importedSchemas = require(
    path.join(process.cwd(), 'src/configs/swaggerSchemas'),
  ).default;
  if (typeof importedSchemas === 'object' && importedSchemas !== null) {
    schemas = { ...schemas, ...importedSchemas };
  }
} catch (error) {
  console.warn(
    '[Warn] : Using default schemas as swaggerSchemas.ts is not present or invalid:',
    error,
  );
}

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Driver Service API',
      version: '1.0.0',
      description: 'API documentation for the Driver Service',
    },
    components: {
      schemas,
    },
    tags: [
      {
        name: 'Test',
        description: 'Test Routes',
      },
    ],
    servers: [
      {
        url: process.env.APP_URL || 'http://localhost:3000', // Use APP_URL from environment variables or fallback to localhost
      },
    ],
  },
  apis: [...libraryRouteFiles, ...projectRouteFiles], // Path to the API docs
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
