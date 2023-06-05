const request = require('supertest');
const app = require('../app');
const Category = require('../models/Category');
const ProductImg = require('../models/ProductImg');
require('../models')


let token
let productId

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

test('POST /products  retorna 201', async () => {
    const category = await Category.create({ name: "TEch" })

    const bodyProduct = {
        title: "Iphone",
        description: "asdf adf dfsafa fdsafasd fadfdaafda fdsadf",
        brand: "Apple",
        price: 1300,
        categoryId: category.id
    }
    const res = await request(app)
        .post('/products')
        .send(bodyProduct)
        .set('Authorization', `Bearer ${token}`)
    productId = res.body.id;
    await category.destroy();
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
});

test('GET /products retorna 200', async () => {
    const res = await request(app)
        .get('/products');
    expect(res.status).toBe(200);
});

test('GET /products/id y retonra 200', async () => {
    const res = await request(app)
        .get(`/products/${productId}`)
        .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200);
});

test('PUT /products/id retorna 200', async () => {
    const newTitle = { title: "AirMac" }
    const res = await request(app)
        .put(`/products/${productId}`)
        .send(newTitle)
        .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200);
});

test('POST producst/id/images retorna 200', async () => {
    const image = await ProductImg.create({
        url: "http://falseurl.com",
        publicId: "falseId"
    })
    const res = await request(app)
        .post(`/products/${productId}/images`)
        .send([image.id])
        .set('Authorization', `Bearer ${token}`)
    image.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test('DELETE /products/id retorna 204', async () => {
    const res = await request(app)
        .delete(`/products/${productId}`)
        .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(204);
});