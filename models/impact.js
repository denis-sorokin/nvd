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
        cvssVers: DataTypes.STRING,
        cvssVectorString: DataTypes.STRING,
        cvssAccessVector: DataTypes.STRING,
        cvssAccessComplexity: DataTypes.STRING,
        cvssAuthentication: DataTypes.STRING,
        cvssConfidentialityImpact: DataTypes.STRING,
        cvssIntegrityImpact: DataTypes.STRING,
        cvssAvailabilityImpact: DataTypes.STRING,
        cvssBaseScore: DataTypes.STRING
    }, {});
    Impact.associate = function (models) {
        // associations can be defined here
    };
    Impact.sync();
    return Impact;
};
