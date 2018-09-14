'use strict';
const {LANG} = require('../app/constants');

module.exports = (sequelize, DataTypes) => {
    const Cve = sequelize.define('Cve', {
        nvdId: {
            type: DataTypes.STRING,
            unique: true
        },
        assigner: DataTypes.STRING,
        description: DataTypes.STRING,
        descriptionLang: DataTypes.ENUM(LANG),
        problem: DataTypes.STRING,
        problemLang: DataTypes.ENUM(LANG),
        publishedDate: DataTypes.DATE,
        lastModifiedDate: DataTypes.DATE
    }, {});
    Cve.associate = function (models) {
        Cve.belongsTo(models.Impact, {as: 'ImpactId'});
        Cve.belongsTo(models.Configuration, {as: 'ConfigurationId'});
        Cve.belongsTo(models.Reference, {as: 'ReferenceId'});
        Cve.belongsTo(models.Vendor, {as: 'VendorId'});
    };

    Cve.sync();

    return Cve;
};
