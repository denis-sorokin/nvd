'use strict';
module.exports = (sequelize, DataTypes) => {
    const Vendor = sequelize.define('Vendor', {
        name: {
            type: DataTypes.STRING,
            unique: true
        },
        product: DataTypes.STRING,
        version: DataTypes.STRING
    }, {});
    Vendor.associate = function (models) {
        // associations can be defined here
    };
    Vendor.sync();
    return Vendor;
};
