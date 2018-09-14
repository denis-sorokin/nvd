const Sequelize = require('sequelize');
const sequelize = require('../app/config/database');

const Tag = require('./Tag');

const Reference = sequelize.define('reference', {
    url: {
        type: Sequelize.STRING
    },
    name: {
        type: Sequelize.STRING
    },
    refsource: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true // Model tableName will be the same as the model name
});

Reference.hasMany(Tag);

Reference.sync();

module.exports = Reference;
