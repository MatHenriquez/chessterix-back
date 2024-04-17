import { HttpError } from './httpError';

export class InternalServerError extends HttpError {
  constructor() {
    super('Internal server error', 500);
  }
}
