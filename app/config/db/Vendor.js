const Sequelize = require('sequelize');
const sequelize = require('../app/config/database');

const Vendor = sequelize.define('vendor', {
    name: {
        type: Sequelize.STRING,
        unique: true
    },
    product: {
        type: Sequelize.STRING
    },
    version: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true // Model tableName will be the same as the model name
});

Vendor.sync();

module.exports = Vendor;
