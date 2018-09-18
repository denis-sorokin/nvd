'use strict';
const {LANG} = require('../app/constants');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('Problems', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			lang: {
				type: Sequelize.ENUM(LANG)
			},
			value: {
				type: Sequelize.TEXT
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
		return queryInterface.dropTable('Problems');
	}
};
