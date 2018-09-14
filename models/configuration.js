'use strict';
module.exports = (sequelize, DataTypes) => {
    const Configuration = sequelize.define('Configuration', {
        cveVers: DataTypes.STRING,
        cpeVulnerable: DataTypes.STRING,
        cpe22Uri: DataTypes.STRING,
        cpe23Uri: DataTypes.STRING
    }, {});
    Configuration.associate = function (models) {
        // associations can be defined here
    };

    Configuration.sync();
    return Configuration;
};
