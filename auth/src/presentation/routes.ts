import express, { Router } from 'express';
import type { Request, Response } from 'express';
import { UserService } from '../application/services/user.service';
import { IUserService } from '../application/interfaces/user-service.interface';
import { CreateUserDto } from '../application/dtos/requests/create-user.dto';
import { validate } from 'class-validator';
import { HttpError } from '../utils/httpError';

export class AuthRoutes {
  private router: Router;
  private readonly userService: IUserService;

  constructor() {
    this.userService = new UserService();
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
      const { email, password } = req.body;
      const user = new CreateUserDto(email, password);

      const errors = await validate(user);
      if (errors.length > 0) {
        res.status(400).json(errors);
      } else {
        try {
          const createdUser = await this.userService.createUser({
            email,
            password
          });
          res.status(201).json(createdUser);
        } catch (error) {
          if (error instanceof HttpError)
            res.status(error.statusCode).json({ error: error.message });
          else res.status(500).json({ error: 'Internal server error' });
        }
      }
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
