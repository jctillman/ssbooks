/*
* Sole export is a function that 
* uploads a list of archive links to 
* the database, returning a promise
* that resolves when done.
*
* @Param links_array -- array of links
* @Returns a promise resolving when done.
*
*/
const logger = require('../logger');
const asyncLoop = require('../utils').asyncLoop;

const ArchiveLink = require('../../db/models/ArchiveLink')

module.exports = (links_array) => {

	logger.log("Uploading archive_links to database...");

	return asyncLoop(links_array, (url, index, done) => {

		ArchiveLink.findOne({where: {url}}).then( (result) => {

			// If searching for this url 
			// finds nothing, create a new entry,
			// otherwise just update the order
			// of the entry on the page.
			return (!result) ? 
				ArchiveLink.build({
					url: url,
					pageOrder: index,
					lastPulledContent: null,
				}).save() : 
				result.update({pageOrder: index});

		}).then(done);
	});

}