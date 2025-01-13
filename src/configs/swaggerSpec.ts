import swaggerJSDoc from 'swagger-jsdoc';
import fs from 'fs';
import path from 'path';

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

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Driver Service API',
      version: '1.0.0',
      description: 'API documentation for the Driver Service',
    },
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
