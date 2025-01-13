// import {
//   ErrorResponse,
//   ValidationErrorResponse,
//   ValidationErrorType,
// } from '../types/ErrorResponse';
import {
  ErrorResponse,
  ValidationErrorResponse,
  ValidationErrorType,
} from 'types/ErrorResponse';
import {
  ERROR_STATUS_CODES,
  ERROR_CODES,
  ERROR_NAMES,
} from '../constants/errorConstants';

export const createNotFoundError = (message: string): ErrorResponse => ({
  status: ERROR_STATUS_CODES.NOT_FOUND,
  message,
  code: ERROR_CODES.NOT_FOUND,
  name: ERROR_NAMES.NOT_FOUND,
});

export const createValidationError = (
  message: string,
  errors: ValidationErrorType[],
): ValidationErrorResponse => ({
  status: ERROR_STATUS_CODES.VALIDATION_ERROR,
  message,
  code: ERROR_CODES.VALIDATION_ERROR,
  name: ERROR_NAMES.VALIDATION_ERROR,
  errors,
});

export const createAuthError = (message: string): ErrorResponse => ({
  status: ERROR_STATUS_CODES.AUTH_ERROR,
  message,
  code: ERROR_CODES.AUTH_ERROR,
  name: ERROR_NAMES.AUTH_ERROR,
});

export const createServerError = (message: string): ErrorResponse => ({
  status: ERROR_STATUS_CODES.SERVER_ERROR,
  message,
  code: ERROR_CODES.SERVER_ERROR,
  name: ERROR_NAMES.SERVER_ERROR,
});

export const createBadRequestError = (message: string): ErrorResponse => ({
  status: ERROR_STATUS_CODES.BAD_REQUEST,
  message,
  code: ERROR_CODES.BAD_REQUEST,
  name: ERROR_NAMES.BAD_REQUEST,
});

export const createUnauthorizedError = (message: string): ErrorResponse => ({
  status: ERROR_STATUS_CODES.UNAUTHORIZED,
  message,
  code: ERROR_CODES.UNAUTHORIZED,
  name: ERROR_NAMES.UNAUTHORIZED,
});

export const createForbiddenError = (message: string): ErrorResponse => ({
  status: ERROR_STATUS_CODES.FORBIDDEN,
  message,
  code: ERROR_CODES.FORBIDDEN,
  name: ERROR_NAMES.FORBIDDEN,
});

export const createConflictError = (message: string): ErrorResponse => ({
  status: ERROR_STATUS_CODES.CONFLICT,
  message,
  code: ERROR_CODES.CONFLICT,
  name: ERROR_NAMES.CONFLICT,
});

export const createInternalServerError = (message: string): ErrorResponse => ({
  status: ERROR_STATUS_CODES.INTERNAL_SERVER_ERROR,
  message,
  code: ERROR_CODES.INTERNAL_SERVER_ERROR,
  name: ERROR_NAMES.INTERNAL_SERVER_ERROR,
});
