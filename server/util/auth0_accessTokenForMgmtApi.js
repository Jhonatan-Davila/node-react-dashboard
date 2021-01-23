var request = require("request");

var options = { method: 'POST',
  url: 'https://dev-uo20nmyd.auth0.com/oauth/token',
  headers: { 'content-type': 'application/json' },
  body: '{"client_id":"318pysii77KTZC14AhrwGzktdI64wgXp","client_secret":"T8cIkb0C7aDdFI4RRKziCOYX2c6FZBB7NUAsGxErA3YA-vFNiiRpaqSRlsDI5mSf","audience":"https://dev-uo20nmyd.auth0.com/api/v2/","grant_type":"client_credentials"}' };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});