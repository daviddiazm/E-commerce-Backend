const request = require('supertest');
const app = require('../app');

let token
let categoryId


beforeAll(async () => {
    const credentials = {
        email: "test@email.com",
        password: "test123",
    }
    const res = await request(app)
        .post('/users/login')
        .send(credentials)
    token = res.body.token;
});

test('POST /categories retorna 201', async () => {
    const body = { name: "Tech" }
    const res = await request(app)
        .post('/categories')
        .send(body)
        .set('Authorization', `Bearer ${token}`);
    categoryId = res.body.id;
    expect(res.status).toBe(201);
});

test('GET /categories retorna 200', async () => {
    const res = await request(app)
        .get('/categories')
    expect(res.status).toBe(200);
});

test('PUT /categories/id retorna 200', async () => {
    const newName = { name: "Home" }
    const res = await request(app)
        .put(`/categories/${categoryId}`)
        .send(newName)
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
});

test('DELETE /categories/id retorna 204', async () => {
    const res = await request(app)
        .delete(`/categories/${categoryId}`)
        .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(204);
});