'use strict';
const { LANG } = require('../app/constants');

module.exports = (sequelize, DataTypes) => {
  const Problem = sequelize.define('Problem', {
    lang: DataTypes.ENUM(LANG),
    value: DataTypes.TEXT
  }, {});
  Problem.associate = function(models) {
    // associations can be defined here
  };
  return Problem;
};
