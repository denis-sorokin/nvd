'use strict';
module.exports = (sequelize, DataTypes) => {
    const Tag = sequelize.define('Tag', {
        value: DataTypes.STRING
    }, {});
    Tag.associate = function (models) {
        // associations can be defined here
    };
    Tag.sync();
    return Tag;
};
