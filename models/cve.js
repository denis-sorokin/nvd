'use strict';

module.exports = (sequelize, DataTypes) => {
    const Cve = sequelize.define('Cve', {
	    id_meta: DataTypes.INTEGER,
	    year: DataTypes.INTEGER,
	    assigner: DataTypes.STRING,
	    type: DataTypes.STRING,
	    format: DataTypes.STRING,
	    version: DataTypes.FLOAT,
	    // description: DataTypes.STRING,
        // descriptionLang: DataTypes.ENUM(LANG),
        // problem: DataTypes.STRING,
        // problemLang: DataTypes.ENUM(LANG),
        publishedDate: DataTypes.DATE,
        lastModifiedDate: DataTypes.DATE
    }, {});
    Cve.associate = function (models) {
        Cve.belongsTo(models.Impact, {as: 'ImpactId'});
        Cve.belongsTo(models.Configuration, {as: 'ConfigurationId'});
        Cve.belongsTo(models.Reference, {as: 'ReferenceId'});
	    Cve.belongsTo(models.Vendor, {as: 'VendorId'});
	    Cve.belongsTo(models.Description, {as: 'DescriptionId'});
	    Cve.belongsTo(models.Problem, {as: 'ProblemId'});
    };

    Cve.sync();

    return Cve;
};
