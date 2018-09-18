'use strict';
const { LANG } = require('../app/constants');

module.exports = (sequelize, DataTypes) => {
  const Description = sequelize.define('Description', {
    lang: DataTypes.ENUM(LANG),
    value: DataTypes.TEXT
  }, {});
  Description.associate = function(models) {
    // associations can be defined here
  };
  return Description;
};
