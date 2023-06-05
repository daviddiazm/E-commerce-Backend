const Cart = require("./Cart");
const Category = require("./Category");
const Product = require("./Product");
const ProductImg = require("./ProductImg");
const Purchase = require("./Purchase");
const User = require("./User");


// Product.belongsToMany(Category, { through: 'ProductsCategories' });
// Category.belongsToMany(Product, { through: 'ProductsCategories' });

// ya que un electrodomestico puede ser ser parte de Tecnologia y de Hogar pero no se si me salte algun end ponit entonces lo voy a hacer de uno a muchos como lo vienen haciendo

Category.hasMany(Product);
Product.belongsTo(Category);

Product.hasMany(ProductImg);
ProductImg.belongsTo(Product);

Product.hasMany(Cart);
Cart.belongsTo(Product);

User.hasMany(Cart);
Cart.belongsTo(User);

Product.hasMany(Purchase);
Purchase.belongsTo(Product);

User.hasMany(Purchase);
Purchase.belongsTo(User);