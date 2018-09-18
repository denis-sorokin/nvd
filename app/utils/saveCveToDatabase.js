const db = require('../../models');

module.exports = {
	async save(data) {
		idMeta = data.cve.CVE_data_meta.ID.split('-')[2];
		year = data.cve.CVE_data_meta.ID.split('-')[1];
		let writeVendor = [];
		let writeProblem = null;
		let writeDescription = [];
		let writeReference = [];
		let writeConfiguration = [];
		let writeImpactV2 = null;
		let writeImpactV3 = null;

		try {
			// write Impact
			try {
				let ImpactCvssTemp = null;
				let ImpactTemp = null;

				if (data.impact.baseMetricV2) {
					ImpactCvssTemp = db.ImpactCvss.create({
						vers: data.impact.baseMetricV2.cvssV2.version,
						vectorString: data.impact.baseMetricV2.cvssV2.vectorString,
						accessVector: data.impact.baseMetricV2.cvssV2.accessVector,
						accessComplexity: data.impact.baseMetricV2.cvssV2.accessComplexity,
						authentication: data.impact.baseMetricV2.cvssV2.authentication,
						confidentialityImpact: data.impact.baseMetricV2.cvssV2.confidentialityImpact,
						integrityImpact: data.impact.baseMetricV2.cvssV2.integrityImpact,
						availabilityImpact: data.impact.baseMetricV2.cvssV2.availabilityImpact,
						baseScore: data.impact.baseMetricV2.cvssV2.baseScore
					}).catch(err => {
						console.log('=====\nError write IMPACT_CVSS_v2 to database\n=====\n');
						console.error(err);
					});

					ImpactTemp = db.Impact.create({
						severity: data.impact.baseMetricV2.severity,
						exploitabilityScore: data.impact.baseMetricV2.exploitabilityScore,
						impactScore: data.impact.baseMetricV2.impactScore,
						obtainAllPrivilege: data.impact.baseMetricV2.obtainAllPrivilege,
						obtainUserPrivilege: data.impact.baseMetricV2.obtainUserPrivilege,
						obtainOtherPrivilege: data.impact.baseMetricV2.obtainOtherPrivilege,
						userInteractionRequired: data.impact.baseMetricV2.userInteractionRequired,
						cvssId: ImpactCvssTemp.get().id
					}).catch(err => {
						console.log('=====\nError write IMPACT_v2 to database\n=====\n');
						console.error(err);
					});

					writeImpactV2 = ImpactTemp.get().id;
				}

				if (data.impact.baseMetricV3) {
					ImpactCvssTemp = db.ImpactCvss.create({
						vers: data.impact.baseMetricV3.cvssV3.version,
						vectorString: data.impact.baseMetricV3.cvssV3.vectorString,
						accessVector: data.impact.baseMetricV3.cvssV3.attackVector,
						accessComplexity: data.impact.baseMetricV3.cvssV3.attackComplexity,
						authentication: data.impact.baseMetricV3.cvssV3.privilegesRequired,
						confidentialityImpact: data.impact.baseMetricV3.cvssV3.confidentialityImpact,
						integrityImpact: data.impact.baseMetricV3.cvssV3.integrityImpact,
						availabilityImpact: data.impact.baseMetricV3.cvssV3.availabilityImpact,
						baseScore: data.impact.baseMetricV3.cvssV3.baseScore
					}).catch(err => {
						console.log('=====\nError write IMPACT_CVSS_v3 to database\n=====\n');
						console.error(err);
					});

					ImpactTemp = db.Impact.create({
						exploitabilityScore: data.impact.baseMetricV3.exploitabilityScore,
						impactScore: data.impact.baseMetricV3.impactScore,
						cvssId: ImpactCvssTemp.get().id
					}).catch(err => {
						console.log('=====\nError write IMPACT_v3 to database\n=====\n');
						console.error(err);
					});

					writeImpactV3 = ImpactTemp.get().id;
				}
			} catch (e) {
				console.log('=====\nError write IMPACT to database\n=====\n');
				console.error(e);
			}

			// write Configurations
			try {
				let configurationTemp = null;
				const cveVers = data.configurations.CVE_data_version;

				if (data.configurations.nodes && data.configurations.nodes[0]
					&& data.configurations.nodes[0].cpe && data.configurations.nodes[0].cpe[0]) {
					data.configurations.nodes[0].cpe.forEach(conf => {
						configurationTemp = db.Configuration.create({
							cveVers,
							cpeVulnerable: conf.vulnerable,
							cpe22Uri: conf.cpe22Uri,
							cpe23Uri: conf.cpe23Uri
						}).catch(err => {
							console.error(err);
						});

						writeConfiguration.push(configurationTemp.get().id)
					})
				} else {
					configurationTemp = db.Configuration.create({
						cveVers
					}).catch(err => {
						console.error(err);
					});

					writeConfiguration.push(configurationTemp.get().id)
				}
			} catch (e) {
				console.log('=====\nError write CONFIGURATIONS to database\n=====\n');
				console.error(e);
			}

			// write Description
			try {
				let desription = null;

				data.cve.description.description_data.forEach(description => {
					desription = db.Description.create({
						lang: description.lang,
						value: description.value
					}).catch(err => {
						console.error(err);
					});

					writeDescription.push(desription.get().id);
				});
			} catch (e) {
				console.log('=====\nError write DESCRIPTION to database\n=====\n');
				console.error(e);
			}

			// write References
			try {
				data.cve.references.reference_data.forEach(reference => {
					let tagTemp = null;
					let refTemp = null;
					let tags = [];

					// write TAGs
					try {
						reference.tags.forEach(tag => {
							tagTemp = db.Tag.create({
								value: tag
							}).catch(err => {
								console.error(err);
							});

							tags.push(tagTemp.get().id);

						});
					} catch (e) {
						console.log('=====\nError write TAG to database\n=====\n');
						console.error(e);
					}

					refTemp = db.Reference.create({
						url: reference.url,
						name: reference.name,
						refsource: reference.refsource,
						tags: tags.join(',')
					}).catch(err => {
						console.error(err);
					});

					writeReference.push(refTemp.get().id);
				});
			} catch (e) {
				console.log('=====\nError write REFERENCE to database\n=====\n');
				console.error(e);
			}

			// write Problem
			try {
				let problem = null;

				if (data.cve.problemtype.problemtype_data[0].description[0]) {
					problem = db.Problem.create({
						lang: data.cve.problemtype.problemtype_data[0].description[0].lang,
						value: data.cve.problemtype.problemtype_data[0].description[0].value
					}).catch(err => {
						console.error(err);
					});

					writeProblem = problem.get().id
				}
			} catch (e) {
				console.log('=====\nError write PROBLEM to database\n=====\n');
				console.error(e);
			}

			// write Vendor product
			try {
				let vendor = null;

				data.cve.affects.vendor.vendor_data.forEach(vendor => {
					vendor.product.product_data.forEach(product => {
						let versions = [];
						product.version.version_data.forEach(vers => {
							versions.push(vers);
						});

						vendor = db.Vendor.create({
							name: product.product_name,
							version: versions.join(',')
						}).catch(err => {
							console.error(err);
						});

						writeVendor.push(vendor.get().id);
					})
				});
			} catch (e) {
				console.log('=====\nError write VENDOR to database\n=====\n');
				console.error(e);
			}

			// write CVE
			try {
				db.Cve.create({
					idMeta,
					year,
					assigner: data.cve.CVE_data_meta.ASSIGNER,
					type: data.cve.CVE_data_type,
					format: data.cve.CVE_data_format,
					version: data.cve.CVE_data_version,
					VendorId: writeVendor.join(','),
					ConfigurationId: writeConfiguration.join(','),
					ReferenceId: writeReference.join(','),
					DescriptionId: writeDescription.join(','),
					ProblemId: writeProblem ? writeProblem.id : null,
					publishedDate: data.publishedDate,
					lastModifiedDate: data.lastModifiedDate
				}).then(el => {
					console.log('=======', el.get().id, '=======')
				});
			} catch (e) {
				console.log('=====\nError write CVE to database\n=====\n');
				console.error(e);
			}
		} catch (e) {
			console.log('=====\nError write to database\n=====\n');
			console.error(e);
		}
	}
};
