const db = require('../../models');

module.exports = {
	async save(data) {
		idMeta = data.cve.CVE_data_meta.ID.split('-')[2];
		year = data.cve.CVE_data_meta.ID.split('-')[1];
		let writeVendor = null;
		let writeProblem = null;
		let writeDescription = null;
		let writeReference = null;
		let writeConfiguration = null;
		let writeImpactV2 = null;
		let writeImpactV3 = null;
		let writeCve = null;

		try {
			// write Impact
			try {
				v2 = {};
				v3 = {};

				if (data.impact.baseMetricV2) {
					v2.vers = data.impact.baseMetricV2.cvssV2.version;
					v2.vectorString = data.impact.baseMetricV2.cvssV2.vectorString;
					v2.accessVector = data.impact.baseMetricV2.cvssV2.accessVector;
					v2.accessComplexity = data.impact.baseMetricV2.cvssV2.accessComplexity;
					v2.authentication = data.impact.baseMetricV2.cvssV2.authentication;
					v2.confidentialityImpact = data.impact.baseMetricV2.cvssV2.confidentialityImpact;
					v2.integrityImpact = data.impact.baseMetricV2.cvssV2.integrityImpact;
					v2.availabilityImpact = data.impact.baseMetricV2.cvssV2.availabilityImpact;
					v2.baseScore = data.impact.baseMetricV2.cvssV2.baseScore;

					v2.severity = data.impact.baseMetricV2.cvssV2.obtainOtherPrivilege;
					v2.exploitabilityScore = data.impact.baseMetricV2.cvssV2.obtainOtherPrivilege;
					v2.impactScore = data.impact.baseMetricV2.cvssV2.obtainOtherPrivilege;
					v2.obtainAllPrivilege = data.impact.baseMetricV2.cvssV2.obtainOtherPrivilege;
					v2.obtainUserPrivilege = data.impact.baseMetricV2.cvssV2.obtainOtherPrivilege;
					v2.obtainOtherPrivilege = data.impact.baseMetricV2.cvssV2.obtainOtherPrivilege;
					v2.userInteractionRequired = data.impact.baseMetricV2.cvssV2.userInteractionRequired;

					const detailV2 = await db.ImpactCvss.create({
						severity: v2.severity,
						exploitabilityScore: v2.exploitabilityScore,
						impactScore: v2.impactScore,
						obtainAllPrivilege: v2.obtainAllPrivilege,
						obtainUserPrivilege: v2.obtainUserPrivilege,
						obtainOtherPrivilege: v2.obtainOtherPrivilege,
						userInteractionRequired: v2.userInteractionRequired
					});

					writeImpactV2 = await db.Impact.create({
						vers: v3.vers,
						vectorString: v3.vectorString,
						accessVector: v3.accessVector,
						accessComplexity: v3.accessComplexity,
						authentication: v3.authentication,
						confidentialityImpact: v3.confidentialityImpact,
						integrityImpact: v3.integrityImpact,
						availabilityImpact: v3.availabilityImpact,
						baseScore: v3.baseScore,
						cvssId: detailV2.id
					});
				}
				if (data.impact.baseMetricV3) {
					v3.vers = data.impact.baseMetricV3.cvssV3.version;
					v3.vectorString = data.impact.baseMetricV3.cvssV3.vectorString;
					v3.accessVector = data.impact.baseMetricV3.cvssV3.attackVector;
					v3.accessComplexity = data.impact.baseMetricV3.cvssV3.attackComplexity;
					v3.authentication = data.impact.baseMetricV3.cvssV3.privilegesRequired;
					v3.confidentialityImpact = data.impact.baseMetricV3.cvssV3.confidentialityImpact;
					v3.integrityImpact = data.impact.baseMetricV3.cvssV3.integrityImpact;
					v3.availabilityImpact = data.impact.baseMetricV3.cvssV3.availabilityImpact;
					v3.baseScore = data.impact.baseMetricV3.cvssV3.baseScore;

					v3.exploitabilityScore = data.impact.baseMetricV3.exploitabilityScore;
					v3.impactScore = data.impact.baseMetricV3.exploitabilityScore;

					const detailV3 = await db.ImpactCvss.create({
						exploitabilityScore: data.impact.baseMetricV3.exploitabilityScore,
						impactScore: data.impact.baseMetricV3.exploitabilityScore
					});

					writeImpactV3 = await db.Impact.create({
						vers: v3.vers,
						vectorString: v3.vectorString,
						accessVector: v3.accessVector,
						accessComplexity: v3.accessComplexity,
						authentication: v3.authentication,
						confidentialityImpact: v3.confidentialityImpact,
						integrityImpact: v3.integrityImpact,
						availabilityImpact: v3.availabilityImpact,
						baseScore: v3.baseScore,
						cvssId: detailV3.id
					});
				}
			} catch (e) {
				console.log('=====\nError write IMPACT to database\n=====\n');
				console.error(e);
			}

			// write Configurations
			try {
				const cveVers = data.configurations.CVE_data_version;

				data.configurations.nodes.cpe.forEach(async conf => {
					writeConfiguration = await db.Configuration.create({
						cveVers,
						cpeVulnerable: conf.vulnerable,
						cpe22Uri: conf.cpe22Uri,
						cpe23Uri: conf.cpe23Uri
					});
				});
			} catch (e) {
				console.log('=====\nError write CONFIGURATIONS to database\n=====\n');
				console.error(e);
			}

			// write Description
			try {
				data.description.description_data.forEach(async description => {
					writeDescription = await db.Description.create({
						lang: description.lang,
						value: description.value
					});
				});
			} catch (e) {
				console.log('=====\nError write DESCRIPTION to database\n=====\n');
				console.error(e);
			}

			// write References
			try {
				data.references.reference_data.forEach(async reference => {
					let tags = [];

					// write TAGs
					try {
						reference.tags.forEach(async tag => {
							let writeTag = await db.Tag.create({
								value: tag
							});
							tags.push(writeTag.id);
						});
					} catch (e) {
						console.log('=====\nError write TAG to database\n=====\n');
						console.error(e);
					}

					writeReference = await db.Reference.create({
						url: reference.url,
						name: reference.name,
						refsource: reference.refsource,
						tags: tags.join(',')
					});
				});
			} catch (e) {
				console.log('=====\nError write REFERENCE to database\n=====\n');
				console.error(e);
			}

			// write Problem
			try {
				data.problemtype.problemtype_data.description.forEach(async problem => {
					writeProblem = await db.Problem.create({
						lang: problem.lang,
						value: problem.value
					});
				});
			} catch (e) {
				console.log('=====\nError write PROBLEM to database\n=====\n');
				console.error(e);
			}

			// write Vendor product
			try {
				data.affects.vendor.vendor_data.forEach(vendor => {
					vendor.product.product_data.forEach(async product => {
						let versions = [];
						product.version.version_data.forEach(vers => {
							versions.push(vers);
						});

						writeVendor = await db.Vendor.create({
							name: product.product_name,
							version: versions.join(',')
						});
					})
				});
			} catch (e) {
				console.log('=====\nError write VENDOR to database\n=====\n');
				console.error(e);
			}

			// write CVE
			try {
				writeCve = await db.Cve.create({
					idMeta,
					year,
					assigner: data.cve.CVE_data_meta.ASSIGNER,
					type: data.cve.CVE_data_type,
					format: data.cve.CVE_data_format,
					version: data.cve.CVE_data_version,
					VendorId: writeVendor.id,
					ConfigurationId: writeConfiguration.id,
					ReferenceId: writeReference.id,
					DescriptionId: writeDescription.id,
					ProblemId: writeProblem.id,
					publishedDate: data.publishedDate,
					lastModifiedDate: data.lastModifiedDate
				});
			} catch (e) {
				console.log('=====\nError write CVE to database\n=====\n');
				console.error(e);
			}
		}  catch (e) {
			console.log('=====\nError write to database\n=====\n');
			console.error(e);
		}
	}
};
