/*
* Sole export is a functon that gets
* HTML from the archive page
* and imports into the db a list of the urls
* contained there.
*
* @Returns promise that resolves when done.
*
*/

const request = require('request');
// See respective documentation for these.
const links_array_from_html = require('./links_array_from_html');
const links_array_add_to_db = require('./links_array_add_to_db');

module.exports = () => {
	console.log("Pulling archive links...")
	return new Promise( (resolve, reject) => {
		const archive_links_url = 'http://slatestarcodex.com/archives/';
		const request_handler = (err, resp, body) => {
			if (err){
				reject(err);
			}else{
				try{
					//Synchronous operation.
					const links = links_array_from_html(body);
					//Asynchronous operation.
					links_array_add_to_db(links).then(resolve, reject);

				}catch(err){
					reject(err);
				}
			}			
		}
		request(archive_links_url, request_handler);
	});
}