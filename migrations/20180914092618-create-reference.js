'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('References', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER.UNSIGNED
			},
			url: {
				type: Sequelize.STRING
			},
			name: {
				type: Sequelize.STRING
			},
			refsource: {
				type: Sequelize.STRING
			},
			// Tags: {
			// 	type: Sequelize.INTEGER,
			// 	references: {
			// 		model: 'Reference_Tag',
			// 		key: 'tagId'
			// 	},
			// 	onUpdate: 'CASCADE',
			// 	onDelete: 'SET NULL',
			// },
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
		return queryInterface.dropTable('References');
	}
};
