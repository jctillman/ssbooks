/*
* Misc utils.
*
*/

/*
* A function that gets you all the matches for
* a regex
* 
* @Param regex
* @Returns array of strings
*/
const execAll = (reg, string) => {
    var match = null;
    let matchArray = []
    while (match = reg.exec(string)) {
        matchArray.push(match[0]);
    }
    return matchArray;
}

/*
* A function that 
* lets you loop through an array
* performing tasks asynchronously.
*
* Could use promise.all, but I don't 
* want to DDOS anyone when pulling links,
* say.
*
* @Param arr -- array mapping over
* @Param cb -- callback taking an
* 		element from arr,
* 		index of the element, and
*		a function you call when done.
* @Returns a promise resolving when done.
*
*/
const asyncLoop = (arr, cb) => {
	return new Promise( (resolve, reject) => {
		const inner = (index) => {
			if (arr.length > index){
				cb(arr[index], index, () => {
					inner(index + 1);
				});
			}else{
				resolve();
			}
		}
		inner(0);
	});
}

module.exports = { asyncLoop, execAll }