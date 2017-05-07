
const express = require('express')
const {Book, Mention, Comment, Page} = require('../../db/models/Cluster');
const asyncLoop = require('../utils').asyncLoop;
const fs = require('fs');

const now = new Date().getTime();
const seventeen = new Date('2017-01-01').getTime();
const sixteen = new Date('2016-01-01').getTime();
const fifteen = new Date('2015-01-01').getTime();
const fourteen = new Date('2014-01-01').getTime();
const thirteen = new Date('2013-01-01').getTime();
const periods = [
	{name: 'all', start: 0, end: now},
	{name: '2017', start: seventeen, end: now},
	{name: '2016', start: sixteen, end: seventeen},
	{name: '2015', start: fifteen, end: sixteen},
	{name: '2014', start: fourteen, end: fifteen},
	{name: '2013', start: thirteen, end: fourteen},
];

module.exports = () => {

	asyncLoop(periods, (period, i, done) => {

		console.log("Making for period..." + period.name);
		const startMs = period.start;
		const endMs = period.end;
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
				return b;
			});
			bks.sort((a,b) => b.mentionCount - a.mentionCount)
			const bksJson = JSON.stringify(bks);
			fs.writeFileSync(period.name+".json", bksJson);
		}).then(() => done());

	});

}



