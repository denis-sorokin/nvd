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
			CvssId: {
				type: Sequelize.INTEGER,
				references: {
					model: 'ImpactCvsses',
					key: 'id'
				},
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
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
