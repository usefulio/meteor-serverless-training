import { Meteor } from 'meteor/meteor';
const check = require('check');
Meteor.startup(() => {
  // code to run on server at startup
});
Meteor.methods({
  
  getWeather(zipcode){
    check(zipcode, Number)
    try {
      var geourl = "";
      if(Meteor.settings.public.isDevelopment){
        geourl = Meteor.settings.public.weatherapi.dev.url;
      }else{
        geourl = Meteor.settings.public.weatherapi.prod.url;
      }
      const result = HTTP.call('GET', geourl, {
        params: {zipcode: zipcode}
      });
      return result;
    } catch (e) {
      // Got a network error, timeout, or HTTP error in the 400 or 500 range.
      console.log(e);
      return false;
    }

  }
});


