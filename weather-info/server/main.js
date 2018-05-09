import { Meteor } from 'meteor/meteor';
import get from 'lodash/get';

Meteor.startup(() => {
  // code to run on server at startup
});
Meteor.methods({
  getWeather(zipcode) {
    check(zipcode, Number)
    try {
      const geoUrl = Meteor.settings.weatherapi.baseUrl;
      const result = HTTP.call('GET', geoUrl, {
        params: { zipcode: zipcode }
      });
      var weatherInfo = get(result, 'content');
      if (weatherInfo) {
        var weatherObj = JSON.parse(weatherInfo).weather;
        var arrDetails = [];
        Object.keys(weatherObj).map(item => {
          arrDetails.push({name: item, value: weatherObj[item]});
        });
        return arrDetails;
      } else {
        return null;
      }
    } catch (e) {
      // Got a network error, timeout, or HTTP error in the 400 or 500 range.
      console.log(e);
      return false;
    }

  }
});


