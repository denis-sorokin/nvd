'use strict';
module.exports = (sequelize, DataTypes) => {
    const Tag = sequelize.define('Tag', {
        value: DataTypes.STRING
    }, {});
    Tag.associate = function (models) {
	    Tag.belongsToMany(models.Reference, {as: 'References', through: 'Reference_Tags', foreignKey: 'tagId' });
    };
    Tag.sync();
    return Tag;
};
