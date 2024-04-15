import request from 'supertest';
import { server } from '../index';

describe('GET /', () => {
  it('should return "Hello World!"', async () => {
    const response = await request(server).get('/');

    expect(response.status).toBe(200);
    expect(response.text).toBe('Auth service is running');

    return;
  });

  afterAll((done) => {
    server.close(done);
  });
});
