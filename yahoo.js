const axios = require('axios');
const debug = require('debug');
const log = debug('yahoo');

async function requestAuth() {
  try {
    const response = await axios.get('https://api.login.yahoo.com/oauth2/request_auth', {
      params: {
        response_type: 'code',
        redirect_uri: 'https://www.youngblood.cool',
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

async function getAccessToken(code) {
  try {
    const authorization = Buffer.from(`${process.env.YAHOO_CLIENT_ID}:${process.env.YAHOO_CLIENT_SECRET}`).toString('base64');
    log(authorization)
    const response = await axios.post('https://api.login.yahoo.com/oauth2/get_token', {
      'grant_type': 'authorization_code',
      'redirect_uri': encodeURI(process.env.YAHOO_REDIRECT_URI),
      'code': code
    },{
      headers: {
        'Authorization': 'Basic ' + authorization,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    log(response.data)
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

async function getAccessTokenRefresh(refresh_token) {
  try {
    const authorization = Buffer.from(`${process.env.YAHOO_CLIENT_ID}:${process.env.YAHOO_CLIENT_SECRET}`).toString('base64');
    // log(authorization)
    const response = await axios.post('https://api.login.yahoo.com/oauth2/get_token', {
      'grant_type': 'refresh_token',
      'redirect_uri': encodeURI(process.env.YAHOO_REDIRECT_URI),
      'refresh_token': refresh_token
    },{
      headers: {
        'Authorization': 'Basic ' + authorization,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    log(response.data)
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
exports.getAccessToken = getAccessToken;
exports.getAccessTokenRefresh = getAccessTokenRefresh;