const fs = require('fs');

const { ERRORS } = require('../constants');

class NvdController {
    constructor(){
        this.startYear = 2002
    }

    async getList(Request, Response, next) {
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
            const zip = new require('node-zip')(`${process.env.DOWNLOAD_FOLDER}${year}.json.zip`);

            // const data = zip.files[`${process.env.DOWNLOAD_FOLDER}${year}.json.zip`]
            console.log(zip)
        } catch (e) {
            console.error(ERRORS.CONSOLE.NOT_FOUND_THIS_YEAR, e)
        }
    }
}

module.exports = new NvdController();
