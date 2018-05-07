
'use strict';
const geoInfo = require('./lib/geoInfo');
const check = require('check');

module.exports.getWeatherInfo = (event, context, callback) => {
  const zipcode = event.queryStringParameters.zipcode;console.log(zipcode);
  check(zipcode, Number);
  geoInfo.getGeoFromZip(zipcode).then(function(result){
    const response = {
      statusCode: 200,
      body: JSON.stringify({
        message: result,
        input: event,
      }),
    };
    callback(null, response);
  }).error(function(err){
    console.log(JSON.stringify(err));
    callback(err);
  });

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};
