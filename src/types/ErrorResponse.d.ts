/**
 * Type for a generic error response.
 */
export type ErrorResponse = {
  status: number;
  message: string | Record<string, any>;
  code: string;
  name: string;
};

/**
 * Type for a validation error response.
 */
export type ValidationErrorResponse = ErrorResponse & {
  errors: ValidationErrorType[];
};

/**
 * Type for a single validation error.
 */
export type ValidationErrorType = {
  field: string;
  message: string;
};
