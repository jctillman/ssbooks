/*
* Sole export is a function that accesses 
* saved archive links, then gets HTML for those links,
* and saves it.
*
* @Returns promise that resolves when done.
*
*/

const request = require('request');
const _ = require('lodash');

const ArchiveLink = require('../../db/models/ArchiveLink')
const {Page, Comment} = require('../../db/models/Cluster');

const utils = require('../utils');
const asyncLoop = utils.asyncLoop;
const execAll = utils.execAll;
const logger = require('../logger');
const cheerio = require('cheerio');

module.exports = () => {

	const findConditions = {
		where: { 
			$or: [
				{pageOrder: {$lte: 1800}} //switch this to something higher for use
			]
		}
	};
	const postTitleSelector = ".pjgm-posttitle";
	const postDateSelector = ".pjgm-postmeta .entry-date";
	const postContentSelector = ".pjgm-postcontent";

	const commentDiv = '#comments';
	const commentSelector = ".commentholder";
	const commentAuthorSelector = ".comment-author cite";
	const commentDateSelector = ".comment-meta";
	const commentBodySelector = ".comment-body"; //still need to get rid of "a" with report comment class

	return ArchiveLink.findAll(findConditions).then((archiveLinkArr) => {

		logger.log("There are " + archiveLinkArr.length + " pages to be refreshed.");
		console.log("Pulling page html...")
		return asyncLoop(archiveLinkArr, (archiveLink, index, done) => {

			const url = archiveLink.get('url');

			request(url, (error, resp, body) => {

				logger.log("Parsing html for page " + url);

				$ = cheerio.load(body);

				const postUrl = url;
				const postTitle = $(postTitleSelector).html();
				const postDate = $(postDateSelector).html();
				const postDateTimestamp = new Date(postDate).getTime();
				const postContent = $(postContentSelector).html();

				const allComments = $(commentSelector);
				let allCommentsArr = [];
				allComments.each((index, comment) => {
					const commentUrl = url;
					const commentId = $(comment).attr('id');
					const commenterName = $(commentAuthorSelector, comment).html();
					const commentDate = $(commentDateSelector, comment).text();
					const commentDateTimestamp = new Date(commentDate.replace(' at','')).getTime();
					const commentBody = $(commentBodySelector, comment).html();
					allCommentsArr.push({
						commentUrl: commentUrl,
						commentId: commentId,
						commentTimestamp: commentDateTimestamp,
						commentAuthor: commenterName,
						commentHtml: commentBody
					})
				});

				Page.findOne({where: {pageUrl: url}}).then( (result) => {
					if(result){
						return result.destroy();
					}
				}).then(() => {
					const page = {
						pageUrl: postUrl,
						pageTimestamp: postDateTimestamp,
						pageHtml: postContent
					}
					return Page.create(page);
				}).then( (page) => {

					return Promise.all(allCommentsArr.map((comment) => {
						return Comment.create(comment).then( (comment) => {
							comment.setPage(page);
						});
					}));

				}).then( () => {
					return archiveLink.update({
						lastPulledContent: new Date().getTime()
					});
				}).then( () => {
					done();
				});


			});

		});
	})
	
	return async_loop
}