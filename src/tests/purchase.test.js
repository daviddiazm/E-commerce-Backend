const request = require('supertest');
const app = require('../app');
const User = require('../models/User');
const Product = require('../models/Product');
const Cart = require('../models/Cart');
require('../models');

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

test('GET /purchases retorna 200', async () => {
    const res = await request(app)
        .get('/purchases')
        .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200);
});

test('POST /purchases', async () => {
    const product = await Product.create({
        title: "IWatch",
        description : "asdf adf dfsafa fdsafasd fadfdaafda fdsadf",
        brand: "Apple",
        price: 1300
    });
    const card = await Cart.create({
        quantity: 2,
        productId: product.id
    });
    const res = await request(app)
        .post('/purchases')
        .send(card)
        .set('Authorization', `Bearer ${token}`)
    await card.destroy();
    await product.destroy();
    expect(res.status).toBe(200);
});