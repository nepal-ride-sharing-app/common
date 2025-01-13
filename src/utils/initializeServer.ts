import bodyParser from 'body-parser';
import { Express, Request, Response, NextFunction } from 'express';
import {
  expressWinstonMiddleware,
  logIdMiddleware,
  morganMiddleware,
} from '../middlewares/loggingMiddleware';
import swaggerRoutes from '../routes/swaggerRoutes';
import kafkaRoutes from '../routes/kafkaRoutes';
import dbRoutes from '../routes/dbRoutes';
import redisRoutes from '../routes/redisRoutes';
import mongoRoutes from '../routes/mongoRoutes';
import { isProductionMode } from './helpers';
import globalErrorHandler from '../errors/globalErrorHandler';
import { createNotFoundError } from '../errors/customErrors';

/**
 * Sets up middleware for the provided Express application.
 *
 * This function configures the following middleware:
 * - `body-parser`: Parses incoming request bodies in a middleware before your handlers, available under the `req.body` property.
 * - `logIdMiddleware`: Custom middleware for logging request IDs.
 * - `morganMiddleware`: HTTP request logger middleware for Node.js.
 * - `expressWinstonMiddleware`: Middleware for logging requests and responses using Winston.
 * - `globalErrorHandler`: Custom global error handler middleware.
 *
 * @param app - The Express application instance to set up middleware for.
 */
export const setupDefaultMiddleware = (app: Express) => {
  // Setup body-parser middleware
  app.use(bodyParser.json());

  // Setup logging middleware
  app.use(logIdMiddleware);
  app.use(morganMiddleware);
  app.use(expressWinstonMiddleware);

  // Add global error handler
  // app.use(globalErrorHandler);
};

/**
 * Sets up various routes for the application based on the environment.
 *
 * In non-production mode, it sets up the following routes:
 * - `/swagger` for Swagger documentation
 * - `/kafka` for Kafka-related routes
 * - `/db` for MySQL database routes
 * - `/redis` for Redis routes
 * - `/mongo` for MongoDB routes
 *
 * @param {Express} app - The Express application instance.
 */
export const setupDefaultRoutes = (app: Express) => {
  if (!isProductionMode()) {
    // swagger routes
    app.use('/swagger', swaggerRoutes);
    // kafka routes
    app.use('/kafka', kafkaRoutes);
    // mysql database routes
    app.use('/db', dbRoutes);
    // redis routes
    app.use('/redis', redisRoutes);
    // mongo routes
    app.use('/mongo', mongoRoutes);
  }
};

/**
 * Initializes the server with default settings before setting up routes.
 *
 * This function sets up the middleware and routes for the provided Express application.
 * calling `setupDefaultMiddleware` and `setupDefaultRoutes` fuctions.
 * @param app - The Express application instance to initialize.
 */
export const appSetupBeforeRoutesAndMiddleware = (app: Express) => {
  // setup middleware for the app
  setupDefaultMiddleware(app);
};

/**
 * Sets up middleware for handling "Not Found" routes and global errors.
 *
 * @param app - The Express application instance.
 *
 * This function adds two middlewares to the provided Express app:
 * 1. A middleware that throws a "Not Found" error for any unmatched routes.
 * 2. A global error handler middleware to handle errors throughout the application.
 */
export const appSetupAfterRoutesAndMiddleware = (app: Express) => {
  // setup routes for the app so that swagger will be generated at last
  setupDefaultRoutes(app);

  // "Not Found" middleware
  app.use((_req: Request, _res: Response, _next: NextFunction) => {
    throw createNotFoundError('Route not found');
  });

  // Global error handler
  app.use(globalErrorHandler);
};
