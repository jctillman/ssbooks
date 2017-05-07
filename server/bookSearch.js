const db = require('../db/index');
const express = require('express')
const {Book, Mention, Comment, Page} = require('../db/models/Cluster');

const router = express.Router();

const toCamelCase = (str) => str.toUpperCase(str[0]) + str.toLowerCase(str.slice(1));

module.exports = function (req, res) {
	const { searchString } = req.params;
	const startMs = parseInt(req.params.startMs);
	const endMs = parseInt(req.params.endMs);

	const pageStart = parseInt(req.params.pageStart || "0");
	const pageEnd = parseInt(req.params.pageEnd || "0");

	const searchParams = {
		where: {
			title: {
				$or: [
					{$like: '%' + (searchString || "").toUpperCase() + '%'},
					{$like: '%' + (searchString || "").toLowerCase() + '%'},
					{$like: '%' + toCamelCase(searchString || "") + '%'},
				]
			}
		},
		include: [{
			model: Mention,
			where: { mentionDate: { $between: [startMs, endMs] } },
		}]
	}
	Book.findAll(searchParams).then( (books) => {
		const bks = books.map((book) => {
			const b = book.get(undefined, {plain:true});
			b.mentionCount = b.Mentions.length;
			b.Comments = b.Mentions.map((mention) => mention.Comment);
			b.Mentions = null;
			return b;
		});

		//THESE NEED TO BE DELEGATED TO THE THING

		bks.sort((a,b) => b.mentionCount - a.mentionCount)
		res.send(bks.slice(pageStart,pageEnd));
	});
};



