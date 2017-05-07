/*
* Sole export is a function that accesses 
* saved archive links, then gets HTML for those links,
* and saves it.
*
* @Returns promise that resolves when done.
*
*/

const _ = require('lodash');

const utils = require('./utils');
const asyncLoop = utils.asyncLoop;
const logger = require('./logger');

const cluster = require('../db/models/Cluster');
const AmazonLink = require('../db/models/AmazonLink');
const Book = cluster.Book;
		
Book.findAll().then((gBooks) => {

	gBooks.forEach((gBook) => {
		AmazonLink.create({
			from: gBook.get('amazonLink'),
			to: gBook.get('amazonLink'),
		});
	});

});

	
