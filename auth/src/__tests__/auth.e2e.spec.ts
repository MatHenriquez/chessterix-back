import request from 'supertest';
import app from '../index';

import { UserRepository } from '../infrastructure/persistence/user.repository';
import { EncryptionService } from '../infrastructure/services/encryption.service';

jest.mock('../infrastructure/persistence/user.repository');
jest.mock('../infrastructure/services/encryption.service');

describe('Auth routes', () => {
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
      jest.spyOn(UserRepository.prototype, 'findOneBy').mockResolvedValue(null);

      const response = await request(app).post('/login').send({
        email: 'fake@mail.com',
        password: 'Password135.'
      });

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'User not found' });

      return;
    });

    it('should return 401 if password is invalid', async () => {
      jest.spyOn(UserRepository.prototype, 'findOneBy').mockResolvedValue({
        id: 1,
        email: 'john@doe.com',
        password: 'Password135.',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: new Date()
      });

      jest
        .spyOn(EncryptionService.prototype, 'compare')
        .mockResolvedValue(false);

      const response = await request(app).post('/login').send({
        email: 'john@doe.com',
        password: 'Password135..'
      });

      expect(response.status).toBe(401);
      expect(response.body).toEqual({ error: 'Invalid password' });
    });

    it('should return 200 with token if user is found and password is valid', async () => {
      jest.spyOn(UserRepository.prototype, 'findOneBy').mockResolvedValue({
        id: 1,
        email: 'john@doe.com',
        password: 'Password135.',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: new Date()
      });

      jest
        .spyOn(EncryptionService.prototype, 'compare')
        .mockResolvedValue(true);

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
