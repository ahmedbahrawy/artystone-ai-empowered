import { z } from "zod";

export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 400,
    public details?: Record<string, unknown>
  ) {
    super(message);
    this.name = "AppError";
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      code: this.code,
      statusCode: this.statusCode,
      details: this.details,
    };
  }
}

export class ValidationError extends AppError {
  constructor(errors: z.ZodError) {
    super(
      "Validation failed",
      "VALIDATION_ERROR",
      400,
      { errors: errors.errors }
    );
    this.name = "ValidationError";
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string, id?: string) {
    super(
      `${resource}${id ? ` with ID ${id}` : ""} not found`,
      "NOT_FOUND",
      404
    );
    this.name = "NotFoundError";
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized") {
    super(message, "UNAUTHORIZED", 401);
    this.name = "UnauthorizedError";
  }
}

export function handleError(error: unknown): AppError {
  if (error instanceof AppError) {
    return error;
  }

  if (error instanceof z.ZodError) {
    return new ValidationError(error);
  }

  if (error instanceof Error) {
    return new AppError(
      error.message,
      "INTERNAL_ERROR",
      500,
      { originalError: error.name }
    );
  }

  return new AppError(
    "An unexpected error occurred",
    "INTERNAL_ERROR",
    500,
    { originalError: error }
  );
} 