import { Request, Response, NextFunction } from 'express';

type AsyncFunction = (req: Request, res: Response) => Promise<void>;

export const catchedAsyncError =
  (fn: AsyncFunction) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res);
    } catch (error) {
      next(error);
    }
  };
