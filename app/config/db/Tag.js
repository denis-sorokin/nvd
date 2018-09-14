const Sequelize = require('sequelize');
const sequelize = require('../app/config/database');

const Tag = sequelize.define('tag', {
    value: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true // Model tableName will be the same as the model name
});

Tag.sync();

module.exports = Tag;
