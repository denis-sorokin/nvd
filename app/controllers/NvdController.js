const fs = require('fs');
const { ERRORS } = require('../constants');

class NvdController {
  constructor(){
    this.startYear = 2002
  }

  async getData(Request, Response, next) {
    let files_arr = [];
    try {
      fs.readdir('./zip_cache', (err, files) => {
        if (!err && files.length >= 1) {
          files.forEach(e => {
            files_arr.push(e)
          });
          Response.send({ files: files_arr });
        } else {
          err? Response.send(err) : Response.send({ error: ERRORS.NOT_EXIST_FILES });
        }
      });
    } catch (e) {
      console.error(e.message)
    }

  }
}

module.exports = new NvdController();
