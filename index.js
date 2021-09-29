if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// const express = require('express');
// const app = express();
// const PORT = process.env.PORT || 13337;
//
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })
//
// app.listen(PORT, () => {
//   console.log(`Example app listening at http://localhost:${PORT}`)
// })

console.log(Buffer.from(process.env.YAHOO_CLIENT_ID+':'+process.env.YAHOO_CLIENT_SECRET).toString('base64'));