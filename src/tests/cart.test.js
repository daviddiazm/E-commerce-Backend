const request = require('supertest');
const app = require('../app');
const User = require('../models/User');
const Product = require('../models/Product');
require('../models')

let token
let cartId

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

test('POST /carts retorna 201', async () => {
    const product = await Product.create({
        title: "IWatch",
        description : "asdf adf dfsafa fdsafasd fadfdaafda fdsadf",
        brand: "Apple",
        price: 1300
    });
    const cartBody = {
        quantity: 2,
        productId: product.id
    }
    const res = await request(app)
        .post('/carts')
        .send(cartBody)
        .set('Authorization', `Bearer ${token}`);
    // console.log(token);
    // console.log("el body del post ",res.body);
    await product.destroy();
    // console.log("desde el post ", res.body.id);
    cartId = res.body.result.id;
    expect(res.status).toBe(201);
});

test('GET /carts retornar 200', async () => {
    const res = await request(app)
        .get('/carts')
        .set('Authorization', `Bearer ${token}`)
    // console.log("del get: ",res.body);
    expect(res.status).toBe(200);
});

test('PUT /carts/id', async () => {
    const newQuantity = {
        quantity: 4
    }
    const res = await request(app)
        .put(`/carts/${cartId}`)
        .send(newQuantity)
        .set('Authorization', `Bearer ${token}`)
    // console.log({cartId});
    // console.log(res.body);
    expect(res.status).toBe(200);
    expect(res.body.quantity).toBe(newQuantity.quantity);
});

test('DELETE /carts/id retorna 204', async () => {
    const res = await request(app)
        .delete(`/carts/${cartId}`)
        .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(204);
});