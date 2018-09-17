'use strict';
module.exports = (sequelize, DataTypes) => {
    const Impact = sequelize.define('Impact', {
        severity: DataTypes.STRING,
        exploitabilityScore: DataTypes.INTEGER,
        impactScore: DataTypes.INTEGER,
        obtainAllPrivilege: DataTypes.BOOLEAN,
        obtainUserPrivilege: DataTypes.BOOLEAN,
        obtainOtherPrivilege: DataTypes.BOOLEAN,
        userInteractionRequired: DataTypes.BOOLEAN,
    }, {});
    Impact.associate = function (models) {
	    Impact.belongsTo(models.ImpactCvss, {as: 'cvssId'});
    };
    Impact.sync();
    return Impact;
};
