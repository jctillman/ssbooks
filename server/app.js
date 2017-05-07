const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const db = require('../db');
const bookSearch = require('./bookSearch');

app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/api/range/:startMs/:endMs/:pageStart/:pageEnd', bookSearch)
app.get('/api/range/:startMs/:endMs/:pageStart/:pageEnd/:searchString', bookSearch)

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

app.use((err, req, res) => {
  console.error(err.stack);
  res.sendStatus(500);
});

// force:true in development only
// that would clear the database
// every time we restart this application
db.sync().then(() => {
  app.listen(process.env.PORT || 8080);
});


