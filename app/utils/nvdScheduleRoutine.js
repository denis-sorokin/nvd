const moment = require('moment');
const zip = new require('node-zip');

/* actions */
const downloadArchives = require('./downloadArchives');

/*
    CONSTANTS
*/
const { ERRORS, NOTIFY } = require('../constants');

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
    const startYear = 2002;
    const currentYear = (new Date).getFullYear();

    try {
        try {
            downloadArchives({ startYear, currentYear })
                .then(e => {
                    console.log(NOTIFY.DOWNLOAD_ARCHIVES, e.join('\n'));
                })
                .catch(e => {
                    console.error(e);
                })
        } catch (e) {
            console.error(ERRORS.CONSOLE.UNKNOWN_GET_ERROR, e)
        }
    } catch (error) {
        console.error(`${ERRORS.CONSOLE.ERROR_TRY_CATCH} checkNewsFromNvd`, error);
    }
};
