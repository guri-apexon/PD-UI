const https = require('https');
const axios = require('axios');
const { authenticateUser } = require('../utility/SSOUtility');
const { getENVURL } = require('../utility/EnvURL');

const envURL = getENVURL();
module.exports = function (app) {
  app.get('/refresh', function (req, res) {
    console.log('-----callback------', req.query);
    const getCookies = req.session.cookies;

    const agent = new https.Agent({
      rejectUnauthorized: false,
    });
    axios
      .get(`${getENVURL().baseUrlSSO}/validate_token`, {
        params: {
          access_token: getCookies[envURL.access_token],
          refresh_token: getCookies[envURL.refresh_token],
        },
        headers: {
          Authorization: authenticateUser(
            process.env.CIMS_USER,
            process.env.CIMS_PWD,
          ),
        },
        httpsAgent: agent,
      })
      .then(({ data }) => {
        console.log(data);
        res.send(data);
        // if (data.code === 102) {
        //   res.send(true);
        // } else {
        //   res.send(false);
        // }
      })
      .catch((err) => {
        console.log(err);
        res.send(false);
      });
  });
};
