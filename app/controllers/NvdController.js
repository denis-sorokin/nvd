const fs = require('fs');
const path = require('path');

const { ERRORS, NOTIFY } = require('../constants');

const downloadArchives = require('../utils/downloadArchives');

class NvdController {
    constructor(){
        this.startYear = 2002
    }

    async getList(Request, Response, year=null) {
        let files_arr = [];
        try {
            fs.readdir('./zip_cache', (err, files) => {
                if (!err && files.length >= 1) {
                    files.forEach(e => {
                        files_arr.push(e)
                    });
                    Response.send({ files: files_arr });
                } else {
                    err? Response.send(err) : Response.send({ error: ERRORS.FILES_NOT_EXIST });
                }
            });
        } catch (e) {
            console.error(ERRORS.CONSOLE.ERROR_READ_FILES, e)
        }
    }

    async getDataByYear(Request, Response, next) {
        try {
            const { year } = Request.params;
            // fs.readFile(`${process.env.DOWNLOAD_FOLDER}${year}.json.zip`, (err, data) => {
            //     const zip = new require('node-zip')(data);
            //     const fileInArchive = zip.files[Object.keys(zip.files)[0]];
            //     const raw = new Buffer(fileInArchive._data.getContent());
            //     Response.send(JSON.parse(raw.toString()), 200)
            // });
	        downloadArchives({ startYear: year, currentYear: 2017 })
	            .then(e => {
	                console.log(NOTIFY.DOWNLOAD_ARCHIVES, e.join('\n'));
	            })
	            .catch(e => {
	                console.error(e);
	            })
        } catch (e) {
            console.error(ERRORS.CONSOLE.NOT_FOUND_THIS_YEAR, e)
        }
    }
}

module.exports = new NvdController();
