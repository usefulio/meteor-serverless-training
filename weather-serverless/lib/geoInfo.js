'use strict';
const axios = require("axios");
const weatherInfo = require('./weatherInfo');
const check = require('check');
const Promise = require("bluebird");

module.exports.getGeoFromZip = function (zipcode = 75252) {
    check(zipcode, Number);
    return new Promise(function (resolve, reject) {
        axios
            .get(process.env.GEOCODE_URL + zipcode + "&key="+process.env.GEOCODE_API_KEY)
            .then(function (response) {
                const locationObj = response.data.results[0].geometry.location;
                if (!locationObj) {
                    throw new Meteor.Error("invalid", "Google API did not respond");
                }
                const lat = locationObj.lat;
                const lng = locationObj.lng;
                resolve(weatherInfo.getWeatherFromLocation(lat, lng));
                return weatherInfo.getWeatherFromLocation(lat, lng);
            })
            .catch(e => {
                reject(e);
                // res.status(400).json({ msg: e });
            });
    });
}