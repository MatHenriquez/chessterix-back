import request from 'supertest';
import app from '../index';
import { initializeDb, closeDb } from '../config/orm.config';

describe('Auth routes', () => {
  beforeAll(async () => {
    await initializeDb();
  });

  afterAll(async () => {
    await closeDb();
  });

  describe('POST /login', () => {
    it('should return 400 if email or password are not provided', async () => {
      const response = await request(app).post('/login').send({});

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        error: 'Email and password are required'
      });

      return;
    });

    it('should return 404 if user is not found', async () => {
      const response = await request(app).post('/login').send({
        email: 'fake@mail.com',
        password: 'Password135.'
      });

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'User not found' });

      return;
    });

    it('should return 401 if password is invalid', async () => {
      const response = await request(app).post('/login').send({
        email: 'john@doe.com',
        password: 'Password135..'
      });

      expect(response.status).toBe(401);
      expect(response.body).toEqual({ error: 'Invalid password' });
    });

    it('should return 200 with token if user is found and password is valid', async () => {
      const response = await request(app).post('/login').send({
        email: 'john@doe.com',
        password: 'Password135.'
      });

      expect(response.status).toBe(200);
      expect(response.body.error).toBeNull();
      expect(response.body.data.token).toEqual(expect.any(String));
    });
  });
});
