export class ApiError extends Error {
  body;
  constructor(message: string, body: unknown) {
    super(message);
    this.name = 'ApiError';
    this.body = body;
  }
}
