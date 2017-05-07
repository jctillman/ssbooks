const db = require('../db/index');
const express = require('express')
const {Book, Mention, Comment, Page} = require('../db/models/Cluster');

const router = express.Router();

//api/range/startMs/endMs/pageStart/pageEnd/searchString

router.get('/range/:startMs/:endMs/', function (req, res) {
	const { pageStart,
			pageEnd,
			searchString } = req.params;

	const startMs = parseInt(req.params.startMs);
	const endMs = parseInt(req.params.endMs);
	const searchParams = {
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
		bks.sort((a,b) => b.mentionCount - a.mentionCount)
		
		res.send(bks);
	});
});

module.exports = router;


