const Cve = require('./Cve');
const Impact = require('./Impact');
const Configuration = require('./Configuration');
const Reference = require('./Reference');
const Vendor = require('./Vendor');
const Tag = require('./Tag');

Cve.belongsTo(Impact);
Cve.belongsTo(Configuration);
Cve.belongsTo(Reference);
Cve.belongsTo(Vendor);
Reference.hasMany(Tag);

Cve.sync();
Impact.sync();
Configuration.sync();
Reference.sync();
Tag.sync();
Vendor.sync();

module.exports = {
    cve: Cve,
    impact: Impact,
    configuration: Configuration,
    reference: Reference,
    vendor: Vendor,
    tag: Tag
};
