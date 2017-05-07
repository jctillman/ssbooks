/*
* Sole export is a function that accesses 
* saved archive links, then gets HTML for those links,
* and saves it.
*
* @Returns promise that resolves when done.
*
*/
const _ = require('lodash');

const utils = require('../utils');
const asyncLoop = utils.asyncLoop;
const logger = require('../logger');

const {Page, Comment, Mention, Book} = require('../../db/models/Cluster');
const AmazonLink = require('../../db/models/AmazonLink');

const getPotentialAmazonMentions = require('./potentialAmazonMentions');
const allRelevantComments = require('./allRelevantComments');

module.exports = () => {

	const oneWeekBack = 1000 * 60 * 60 * 24 * 1565;

	allRelevantComments(oneWeekBack, ( comment ) => {

		const commentAuthor = comment.get('commentAuthor');
		const commentTimestamp = comment.get('commentTimestamp');
		const commentHtml = comment.get('commentHtml');
		const commentId = comment.get('commentId');
		const commentUrl = comment.get('commentUrl');

		const arrPotentialMentions = getPotentialAmazonMentions(commentHtml);
		arrPotentialMentions.forEach( (code) => {
			AmazonLink.find({
				where: {from: code}
			}).then((link) => {
				if (link){
					const to = link.get('to');
					if (to){
						Mention.find({include: [
                    		{model: Book, where:
                    			{amazonLink: to}},
                    		{model: Comment, where:
                    			{commentId: commentId,
                    			 commentUrl: commentUrl}}
                		]}).then((mention) => {
							if (mention == null){
								Book.find({where: {amazonLink: to}}).then((book) => {
									Mention.create({
										mentionDate: commentTimestamp,
										BookId: book.get('id'),
										CommentId: comment.get('id'),
									});
								});
							}
						});
					}
				}

			});
		});

	},()=>{});
	

}