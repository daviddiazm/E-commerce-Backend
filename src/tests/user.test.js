const request = require('supertest');
const app = require('../app');


let userId;
let token;

test('POST /users y retorna 201 ', async () => {
    const body = {
        firstName: "David",
        lastName: "Diaz",
        email: "david@email.com",
        password: "david123",
        phone: "12345678"
    }
    const res = await request(app).post('/users').send(body);
    userId = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
});

test('POST login /users/login y que lance 200 y que el token este definido', async () => {
    const userEmailAndPass = {
        email: "david@email.com",
        password: "david123",
    }
    const res = await request(app).post('/users/login').send(userEmailAndPass);
    token = res.body.token;
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
});

test('GET /users y retorne 200', async () => {
    const res = await request(app)
        .get('/users')
        .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(2);
});

test('GET /user/id y retonra 200', async () => {
    const res = await request(app)
        .get(`/users/${userId}`)
        .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200);
});

test('PUT /users/id retorna 200', async () => {
    const newPhone = { phone: "87654321"};
    const res = await request(app)
        .put(`/users/${userId}`)
        .send(newPhone)
        .set('Authorization', `Bearer ${token}`)
    userRetornado = res.body
    expect(res.status).toBe(200);
    expect(res.body.phone).toBe(newPhone.phone);
});


test('POST login /users/login que lance 401', async () => {
    const userEmailAndPass = {
        email: "david@email.com",
        password: "david1233",
    }
    const res = await request(app)
        .post('/users/login')
        .send(userEmailAndPass)
        .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(401);
});

test('DELETE /users/id retorna 204', async () => {
    const res = await request(app)
        .delete(`/users/${userId}`)
        .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(204);
});