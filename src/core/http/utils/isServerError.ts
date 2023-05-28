import { ServerErrorType } from '../types';

function isServerError(error: unknown): error is ServerErrorType {
  return !!error && typeof error === 'object' && 'reason' in error;
}

export { isServerError };
