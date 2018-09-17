'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('Tags', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER.UNSIGNED
			},
			value: {
				type: Sequelize.STRING
			},
			// References: {
			// 	type: Sequelize.INTEGER,
			// 	references: {
			// 		model: 'Reference_Tag',
			// 		key: 'refId'
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
		return queryInterface.dropTable('Tags');
	}
};
