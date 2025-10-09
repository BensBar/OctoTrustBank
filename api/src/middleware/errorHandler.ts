/**
 * Enhanced Error Handler Middleware
 * 
 * Provides standardized error response format with:
 * - Consistent error shape: { error: { code, message, details? }, requestId? }
 * - Safe exposure of error details (only in non-production)
 * - Request ID tracking for debugging
 * - Proper status code mapping
 */

import { Request, Response, NextFunction } from 'express';
import { DatabaseError } from '../utils/errors';

/**
 * Standard error response format
 */
interface ErrorResponse {
  error: {
    code: string;
    message: string;
    details?: any;
  };
  requestId?: string;
}

/**
 * Generate a simple request ID for tracking
 * In production, you might want to use a more robust solution
 * like 'uuid' or extract from a request header
 */
function generateRequestId(): string {
  return `req_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
}

/**
 * Enhanced error handler middleware
 * 
 * Handles all errors thrown in the application and returns
 * a consistent error response format.
 * 
 * @param error - The error object
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 */
export function errorHandler(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
): Response | void {
  // Generate request ID for tracking
  const requestId = generateRequestId();

  // Log error for debugging (in production, use proper logging service)
  console.error(`[${requestId}] Error:`, {
    message: error.message,
    stack: error.stack,
    code: error.code,
    statusCode: error.statusCode,
  });

  // Initialize error response
  const errorResponse: ErrorResponse = {
    error: {
      code: 'INTERNAL_ERROR',
      message: 'An unexpected error occurred',
    },
    requestId,
  };

  // Handle known DatabaseError types
  if (error instanceof DatabaseError) {
    errorResponse.error = {
      code: error.code,
      message: error.message,
    };

    // Include details in non-production environments
    if (process.env.NODE_ENV !== 'production') {
      errorResponse.error.details = {
        name: error.name,
        stack: error.stack,
      };
    }

    return res.status(error.statusCode).json(errorResponse);
  }

  // Handle validation errors from other sources
  if (error.name === 'ValidationError' || error.statusCode === 400) {
    errorResponse.error = {
      code: 'VALIDATION_ERROR',
      message: error.message || 'Validation failed',
    };

    if (process.env.NODE_ENV !== 'production' && error.details) {
      errorResponse.error.details = error.details;
    }

    return res.status(400).json(errorResponse);
  }

  // Handle JSON parsing errors
  if (error instanceof SyntaxError && 'body' in error) {
    errorResponse.error = {
      code: 'INVALID_JSON',
      message: 'Invalid JSON in request body',
    };

    if (process.env.NODE_ENV !== 'production') {
      errorResponse.error.details = {
        message: error.message,
      };
    }

    return res.status(400).json(errorResponse);
  }

  // Default error handling for unknown errors
  if (process.env.NODE_ENV !== 'production') {
    errorResponse.error.details = {
      message: error.message,
      stack: error.stack,
      name: error.name,
    };
  }

  res.status(error.statusCode || 500).json(errorResponse);
}

/**
 * Not Found handler middleware
 * 
 * Handles 404 errors for routes that don't exist.
 * Should be placed after all other routes.
 */
export function notFoundHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Response | void {
  const errorResponse: ErrorResponse = {
    error: {
      code: 'NOT_FOUND',
      message: `Route ${req.method} ${req.path} not found`,
    },
    requestId: generateRequestId(),
  };

  res.status(404).json(errorResponse);
}
