'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Reference_Tags', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      refId: {
         type: Sequelize.INTEGER.UNSIGNED,
	      references: {
		      model: 'References',
		      key: 'id'
	      },
	      onUpdate: 'CASCADE',
	      onDelete: 'CASCADE',
      },
      tagId: {
          type: Sequelize.INTEGER.UNSIGNED,
	      references: {
		      model: 'Tags',
		      key: 'id'
	      },
	      onUpdate: 'CASCADE',
	      onDelete: 'CASCADE',
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
    return queryInterface.dropTable('Reference_Tags');
  }
};
