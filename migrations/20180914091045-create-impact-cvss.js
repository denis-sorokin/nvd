'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('ImpactCvsses', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			vers: Sequelize.FLOAT,
			vectorString: Sequelize.STRING,
			accessVector: Sequelize.STRING,
			accessComplexity: Sequelize.STRING,
			authentication: Sequelize.STRING,
			confidentialityImpact: Sequelize.STRING,
			integrityImpact: Sequelize.STRING,
			availabilityImpact: Sequelize.STRING,
			baseScore: Sequelize.FLOAT,
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			}
		})
		// .then(() => {
		// 	return queryInterface.addConstraint('ImpactCvsses', [
		// 		'vers', 'vectorString', 'accessVector',
		// 		'accessComplexity', 'authentication', 'confidentialityImpact',
		// 		'integrityImpact', 'availabilityImpact', 'baseScore'
		// 	], {
		// 		type: 'primary key',
		// 		name: 'uniq_row'
		// 	});
		// });
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('ImpactCvsses');
	}
};
