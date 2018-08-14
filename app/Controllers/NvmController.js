const axios = require('axios');

class NvmController {
  getData(Res, Req) {
    axios.get('https://nvd.nist.gov/vuln/data-feeds')
      .then(res => {
        // console.log(res)
        // Res({res})
      })

  }
}

module.exports = new NvmController();
