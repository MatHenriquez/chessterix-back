import request from 'supertest';
import express from 'express';
import { server } from '../index';
import { Server } from 'http';

describe('GET /', () => {
  it('should return "Hello World!"', async () => {
    const response = await request(server).get('/');

    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello World!');

    return;
  });

  afterAll((done) => {
    server.close(done);
  });
});
