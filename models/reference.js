'use strict';
module.exports = (sequelize, DataTypes) => {
    const Reference = sequelize.define('Reference', {
	    url: DataTypes.STRING,
        name: DataTypes.STRING,
        refsource: DataTypes.STRING
    }, {});
    // Reference.associate = function (models) {
    //     Reference.belongsToMany(models.Tag, {as: 'tags', through: 'Reference_Tags', foreignKey: 'refId' });
    // };

    Reference.sync();

    return Reference;
};
