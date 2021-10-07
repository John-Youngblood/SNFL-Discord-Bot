const axios = require('axios');
const debug = require('debug');
const log = debug('yahoo');

async function requestAuth() {
  try {
    const response = await axios.get('https://api.login.yahoo.com/oauth2/request_auth', {
      params: {
        response_type: 'code',
        redirect_uri: 'https://youngblood.cool',
        client_id: process.env.YAHOO_CLIENT_ID,
      },
      headers: {'Content-Type': 'text/html; charset=utf-8'}
    })
    log(response)
    return response.data;
  } catch (error) {
    console.error(error);
    return `<html id="Stencil" class="no-js grid mobile light-theme ">
    <head>
      <meta charset="utf-8">
    </head>
    <body>
    <p>
      ${error}
</p>
    </body>
  </html>`
  }
}

// const requestAuth = () => {
//   axios.get('https://api.login.yahoo.com/oauth2/request_auth', {
//     params: {
//       response_type: 'code',
//       redirect_uri: 'https://youngblood.cool',
//       client_id: process.env.YAHOO_CLIENT_ID,
//     },
//     headers: {'Content-Type': 'text/html; charset=utf-8'}
//   })
//   .then(function (response) {
//     log(response.status)
//     log(response.data);
//   })
//   .catch(function (error) {
//     log(error);
//   })
// }

exports.requestAuth = requestAuth;