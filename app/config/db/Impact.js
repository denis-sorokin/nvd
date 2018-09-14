const Sequelize = require('sequelize');
const sequelize = require('../app/config/database');

const Impact = sequelize.define('impact', {
    severity: {
        type: Sequelize.STRING
    },
    exploitabilityScore: {
        type: Sequelize.INTEGER
    },
    impactScore: {
        type: Sequelize.INTEGER
    },
    obtainAllPrivilege: {
        type: Sequelize.BOOLEAN
    },
    obtainUserPrivilege: {
        type: Sequelize.BOOLEAN
    },
    obtainOtherPrivilege: {
        type: Sequelize.BOOLEAN
    },
    userInteractionRequired: {
        type: Sequelize.BOOLEAN
    },
    cvssVers: {
        type: Sequelize.STRING
    },
    cvssVectorString: {
        type: Sequelize.STRING
    },
    cvssAccessVector: {
        type: Sequelize.STRING
    },
    cvssAccessComplexity: {
        type: Sequelize.STRING
    },
    cvssAuthentication: {
        type: Sequelize.STRING
    },
    cvssConfidentialityImpact: {
        type: Sequelize.STRING
    },
    cvssIntegrityImpact: {
        type: Sequelize.STRING
    },
    cvssAvailabilityImpact: {
        type: Sequelize.STRING
    },
    cvssBaseScore: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true // Model tableName will be the same as the model name
});

Impact.sync();

module.exports = Impact;
