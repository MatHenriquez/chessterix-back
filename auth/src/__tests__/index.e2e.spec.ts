import request from 'supertest';
import app from '../index';

describe('GET /', () => {
  it('should return "Auth service is running"', async () => {
    const response = await request(app).get('/');

    expect(response.status).toBe(200);
    expect(response.text).toBe('Auth service is running');

    return;
  });
});
