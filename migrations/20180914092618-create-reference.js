'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('References', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
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
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			Tags: {
				type: Sequelize.INTEGER,
				references: {
					model: 'Tags',
					key: 'id'
				},
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('References');
	}
};
