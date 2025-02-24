import bodyParser from 'body-parser';
import { Express, NextFunction, Request, Response } from 'express';
import { createNotFoundError } from '../errors/customErrors';
import globalErrorHandler from '../errors/globalErrorHandler';
import {
  expressWinstonMiddleware,
  logIdMiddleware,
  morganMiddleware,
} from '../middlewares/loggingMiddleware';

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
  // "Not Found" middleware
  app.use((_req: Request, _res: Response, _next: NextFunction) => {
    throw createNotFoundError('Route not found');
  });

  // Global error handler
  app.use(globalErrorHandler);
};
