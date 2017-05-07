/*
* 
* Will be set up to use nodemailer
* to email me in event of an error.
*
* For now, just console.logs it.
* 
*/

const nodemailer = require('nodemailer')

module.exports = {

	log(str){
		console.log(str);
	},

	logPromiseError(a,b){
		console.log(a);
		console.log(b);
	}

}