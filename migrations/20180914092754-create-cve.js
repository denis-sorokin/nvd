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
	        nvdId: {
		        type: Sequelize.STRING,
		        unique: true
	        },
	        assigner: {
		        type: Sequelize.STRING
	        },
	        description: {
		        type: Sequelize.STRING
	        },
	        descriptionLang: {
		        type: Sequelize.ENUM(LANG)
	        },
	        problem: {
		        type: Sequelize.STRING
	        },
	        problemLang: {
		        type: Sequelize.ENUM(LANG)
	        },
	        publishedDate: {
		        type: Sequelize.DATE
	        },
	        lastModifiedDate: {
		        type: Sequelize.DATE
	        },
	        createdAt: {
		        allowNull: false,
		        type: Sequelize.DATE
	        },
	        updatedAt: {
		        allowNull: false,
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
		        type: Sequelize.INTEGER,
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
	        }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Cves');
    }
};
