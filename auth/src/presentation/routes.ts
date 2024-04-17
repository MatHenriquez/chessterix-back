import express, { Router } from 'express';
import type { Request, Response } from 'express';
import { UserService } from '../application/services/user.service';

export class AuthRoutes {
  private router: Router;
  private readonly userService = new UserService();

  constructor() {
    this.router = express.Router();
    this.routes();
  }

  public getRouter(): Router {
    return this.router;
  }

  private routes() {
    this.router.post('/login', async (req: Request, res: Response) => {
      // Login logic
      res.send('Login route');
    });

    this.router.post('/register', async (req: Request, res: Response) => {
      const createdUser = await this.userService.createUser(
        req.body.email,
        req.body.password
      );
      res.status(201).json(createdUser);
    });

    this.router.post(
      '/forgot-password',
      async (req: Request, res: Response) => {
        // Forgot password logic
        res.send('Forgot password route');
      }
    );

    this.router.post('/logout', async (req: Request, res: Response) => {
      // Logout logic
      res.send('Logout route');
    });
  }
}
