'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('Impacts', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
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
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('Impacts');
	}
};
