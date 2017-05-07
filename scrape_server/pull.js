

const logger = require('./logger');
const db = require('../db');

const pull_archive_links = require('./pull_archive_links');
const pull_page_html = require('./pull_page_html');
const pull_comment_mentions = require('./pull_comment_mentions');
const make_cached_pages = require('./make_cached_pages');

const everything = () => {

	db.sync().

	//(1). Pull archive links pulls links to each SSC
	//     store from the archive, and sticks them 
	//     into the archive links table.
	// then(pull_archive_links, logger.logPromiseError).

	//(2). Pull page html pulls all the unformatted
	//     html for each post and for each comment
	//     and saves it to SavedPage and SavedComment
	//     (Some of this is probably unnecessary, could)
	//     have gone with a dump of the whole page, maybe.)  
	//then(pull_page_html, logger.logPromiseError).

	//     TODO TODO TODO TODO
	//(3). Pull new book titles from this, and save new books
	//     without saving the individual MENTIONS from them
	//     This is going to require the amazon API, so I did
	//     it manually for now.  Saved in GenericBooks
	//     and in AmazonLinks.  AmazonLinks maps from productId
	//     to another productId, if we want to keep track of
	//     that product.  (I.e., for a a product it from a)
	//     non-book product, it maps to a null.  For a productId
	//     for some books, it maps to the sameId; for other books
	//     it maps to a non-kindle version of the same.
	//     then(pull_book_instances, logger.logPromiseError).

	//(4). Pull new mentions from the above, using savedComment
	//     AmazonLinks, GenericBooks, to produce new GenericMentions
	//then(pull_comment_mentions, logger.logPromiseError).
	
	//(5). Cache the data.
	then(make_cached_pages, logger.logPromiseError)

	//(6). We made it!
	//.then(alertSuccess, logger.logPromiseError);

}

module.exports = { everything }

// force:true in development only
// that would clear the database
// every time we restart this application
//db.sync().then(() => {
//  app.listen(process.env.PORT || 8080);
//});

