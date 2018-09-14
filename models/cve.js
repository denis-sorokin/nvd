'use strict';
const {LANG} = require('../../constants');

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
        Cve.belongsTo(models.Impact);
        Cve.belongsTo(models.Configuration);
        Cve.belongsTo(models.Reference);
        Cve.belongsTo(models.Vendor);
    };

    Cve.sync();

    return Cve;
};
