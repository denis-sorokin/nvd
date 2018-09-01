/*
    CONSTANTS
*/
const { ERRORS } = require('../constants');
const moment = require('moment');

let args;

module.exports = function (_args) {
    args = _args;
    return scheduleJob;
};

const scheduleJob = async function(fireDate) {
    console.log('=======');
    console.log(`SCHEDULER _ TIME ${moment(fireDate).format('DD/MM/YYYY HH:mm')}`);
    console.log('========');

    await checkNewsFromNvd(fireDate);
};

const checkNewsFromNvd = async (fireDate) => {
    try {
        console.log('Hello, from schedule task')
    } catch (error) {
        console.error('Error in tryCatch checkNewsFromNvd: ', error);
    }
};
