const Sequelize = require('sequelize');
const db = require('../index');

const AmazonLink = db.define('AmazonLink', {
  from: Sequelize.STRING,
  to: Sequelize.STRING,
});

module.exports = AmazonLink;