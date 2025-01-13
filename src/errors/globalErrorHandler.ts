import { NextFunction, Request, Response } from 'express';
import { ERROR_NAMES } from '../constants/errorConstants';
import log from '../services/logger';
import { ErrorResponse } from '../types/ErrorResponse';
import { isProductionMode } from '../utils/helpers';
import {
  createAuthError,
  createBadRequestError,
  createConflictError,
  createForbiddenError,
  createInternalServerError,
  createNotFoundError,
  createServerError,
  createUnauthorizedError,
  createValidationError,
} from './customErrors';

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  log.error(err.message);

  let errorResponse: ErrorResponse;

  switch (err.name) {
    case ERROR_NAMES.NOT_FOUND:
      errorResponse = createNotFoundError(err.message);
      break;
    case ERROR_NAMES.VALIDATION_ERROR:
      errorResponse = createValidationError(err.message, err.errors);
      break;
    case ERROR_NAMES.AUTH_ERROR:
      errorResponse = createAuthError(err.message);
      break;
    case ERROR_NAMES.SERVER_ERROR:
      errorResponse = createServerError(err.message);
      break;
    case ERROR_NAMES.BAD_REQUEST:
      errorResponse = createBadRequestError(err.message);
      break;
    case ERROR_NAMES.UNAUTHORIZED:
      errorResponse = createUnauthorizedError(err.message);
      break;
    case ERROR_NAMES.FORBIDDEN:
      errorResponse = createForbiddenError(err.message);
      break;
    case ERROR_NAMES.CONFLICT:
      errorResponse = createConflictError(err.message);
      break;
    case ERROR_NAMES.INTERNAL_SERVER_ERROR:
      errorResponse = createInternalServerError(err.message);
      break;
    default:
      errorResponse = createInternalServerError('Internal Server Error');
      break;
  }

  res.status(errorResponse.status).json({
    ...errorResponse,
  });
};

export default globalErrorHandler;
