const Sequelize = require('sequelize');
const db = require('../index');

const ArchiveLink = db.define('ArchiveLink', {
  url: Sequelize.STRING,
  pageOrder: Sequelize.INTEGER,
  lastPulledContent: Sequelize.BIGINT
});

module.exports = ArchiveLink;