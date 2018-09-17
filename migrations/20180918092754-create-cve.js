'use strict';
const { LANG } = require('../app/constants');

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Cves', {
	        id: {
		        allowNull: false,
		        autoIncrement: true,
		        primaryKey: true,
		        type: Sequelize.INTEGER
	        },
	        idMeta: Sequelize.INTEGER,
	        year: Sequelize.INTEGER,
	        type: Sequelize.STRING,
	        format: Sequelize.STRING,
	        version: Sequelize.FLOAT,
	        assigner: {
		        type: Sequelize.STRING
	        },
	        publishedDate: {
		        type: Sequelize.DATE
	        },
	        lastModifiedDate: {
		        type: Sequelize.DATE
	        },
	        ImpactId: {
		        type: Sequelize.INTEGER,
		        references: {
			        model: 'Impacts',
			        key: 'id'
		        },
		        onUpdate: 'CASCADE',
		        onDelete: 'SET NULL',
	        },
	        ConfigurationId: {
		        type: Sequelize.INTEGER,
		        references: {
			        model: 'Configurations',
			        key: 'id'
		        },
		        onUpdate: 'CASCADE',
		        onDelete: 'SET NULL',
	        },
	        ReferenceId: {
		        type: Sequelize.INTEGER.UNSIGNED,
		        references: {
			        model: 'References',
			        key: 'id'
		        },
		        onUpdate: 'CASCADE',
		        onDelete: 'SET NULL',
	        },
	        VendorId: {
		        type: Sequelize.INTEGER,
		        references: {
			        model: 'Vendors',
			        key: 'id'
		        },
		        onUpdate: 'CASCADE',
		        onDelete: 'SET NULL',
	        },
	        DescriptionId: {
		        type: Sequelize.INTEGER,
		        references: {
			        model: 'Descriptions',
			        key: 'id'
		        },
		        onUpdate: 'CASCADE',
		        onDelete: 'SET NULL',
	        },
	        ProblemId: {
		        type: Sequelize.INTEGER,
		        references: {
			        model: 'Problems',
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
        return queryInterface.dropTable('Cves');
    }
};
