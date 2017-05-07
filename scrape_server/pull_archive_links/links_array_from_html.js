/*
* Sole export is a function that 
* transforms HTML of archive page
* into a list of links synchronously.
*
* @Param html -- html
* @Returns array of urls from archive page.
*
*/

const cheerio = require('cheerio');
const _ = require('lodash');
const logger = require('../logger');

module.exports = (html) => {

	logger.log("Parsing html...")

	// Hard-coded ways to get the 
	// main page content and the
	// links contained in it.
	const selector_get_main = '#post-2091';
	const selector_get_link = '.sya_postcontent a';

	const $ = cheerio.load(html);
	const main_content = $(selector_get_main);
	const link_objects = main_content.find(selector_get_link);

	const links = _.values(_.mapValues(link_objects, (link) => {
		return (link.attribs && link.attribs.href) ?
			link.attribs.href : undefined;
	})).filter(_.identity);

	logger.log("List of links obtained from html...")

	return links

}