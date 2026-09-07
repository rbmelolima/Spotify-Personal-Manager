export class AppError extends Error {
  constructor(
    public readonly code: string,
    message: string,
    public readonly details: unknown = null,
    public readonly statusCode = 400,
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export const asAppError = (error: unknown): AppError =>
  error instanceof AppError
    ? error
    : new AppError('UNEXPECTED_ERROR', 'Ocorreu um erro inesperado.', undefined, 500);
