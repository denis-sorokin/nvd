'use strict';
module.exports = (sequelize, DataTypes) => {
  const ReferenceTag = sequelize.define('Reference_Tag', {
    refId: DataTypes.INTEGER,
    tagId: DataTypes.INTEGER
  }, {});
  ReferenceTag.associate = function(models) {
    // associations can be defined here
  };
  return ReferenceTag;
};
