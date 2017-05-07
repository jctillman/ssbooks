
const {Page, Comment} = require('../../db/models/Cluster');
const asyncLoop = require('../utils').asyncLoop;
const logger = require('../logger');

module.exports = (milisecondsBack, fnc, finished) => {

	let findConditions = {
		where: { commentTimestamp: {$gte: new Date().getTime() - milisecondsBack } }
	};

	const count = Comment.count(findConditions).then((num) => {
		console.log("There are " + num + "comments meeting that condition.")
		let time = -1
		const step = 10;
		const next = () => {
			time = time + 1
			findConditions.offset = step * time
			findConditions.limit = step;
			Comment.findAll(findConditions).then((found) => {
				if(found.length){
					found.forEach( (comment) => {
						fnc(comment)
					});
					next();
				}else{
					finished();
				}
			});
		}
		next();
	});
	
}
