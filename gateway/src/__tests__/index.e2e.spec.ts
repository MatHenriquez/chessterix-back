import request from 'supertest';
import app from '../index';

describe('GET /', () => {
  it('should return "Chessterix API"', async () => {
    const response = await request(app).get('/');

    expect(response.status).toBe(200);
    expect(response.text).toBe('Chessterix API');

    return;
  });
});
