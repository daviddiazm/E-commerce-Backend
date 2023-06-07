const catchError = require('../utils/catchError');
const Purchase = require('../models/Purchase');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const ProductImg = require('../models/ProductImg');

const getAll = catchError(async(req, res) => {
    const userId = req.user.id;
    const purchase = await Purchase.findAll({
        where: {userId},
        include: {
            model: Product,
            include: [ProductImg]
        }
    })
    return res.json(purchase)
});

const buyCart = catchError(async(req, res) => {
    userId= req.user.id;
    const cartProducts = await Cart.findAll({
        where: { userId },
        attributes: ["quantity", "productId", "userId"],
        raw: true
    });
    // const { quantity, productId} = cartProducts
    await Purchase.bulkCreate(cartProducts)
    await Cart.destroy({ where: {userId} })
    return res.json(cartProducts)
})

module.exports = {
    getAll,
    buyCart
}