// import request from 'supertest/request';
const request = require('supertest');

const { server } = require('../dist/index')

describe('POST /user', () => {
  test('should store a new product', async () => {
    // aqui haremos la primera prueba
    await request(server)
      .post('/user')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
  })
})