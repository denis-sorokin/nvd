const fs = require('fs');
const axios = require('axios');

/*
    CONSTANTS
*/
const { ERRORS, NOTIFY } = require('../constants');

module.exports = async function ({ startYear, currentYear }) {
    let checkDownload = [];

    return new Promise((resolve, reject) => {
        for (let i = startYear; i !== currentYear; i++ ) {
            axios.get(`${process.env.NVD_HOST}${i}.json.zip`, { responseType: 'arraybuffer' })
                .then(e => {
                    fs.open(`${process.env.DOWNLOAD_FOLDER}${i}.json.zip`, 'wx', (err) => {
                        if (err) {
                            if (err.code === 'EEXIST') {
                                reject(`${ERRORS.CONSOLE.FILE_EXIST} ${i}`);
                            }
                            reject(err);
                        }

                        fs.writeFileSync(`./zip_cache/${i}.json.zip`, e.data, 'binary');
                    });
                    checkDownload.push(i);
                })
                .catch(e => {
                    reject(`${ERRORS.CONSOLE.AXIOS_GET_ERROR} archive ${i}\n`, e);
                });
        }
        resolve(checkDownload);
    });
};
