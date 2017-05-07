const db = require('../db/index');
const express = require('express')
const {Book, Mention, Comment, Page} = require('../db/models/Cluster');

const router = express.Router();

//api/range/startMs/endMs/pageStart/pageEnd/searchString

router.get('/range/:startMs/:endMs/:pageStart/:pageEnd/:searchString', function (req, res) {

	const { pageStart,
			pageEnd,
			searchString } = req.params;

	const startMs = parseInt(req.params.startMs);
	const endMs = parseInt(req.params.endMs);

	const offset = parseInt(pageStart);
	const limit = parseInt(pageEnd) - offset;


	db.query(`
		SELECT
			* 
		FROM
			"Books"
`).spread((results, metadata) => {
		res.send(results);
	})

	// console.log(offset, limit)
	// const searchParams = {
	// 	offset: offset,
	// 	limit: limit,
	// 	attributes: [
	// 		'id','title','author','amazonLink','amazonLinkImage',['id','basdada'],
	// 		[
	// 			db.query('(SELECT COUNT(*) FROM "Mentions" AS "Ment" WHERE Ment.BookId = Book.id)'),
	// 			'MentionCount'
	// 		]
	// 	],
	// 	//order: [] //we want order by frequency of mention
	// 	include: [{
	// 		model: Mention,
	// 		where: { mentionDate: { $between: [startMs, endMs] } },
	// 	}]
	// }

	// Book.findAll(searchParams).then( (books) => {
	// 	res.send(books);
	// })
  
})

module.exports = router;


