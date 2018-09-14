const Sequelize = require('sequelize');
const sequelize = require('../app/config/database');

const Configuration = sequelize.define('configuration', {
    cveVers: {
        type: Sequelize.STRING
    },
    cpeVulnerable: {
        type: Sequelize.STRING
    },
    cpe22Uri: {
        type: Sequelize.STRING
    },
    cpe23Uri: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true // Model tableName will be the same as the model name
});

Configuration.sync();

module.exports = Configuration;
