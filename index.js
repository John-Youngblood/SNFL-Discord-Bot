if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const path = require('path');
const express = require('express');
const yahoo = require('./yahoo');
const debug = require('debug');
const log = debug('server');
const app = express();
const PORT = process.env.PORT || 13337;
const HOST = process.env.HOST || '0.0.0.0';

process.title = "YahooFantasyToDiscordAlerts";
process.stdout.on('error', function( err ) {
  if (err.code === "EPIPE") {
    process.exit(0);
  }
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/status', async (req,res, next) => {
  res.status(200).send('alive');
})

app.get('/request_auth',(req, res, next) => {
  // res.send('Hello World');
  let type = 'text/html';

  res.type(type);

  // document.write()

  yahoo.requestAuth()
  .then((response) => {
    res.send(response);
  })
  .catch(err => {
    res.send(err);
  });
  }
)

app.get('/get_access_token',(req, res, next) => {
    // res.send('Hello World');
    let type = 'text/html';

    res.type(type);

    // document.write()

    yahoo.getAccessToken()
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
