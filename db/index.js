const Sequelize = require('sequelize');

const db_name = 'ssbooks'; 

//if not in production, run postgres locally and create db with name db_name

const db_url = process.env.DATABASE_URL || `postgres://localhost:5432/${db_name}`;

const db = new Sequelize(db_url, {
  define: { timestamps: true },
  logging: false,
  verbose: true,
});

db.sync();

module.exports = db;
