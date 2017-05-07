const Sequelize = require('sequelize');
const db = require('../index');

const Page = db.define('Page', {
  pageUrl: Sequelize.TEXT,
  pageHtml: Sequelize.TEXT,
  pageTimestamp: Sequelize.BIGINT,
});

const Comment = db.define('Comment', {
  commentUrl: Sequelize.TEXT,
  commentId: Sequelize.STRING,
  commentTimestamp: Sequelize.BIGINT,
  commentAuthor: Sequelize.TEXT,
  commentHtml: Sequelize.TEXT,
});

Page.hasMany(Comment, { onDelete: 'cascade', hooks: true });
Comment.belongsTo(Page);

const Book = db.define('Book', {
  title: {type: Sequelize.TEXT, unique: true},
  author: Sequelize.TEXT,
  amazonLink: {type: Sequelize.TEXT, unique: true},
  amazonLinkImage: Sequelize.TEXT,
});

const Mention = db.define('Mention', {
  mentionDate: Sequelize.BIGINT,
}, {
	defaultScope: {
		include: {
			model: Comment
		}
	}
});

Book.hasMany(Mention, { onDelete: 'cascade', hooks: true });
Mention.belongsTo(Book);
Comment.hasMany(Mention, { onDelete: 'cascade', hooks: true });
Mention.belongsTo(Comment);




module.exports = {Page, Comment, Book, Mention}