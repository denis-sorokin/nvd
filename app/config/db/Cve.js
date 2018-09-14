const Sequelize = require('sequelize');
const sequelize = require('../app/config/database');
const { LANG } = require('../../constants');

const Impact = require('./Impact');
const Configuration = require('./Configuration');
const Reference = require('./Reference');
const Vendor = require('./Vendor');

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('cve', {
        nvdId: {
            type: DataTypes.STRING,
            unique: true
        },
        assigner: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
        descriptionLang: {
            type: DataTypes.ENUM(LANG)
        },
        problem: {
            type: DataTypes.STRING
        },
        problemLang: {
            type: DataTypes.ENUM(LANG),
        },
        publishedDate: {
            type: DataTypes.DATE
        },
        lastModifiedDate: {
            type: DataTypes.DATE
        }
    }, {
        freezeTableName: true // Model tableName will be the same as the model name
    });
};

// Cve.belongsTo(Impact);
// Cve.belongsTo(Configuration);
// Cve.belongsTo(Reference);
// Cve.belongsTo(Vendor);
//
// Cve.sync();
//
// module.exports = Cve;
