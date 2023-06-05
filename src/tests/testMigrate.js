const User = require('../models/User');
const sequelize = require('../utils/connection');
require('../models/User')
require('../models/Category')

const main = async () => {
    try {
        await sequelize.sync({ force: true });

        await User.create({
            firstName: "TestFirst",
            lastName: "TestLast",
            email: "test@email.com",
            password: "test123",
            phone: "12345678"
        })

        process.exit();
    } catch (error) {
        console.log(error);
    }
}

main();