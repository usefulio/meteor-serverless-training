
import { zipCodeToCoordinates } from './lib/geoInfo';
import { coordinatesToWeather } from './lib/weatherInfo';

export const getWeatherInfo = (event, context, callback) => {
  const { zipcode } = event.queryStringParameters;
  (async () => {
    try {
      const { lat, lng } = await zipCodeToCoordinates(zipcode);
      if(!lat || !lng){
        const response = {
          statusCode: 400
        };
        callback(null, response);
      }
      const weather = await coordinatesToWeather(lat, lng);

      const response = {
        statusCode: 200,
        body: JSON.stringify({
          weather
        }),
      };
      callback(null, response);
    } catch (e) {
      callback(e);
    }
  })();
};
