if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const path = require('path');
const express = require('express');
const yahoo = require('./yahoo');
const debug = require('debug');
const grant = require('grant');
const log = debug('server');
const session = require('express-session')
const app = express();
const PORT = process.env.PORT || 13337;
const HOST = process.env.HOST || '0.0.0.0';

process.title = "YahooFantasyToDiscordAlerts";
process.stdout.on('error', function( err ) {
  if (err.code === "EPIPE") {
    process.exit(0);
  }
});

app.get('/', (req, res) => {
  if(req.query.code) {
    res.redirect(`/public?code=${req.query.code}`)
  } else {
    res.redirect('/request_auth');
  }
})


app.use('/public',express.static(path.join(__dirname, 'public')));

app.get('/status', async (req,res, next) => {
  res.status(200).send('alive');
})

app.get('/get_access_token/:code', (req,res) => {
  yahoo.getAccessToken(req.params.code)
  .then((response) => {
    res.send(response);
  })
  .catch(err => {
    res.send(err);
  });
})

app.get('/request_auth',(req, res, next) => {
  // res.send('Hello World');
  const requestAuthURL =new URL('https://api.login.yahoo.com/oauth2/request_auth');
  requestAuthURL.searchParams.append("response_type", "code");
  requestAuthURL.searchParams.append("redirect_uri",process.env.YAHOO_REDIRECT_URI);
  requestAuthURL.searchParams.append("client_id",process.env.YAHOO_CLIENT_ID);
  res.redirect(requestAuthURL.href)
  }
)

app.get('/get_access_token_refresh/:refresh_token',(req, res, next) => {
    yahoo.getAccessTokenRefresh(req.params.refresh_token)
    .then((response) => {
      res.send(response);
    })
    .catch(err => {
      res.send(err);
    });
  }
)

// Error  Handler
// https://expressjs.com/en/guide/error-handling.html
//https://stackoverflow.com/questions/49210127/getting-rangeerror-err-http-invalid-status-code-invalid-status-code-undefine
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  console.error(`Something went wrong with ${req.path} endpoint while rendering ¯\\_(ツ)_/¯`);
  console.error(err);
  res.locals.error = err;
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});

app.listen(PORT, () => {
  console.log(`App listening at http://${HOST}:${PORT}`)
})
