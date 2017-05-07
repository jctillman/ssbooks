
const _ = require('lodash');
const cheerio = require('cheerio');

const utils = require('../utils');
const execAll = utils.execAll;

module.exports = (html) => {
	const linksReg = /<a.*<\/a>/g;
	const links = execAll(linksReg,html);
	const allAmazonCodes = links.reduce((all, linkHtml) => {
		var code = cheerio.load(linkHtml)('a').attr('href');
		if (code && code.indexOf("amazon.com") > -1) {
			code = code.replace('smile.amazon','www.amazon');
			code = code.split('ref=')[0];
			code = code.replace('http:','https:');
			code = code.match(new RegExp('[A-Z0-9]{10}'));
			if (code){
				return all.concat(code);
			}
		}
		return all;
	}, []);
	return allAmazonCodes
}


