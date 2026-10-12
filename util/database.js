const Sequelize = require('sequelize');

const sequelize = new Sequelize('ai', 'root', 'Mahi@1234', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;