//https://anthonymineo.com/docker-healthcheck-for-your-node-js-app/
let http = require("http");

let options = {
  host : "localhost",
  path : "/status",
  port : process.env.PORT ? process.env.PORT : 13337,
  timeout : 2000
};

let request = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  if (res.statusCode === 200) {
    process.exit(0);
  }
  else {
    process.exit(1);
  }
});

request.on('error', function(err) {
  console.error(err);
  process.exit(1);
});

request.end();