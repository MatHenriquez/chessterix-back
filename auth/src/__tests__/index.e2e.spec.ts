import request from 'supertest';
import app from '../index';

describe('GET /', () => {
  it('should return "Hello World!"', async () => {
    const response = await request(app).get('/');

    expect(response.status).toBe(200);
    expect(response.text).toBe('Auth service is running');

    return;
  });
});
