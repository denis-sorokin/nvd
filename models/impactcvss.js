'use strict';
module.exports = (sequelize, DataTypes) => {
  const ImpactCvss = sequelize.define('ImpactCvss', {
	  vers: DataTypes.FLOAT,
	  vectorString: DataTypes.STRING,
	  accessVector: DataTypes.STRING,
	  accessComplexity: DataTypes.STRING,
	  authentication: DataTypes.STRING,
	  confidentialityImpact: DataTypes.STRING,
	  integrityImpact: DataTypes.STRING,
	  availabilityImpact: DataTypes.STRING,
	  baseScore: DataTypes.FLOAT
  }, {});
  ImpactCvss.associate = function(models) {
    // associations can be defined here
  };
  return ImpactCvss;
};
