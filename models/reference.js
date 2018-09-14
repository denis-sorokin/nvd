'use strict';
module.exports = (sequelize, DataTypes) => {
    const Reference = sequelize.define('Reference', {
        url: DataTypes.STRING,
        name: DataTypes.STRING,
        refsource: DataTypes.STRING
    }, {});
    Reference.associate = function (models) {
        Reference.hasMany(models.Tag);
    };
    Reference.sync();
    return Reference;
};
