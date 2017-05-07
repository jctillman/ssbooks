/*
* 
* Point of entry for ChronTask
*
* Last minute of every Sunday, this just
* starts the task that will pull from 
* the SSC archives, find new comments
* and add those to the database.
* 
*/
const cron = require('node-cron');
const pull = require('./pull.js');

const cronTime = '59 59 23 * * 7';

//For testing -- should switch off
pull.everything()

//For use.
//cron.schedule(cronTime, pull.everything);



