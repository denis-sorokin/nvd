const fs = require('fs');

class NvmController {
  constructor(){
    this.startYear = 2002
  }

  getData(Req, Res) {
    let files_arr = [];
    Res.send('WTF!');
    return;
    try {
      fs.readdir('./cache', (err, files) => {
        if (!err) {
          files.forEach(e => {
            console.log(e)
            files_arr.push(e)
          });
          Res.send('123')
        } else {
          Res.send('123')
        }
      });
    } catch (e) {
      console.error(e.message)
    }

  }
}

module.exports = new NvmController();
